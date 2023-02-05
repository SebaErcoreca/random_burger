import authService from '../services/auth.services.js'

export async function login(req, res) {
  try {
    const { email, password } = req.body
    const userIsLogged = await authService.login(email, password)
    if (userIsLogged) {
      req.session.logged = true
      delete userIsLogged.password
      req.session.user = userIsLogged
      res.status(200).redirect('/products')
    } else {
      res.status(401).json({
        success: false,
        message: 'Username or password is incorrect'
    });
    }
  } catch (error) {
    res.status(500).json({ Error: error.message })
  }
}

export async function logout(req, res) {
  try {
    req.session.destroy((error) =>{
      if (error) {
        res.status(500).json({
          success: false,
          Error: error.message
        })
      }
    })
    res.status(200).redirect('/')
  } catch (error) {
    res.status(500).json({ Error: error.message })
  }
}