import express from 'express'
import {
	projectsCreate,
	projectsGet,
	projectsGetById,
	projectRemoveById,
	resourceCreate,
	resourceGet,
} from '../controllers/ProjectsController.js'
import CheckAuth from '../middlewares/CheckAuth.js'

const router = express.Router()

router.post('/create', CheckAuth, projectsCreate)
router.get('/', CheckAuth, projectsGet)
router.get('/:id', CheckAuth, projectsGetById)
router.get('/remove/:id', CheckAuth, projectRemoveById)
router.post('/create/resource', CheckAuth, resourceCreate)
router.get('/:id/resource', CheckAuth, resourceGet)

export default router
