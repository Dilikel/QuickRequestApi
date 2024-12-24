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
			projectId: new mongoose.Types.ObjectId(),
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

export const resourceCreate = async (req, res) => {
	try {
		const { projectId, name, body } = req.body
		const userId = req.userId
		if (!projectId || !name || !body) {
			return res.status(400).json({ message: 'Все поля обязательны' })
		}
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}
		const project = user.projects.find(
			project => project.projectId.toString() === projectId
		)
		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' })
		}
		const newResource = {
			resourceId: new mongoose.Types.ObjectId(),
			name,
			body,
		}
		project.resources.push(newResource)
		await user.save()
		res
			.status(201)
			.json({ message: 'Ресурс успешно добавлен', resource: newResource })
	} catch (error) {
		res.status(500).json({
			message: 'Не удалось добавить ресурс',
			error: error.message,
		})
	}
}

export const resourceGet = async (req, res) => {
	try {
		const userId = req.userId
		const projectId = req.params.id
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}
		const project = user.projects.find(
			project => project.projectId.toString() === projectId
		)
		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' })
		}
		res.json(project.resources || [])
	} catch (error) {
		res.status(500).json({
			message: 'Не удалось получить ресурсы',
			error: error.message,
		})
	}
}

export const resourceRemoveById = async (req, res) => {
	try {
		const userId = req.userId
		const projectId = req.params.id
		const resourceId = req.params.resourceId
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}
		const project = user.projects.find(
			project => project.projectId.toString() === projectId
		)
		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' })
		}
		const resourceIndex = project.resources.findIndex(
			resource => resource.resourceId.toString() === resourceId
		)
		if (resourceIndex === -1) {
			return res.status(404).json({ message: 'Ресурс не найден' })
		}
		project.resources.splice(resourceIndex, 1)
		await user.save()
		res.json({ message: 'Ресурс успешно удалён' })
	} catch (error) {
		res.status(500).json({
			message: 'Не удалось удалить ресурс',
			error: error.message,
		})
	}
}

export const resourceGetById = async (req, res) => {
	try {
		const userId = req.userId
		const projectId = req.params.id
		const resourceId = req.params.resourceId
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}
		const project = user.projects.find(
			project => project.projectId.toString() === projectId
		)
		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' })
		}
		const resource = project.resources.find(
			resource => resource.resourceId.toString() === resourceId
		)
		if (!resource) {
			return res.status(404).json({ message: 'Ресурс не найден' })
		}
		res.json(resource)
	} catch (error) {
		res.status(500).json({
			message: 'Не удалось получить ресурс',
			error: error.message,
		})
	}
}

export const resourceGetByName = async (req, res) => {
	try {
		const projectId = req.params.id
		const resourceName = req.params.name
		const { name } = req.query
		const user = await User.findOne({
			'projects.projectId': projectId,
		})

		if (!user) {
			return res.status(404).json({ message: 'Проект не найден' })
		}

		const project = user.projects.find(
			project => project.projectId.toString() === projectId
		)

		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' })
		}
		const resource = project.resources.find(
			resource => resource.name === resourceName
		)
		const resources = resource.body

		if (name) {
			const matchingResources = resources.filter(resources =>
				resources.name.toLowerCase().includes(name.toLowerCase())
			)
			if (matchingResources.length > 0) {
				return res.json(matchingResources)
			} else {
				return res.status(404).json({ message: 'Ресурс не найден' })
			}
		}

		if (!resource) {
			return res.status(404).json({ message: 'Ресурс не найден' })
		}
		res.json(resource.body)
	} catch (error) {
		res.status(500).json({
			message: 'Не удалось получить ресурс по имени',
			error: error.message,
		})
	}
}

export const updateProjectName = async (req, res) => {
	try {
		const userId = req.userId
		const projectId = req.params.id
		const { newName } = req.body

		if (!newName) {
			return res.status(400).json({ message: 'Новое имя проекта обязательно' })
		}

		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}

		const project = user.projects.find(
			project => project.projectId.toString() === projectId
		)
		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' })
		}

		project.name = newName
		await user.save()

		res.json({ message: 'Имя проекта успешно обновлено' })
	} catch (error) {
		res.status(500).json({
			message: 'Не удалось обновить имя проекта',
			error: error.message,
		})
	}
}

export const resourceGetByNameAndId = async (req, res) => {
	try {
		const projectId = req.params.id
		const resourceName = req.params.name
		const objectId = parseInt(req.params.objectId)
		const user = await User.findOne({
			'projects.projectId': projectId,
		})

		if (!user) {
			return res.status(404).json({ message: 'Проект не найден' })
		}

		const project = user.projects.find(
			project => project.projectId.toString() === projectId
		)

		if (!project) {
			return res.status(404).json({ message: 'Проект не найден' })
		}
		const resource = project.resources.find(
			resource => resource.name === resourceName
		)

		if (!resource) {
			return res.status(404).json({ message: 'Ресурс не найден' })
		}

		const resourceWithId = resource.body.find(
			resourceWithId => resourceWithId.id === objectId
		)

		if (!resourceWithId) {
			return res.status(404).json({ message: 'Объект с таким id не найден' })
		}
		res.json(resourceWithId)
	} catch (error) {
		res.status(500).json({
			message: 'Не удалось получить ресурс по имени',
			error: error.message,
		})
	}
}
