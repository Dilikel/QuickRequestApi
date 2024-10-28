import express from 'express'
import {
	projectsCreate,
	projectsGet,
} from '../controllers/ProjectsController.js'
import CheckAuth from '../middlewares/CheckAuth.js'

const router = express.Router()

router.post('/create', CheckAuth, projectsCreate)
router.get('/', CheckAuth, projectsGet)

export default router
