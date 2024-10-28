import User from '../models/User.js'

export const projectsCreate = async (req, res) => {
	try {
		const { projectname } = req.body
		const userId = req.userId
		const user = await User.findById(userId)
		if (!user) {
			return res.status(404).json({ message: 'Пользователь не найден' })
		}
		const newProject = { name: projectname }
		user.projects.push(newProject)
		await user.save()
		const projectId = user.projects[user.projects.length - 1].projectId
		res.status(201).json({ projectId })
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
