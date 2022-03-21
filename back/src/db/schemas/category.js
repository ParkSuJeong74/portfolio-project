const { Schema, model } = require("mongoose")

const CategorySchema = new Schema({
    id: {
        type: String,
        required: true,
    },
    user_id: {
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
    },
    created_at: {
        type: Date,
        required: true,
    },
    updated_at: {
        type: Date,
        required: true,
    }
}
)
  
const CategoryModel = model("Category", CategorySchema)

module.exports = { CategoryModel }