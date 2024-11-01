import mongoose from 'mongoose'
import User from '../models/User.js'

export const projectsCreate = async (req, res) => {
	try {
		const { projectname } = req.body
		const userId = req.userId
		const user = await User.findById(userId)

		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		const newProject = {
			projectId: new mongoose.Types.ObjectId().toString(),
			name: projectname,
		}
		user.projects.push(newProject)

		await user.save()
		res.status(201).json({ projectId: newProject.projectId })
	} catch (error) {
		res.status(500).json({
			message: 'Не удалось создать проект',
			error: error.message,
		})
	}
}

export const projectsGet = async (req, res) => {
	try {
		const userId = req.userId
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}
		res.json(user.projects)
	} catch (error) {
		res.status(500).json({
			message: 'Не удалось получить проекты',
			error: error.message,
		})
	}
}

export const projectsGetById = async (req, res) => {
	try {
		const userId = req.userId
		const user = await User.findById(userId)

		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		const project = user.projects.find(
			project => project.projectId.toString() === req.params.id
		)

		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' })
		}

		res.json(project)
	} catch (error) {
		res.status(500).json({
			message: 'Не удалось получить проект',
			error: error.message,
		})
	}
}

export const projectRemoveById = async (req, res) => {
	try {
		const userId = req.userId
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}
		const projectIndex = user.projects.findIndex(
			project => project.projectId.toString() === req.params.id
		)
		if (projectIndex === -1) {
			return res.status(404).json({ message: 'Проект не найден' })
		}
		user.projects.splice(projectIndex, 1)
		await user.save()
		res.json({ message: 'Проект успешно удалён' })
	} catch (error) {
		res.status(500).json({
			message: 'Не удалось удалить проект',
			error: error.message,
		})
	}
}
