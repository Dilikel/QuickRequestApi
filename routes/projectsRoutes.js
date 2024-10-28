import express from 'express'
import { projectsCreate } from '../controllers/ProjectsController'

const router = express.Router()

router.post('/create', projectsCreate)

export default router
