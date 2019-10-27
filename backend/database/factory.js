'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

Factory.blueprint('App/Models/User', (faker, i, data) => {
  const defaultValue = {
    name: 'admin',
    email: 'email@email.com',
    password: '123123'
  }

  return Object.assign(defaultValue, data)
})

Factory.blueprint('App/Models/File', (faker, i, data) => {
  return {
    file: data.file,
    name: data.name,
    type: data.type,
    subtype: data.subtype
  }
})

Factory.blueprint('App/Models/Evento', (faker, i, data) => {
  return {
    title: data.title,
    description: data.description,
    date: data.date,
    location: data.location,
    file_id: data.file_id,
    user_id: data.user_id
  }
})
