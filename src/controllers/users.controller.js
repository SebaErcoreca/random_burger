import userService from "../services/users.services.js";

export async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body);
    if (!user) {
      throw new Error("User not created");
    }
    delete user.password;
    res.status(201).redirect('/');
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}

export async function getUser(req, res) {
  try {
    const { email } =  req.params;
    const user = await userService.getUser(email);
    if (!user) {
      throw new Error("User not found");
    }
    delete user.password;
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(500).json({ Error: error.message });
  }
}