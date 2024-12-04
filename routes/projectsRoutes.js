import express from 'express'
import {
	projectsCreate,
	projectsGet,
	projectsGetById,
	projectRemoveById,
	resourceCreate,
	resourceGet,
	resourceRemoveById,
	resourceGetById,
	resourceGetByName,
	updateProjectName,
	resourceGetByNameAndId,
} from '../controllers/ProjectsController.js'
import CheckAuth from '../middlewares/CheckAuth.js'
import {
	validateProjectCreation,
	validateResourceCreation,
} from '../validation/projectValidation.js'

const router = express.Router()

router.post('/create', CheckAuth, validateProjectCreation, projectsCreate)
router.get('/', CheckAuth, projectsGet)
router.get('/:id', CheckAuth, projectsGetById)
router.delete('/remove/:id', CheckAuth, projectRemoveById)
router.post(
	'/create/resource',
	CheckAuth,
	validateResourceCreation,
	resourceCreate
)
router.get('/:id/resource', CheckAuth, resourceGet)
router.delete('/remove/:id/resource/:resourceId', CheckAuth, resourceRemoveById)
router.get('/:id/resource/:resourceId', CheckAuth, resourceGetById)
router.get('/:id/:name', resourceGetByName)
router.patch('/:id/change/name', CheckAuth, updateProjectName)
router.get('/:id/:name/:objectId', resourceGetByNameAndId)

export default router
