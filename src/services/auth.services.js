import userService from './users.services.js'

class AuthServices {
  async login(email, password) {
    try {
      const user = await userService.getUser(email)
      if (!user) {
        throw new Error('User not found')
      }
      if (user.password !== password) {
        throw new Error('Wrong password')
      }
      return user
    } catch (error) {
      throw new Error(error.message)
    }
  }
}

const authServices = new AuthServices();
export default authServices;
