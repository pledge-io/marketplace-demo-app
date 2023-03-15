import { getProjectById } from '../services/pledge';

export async function projectController(req, res, next) {
  try {
    const project = await getProjectById(req.params.projectId);

    res.render('pages/project', { project });
  } catch (error) {
    next(error);
  }
}
