import mongoose from 'mongoose'

const projectSchema = new mongoose.Schema({
	name: { type: String, required: true },
	projectId: {
		type: mongoose.Schema.Types.ObjectId,
		default: () => new mongoose.Types.ObjectId(),
	},
})

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		age: { type: Number, required: true },
		email: { type: String, required: true, unique: true },
		passwordHash: { type: String, required: true },
		projects: [projectSchema],
	},
	{ timestamps: true }
)

export default mongoose.model('User', userSchema)
