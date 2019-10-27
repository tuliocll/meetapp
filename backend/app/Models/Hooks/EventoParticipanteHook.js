'use strict'

const Kue = use('Kue')
const Job = use('App/Jobs/NewParticipanteEmail')

const EventoParticipanteHook = (exports = module.exports = {})

EventoParticipanteHook.sendNewParticipanteMail = async eventoInstance => {
  if (!eventoInstance.user_id && !eventoInstance.dirty.user_id) {
    return
  }
  try {
    const { email, name } = await eventoInstance.user().fetch()
    const { title, description } = await eventoInstance.evento().fetch()

    Kue.dispatch(Job.key, { email, name, title, description }, { attempts: 3 })
  } catch (err) {
    console.log('Erro:', err)
  }
}
