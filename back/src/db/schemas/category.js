const { Schema, model } = require("mongoose")

const CategorySchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    userId: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
    },
    {
        timestamps: true
    }
)
  
const CategoryModel = model("Category", CategorySchema)

module.exports = { CategoryModel }
