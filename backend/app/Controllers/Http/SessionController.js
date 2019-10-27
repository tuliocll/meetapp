'use strict'
const User = use('App/Models/User')

class SessionController {
  async store ({ request, response, auth }) {
    const { email, password } = request.all()
    try {
      if (await auth.attempt(email, password)) {
        const user = await User.query()
          .with('avatar')
          .where('email', email)
          .select('id', 'name', 'email', 'file_id')
          .first()

        const token = await auth.generate(user)

        return { user: user, token: token.token }
      }
    } catch (err) {
      return response
        .status(err.status)
        .send({ message: 'You are not registered!' })
    }
  }
}

module.exports = SessionController
