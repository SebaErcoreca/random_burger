import UserModel from '../dao/models/users.model.js'

class UserServices {
  async createUser(user) {
    try {
      const userExists = await UserModel.findOne({ email: user.email })
      if (userExists) {
        throw new Error('User already exists')
      }
      const createdUser = await UserModel.create( user )
      return createdUser
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async getUser(email) {
    try {
      const users = await UserModel.findOne({ email }).lean()
      if (!users) {
        throw new Error('User not found')
      }
      return users
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

const userService = new UserServices();
export default userService;
