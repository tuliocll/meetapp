'use strict'

const Mail = use('Mail')

class NewParticipanteEmail {
  // If this getter isn't provided, it will default to 1.
  // Increase this number to increase processing concurrency.
  static get concurrency () {
    return 1
  }

  // This is required. This is a unique key used to identify this job.
  static get key () {
    return 'NewParticipanteEmail-job'
  }

  // This is where the work is done.
  async handle ({ email, name, title, description }) {
    console.log(`Job: ${NewParticipanteEmail.key}`)
    await Mail.send(
      ['emails.novo_participante'],
      { name, title, description },
      message => {
        message
          .to(email)
          .from('contato@meetapp.com.br', 'Meetapp')
          .subject('Você está participando de um novo evento')
      }
    )
  }
}

module.exports = NewParticipanteEmail
