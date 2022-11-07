/*
  Live.js - One script closer to Designing in the Browser
  Written for Handcraft.com by Martin Kool (@mrtnkl).

  Version 4.
  Recent change: Made stylesheet and mimetype checks case insensitive.

  http://livejs.com
  http://livejs.com/license (MIT)
  @livejs

  Include live.js#css to monitor css changes only.
  Include live.js#js to monitor js changes only.
  Include live.js#html to monitor html changes only.
  Mix and match to monitor a preferred combination such as live.js#html,css

  By default, just include live.js to monitor all css, js and html changes.

  Live.js can also be loaded as a bookmarklet. It is best to only use it for CSS then,
  as a page reload due to a change in html or css would not re-include the bookmarklet.
  To monitor CSS and be notified that it has loaded, include it as: live.js#css,notify
*/
(function () {
  const headers = { Etag: 1, 'Last-Modified': 1, 'Content-Length': 1, 'Content-Type': 1 }
  const resources = {}
  const pendingRequests = {}
  const currentLinkElements = {}
  const oldLinkElements = {}
  const interval = 1000
  let loaded = false
  const active = { html: 1, css: 1, js: 1 }

  const Live = {

    // performs a cycle per interval
    heartbeat: function () {
      if (document.body) {
        // make sure all resources are loaded on first activation
        if (!loaded) Live.loadresources()
        Live.checkForChanges()
      }
      setTimeout(Live.heartbeat, interval)
    },

    // loads all local css and js resources upon first activation
    loadresources: function () {
      // helper method to assert if a given url is local
      function isLocal (url) {
        const loc = document.location
        const reg = new RegExp('^\\.|^/(?!/)|^[\\w]((?!://).)*$|' + loc.protocol + '//' + loc.host)
        return url.match(reg)
      }

      // gather all resources
      const scripts = document.getElementsByTagName('script')
      const links = document.getElementsByTagName('link')
      let uris = []

      // track local js urls
      for (let i = 0; i < scripts.length; i++) {
        const script = scripts[i]; const src = script.getAttribute('src')
        if (src && isLocal(src)) { uris.push(src) }
        if (src && src.match(/\blive.js#/)) {
          for (const type in active) { active[type] = src.match('[#,|]' + type) != null }
          // eslint-disable-next-line no-undef
          if (src.match('notify')) { alert('Live.js is loaded.') }
        }
      }
      if (!active.js) uris = []
      if (active.html) uris.push(document.location.href)

      // track local css urls
      for (let i = 0; i < links.length && active.css; i++) {
        const link = links[i]; const rel = link.getAttribute('rel'); const href = link.getAttribute('href', 2)
        if (href && rel && rel.match(/stylesheet/i) && isLocal(href)) {
          uris.push(href)
          currentLinkElements[href] = link
        }
      }

      // initialize the resources info
      for (let i = 0; i < uris.length; i++) {
        const url = uris[i]
        Live.getHead(url, function (url, info) {
          resources[url] = info
        })
      }

      // add rule for morphing between old and new css files
      const head = document.getElementsByTagName('head')[0]
      const style = document.createElement('style')
      const rule = 'transition: all .3s ease-out;'
      const css = ['.livejs-loading * { ', rule, ' -webkit-', rule, '-moz-', rule, '-o-', rule, '}'].join('')
      style.setAttribute('type', 'text/css')
      head.appendChild(style)
      style.styleSheet ? style.styleSheet.cssText = css : style.appendChild(document.createTextNode(css))

      // yep
      loaded = true
    },

    // check all tracking resources for changes
    checkForChanges: function () {
      for (const url in resources) {
        if (pendingRequests[url]) { continue }

        Live.getHead(url, function (url, newInfo) {
          const oldInfo = resources[url]
          let hasChanged = false
          resources[url] = newInfo
          for (const header in oldInfo) {
            // do verification based on the header type
            const oldValue = oldInfo[header]
            const newValue = newInfo[header]
            const contentType = newInfo['Content-Type']
            switch (header.toLowerCase()) {
              case 'etag':
                if (!newValue) break
                // fall through to default
              default:
                hasChanged = oldValue !== newValue
                break
            }
            // if changed, act
            if (hasChanged) {
              Live.refreshResource(url, contentType)
              break
            }
          }
        })
      }
    },

    // act upon a changed url of certain content type
    refreshResource: function (url, type) {
      switch (type.toLowerCase()) {
        // css files can be reloaded dynamically by replacing the link element
        case 'text/css': {
          const link = currentLinkElements[url]
          const html = document.body.parentNode
          const head = link.parentNode
          const next = link.nextSibling
          const newLink = document.createElement('link')

          html.className = html.className.replace(/\s*livejs-loading/gi, '') + ' livejs-loading'
          newLink.setAttribute('type', 'text/css')
          newLink.setAttribute('rel', 'stylesheet')
          newLink.setAttribute('href', url + '?now=' + new Date() * 1)
          next ? head.insertBefore(newLink, next) : head.appendChild(newLink)
          currentLinkElements[url] = newLink
          oldLinkElements[url] = link

          // schedule removal of the old link
          Live.removeoldLinkElements()
          break
        }

        // check if an html resource is our current url, then reload
        case 'text/html':
          if (url !== document.location.href) { return }

        // local javascript changes cause a reload as well
        // eslint-disable-next-line no-fallthrough
        case 'text/javascript':
        case 'application/javascript':
        case 'application/x-javascript':
          document.location.reload()
      }
    },

    // removes the old stylesheet rules only once the new one has finished loading
    removeoldLinkElements: function () {
      let pending = 0
      for (const url in oldLinkElements) {
        // if this sheet has any cssRules, delete the old link
        try {
          const link = currentLinkElements[url]
          const oldLink = oldLinkElements[url]
          const html = document.body.parentNode
          const sheet = link.sheet || link.styleSheet
          const rules = sheet.rules || sheet.cssRules
          if (rules.length >= 0) {
            oldLink.parentNode.removeChild(oldLink)
            delete oldLinkElements[url]
            setTimeout(function () {
              html.className = html.className.replace(/\s*livejs-loading/gi, '')
            }, 100)
          }
        } catch (e) {
          pending++
        }
        if (pending) setTimeout(Live.removeoldLinkElements, 50)
      }
    },

    // performs a HEAD request and passes the header info to the given callback
    getHead: function (url, callback) {
      pendingRequests[url] = true
      // eslint-disable-next-line no-undef
      const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XmlHttp')
      xhr.open('HEAD', url, true)
      xhr.onreadystatechange = function () {
        delete pendingRequests[url]
        if (xhr.readyState === 4 && xhr.status !== 304) {
          xhr.getAllResponseHeaders()
          const info = {}
          for (const h in headers) {
            let value = xhr.getResponseHeader(h)
            // adjust the simple Etag variant to match on its significant part
            if (h.toLowerCase() === 'etag' && value) value = value.replace(/^W\//, '')
            if (h.toLowerCase() === 'content-type' && value) value = value.replace(/^(.*?);.*?$/i, '$1')
            info[h] = value
          }
          callback(url, info)
        }
      }
      xhr.send()
    }
  }

  // start listening
  if (document.location.protocol !== 'file:') {
    if (!window.liveJsLoaded) { Live.heartbeat() }

    window.liveJsLoaded = true
  } else if (window.console) { console.log("Live.js doesn't support the file protocol. It needs http.") }
})()
