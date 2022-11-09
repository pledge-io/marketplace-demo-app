import { pledgeApi } from '../services/pledge'

const { PLEDGE_API_URL } = process.env

export async function projectController (req, res, next) {
  try {
    const response = await pledgeApi.get(`${PLEDGE_API_URL}/projects/${req.params.projectId}`)
    const project = response.data

    console.log(project)
    res.render('pages/project', { project: { ...project, removal: true, avoidance: true } })
  } catch (error) {
    next(error)
  }
}
