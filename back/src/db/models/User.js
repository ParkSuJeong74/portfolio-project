const { UserModel } = require("../schemas/user")

const User = {
  create: async ({ newUser }) => {
    const createdNewUser = await UserModel.create(newUser)
    return createdNewUser
  },

  findByEmail: async ({ email }) => {
    const user = await UserModel.findOne({ email })
    return user
  },

  findById: async ({ user_id }) => {
    const user = await UserModel.findOne({ id: user_id })
    return user
  },

  findAll: async () => {
    const users = await UserModel.find({})
    return users
  },

  update: async ({ user_id, fieldToUpdate, newValue }) => {
    const filter = { id: user_id }
    const update = {
      $set: {
        [fieldToUpdate[0]]: newValue[0],
        [fieldToUpdate[1]]: newValue[1],
        [fieldToUpdate[2]]: newValue[2],
        [fieldToUpdate[3]]: newValue[3]
      }
    }
    const option = { returnOriginal: false }

    const updatedUser = await UserModel.findOneAndUpdate(
      filter,
      update,
      option
    )
    return updatedUser
  }
}

module.exports = { User }
