import { body } from 'express-validator'
import User from '../models/User.js'

export const validateProjectCreation = [
	body('projectname')
		.notEmpty()
		.withMessage('Название проекта обязательно')
		.custom(async (projectname, { req }) => {
			const userId = req.userId
			const user = await User.findById(userId)
			if (!user) {
				throw new Error('Пользователь не найден')
			}
			const projectExists = user.projects.some(
				project => project.name.toLowerCase() === projectname.toLowerCase()
			)
			if (projectExists) {
				throw new Error('Проект с таким названием уже существует')
			}
			return true
		}),
]

export const validateResourceCreation = [
	body('name')
		.notEmpty()
		.withMessage('Название ресурса обязательно')
		.custom(async (name, { req }) => {
			const { projectId } = req.body
			const userId = req.userId
			const user = await User.findById(userId)
			if (!user) {
				throw new Error('Пользователь не найден')
			}
			const project = user.projects.find(
				project => project.projectId.toString() === projectId
			)
			if (!project) {
				throw new Error('Проект не найден')
			}
			const resourceExists = project.resources.some(
				resource => resource.name.toLowerCase() === name.toLowerCase()
			)
			if (resourceExists) {
				throw new Error('Ресурс с таким названием уже существует')
			}
			return true
		}),
]
