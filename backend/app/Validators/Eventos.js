'use strict'

const Antl = use('Antl')

class Eventos {
  get validateAll () {
    return true
  }

  get rules () {
    return {
      title: 'required',
      description: 'required',
      date: 'required|date',
      location: 'required',
      file_id: 'required|integer'
    }
  }

  get messages () {
    return Antl.list('validation')
  }
}

module.exports = Eventos
