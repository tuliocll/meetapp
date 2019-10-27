'use strict'

/*
|--------------------------------------------------------------------------
| FileSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')

class FileSeeder {
  async run () {
    await Factory.model('App/Models/File').create({
      file: 'reactjs.jpeg',
      name: 'reactjs.jpeg',
      type: 'image',
      subtype: 'jpeg'
    })

    await Factory.model('App/Models/File').create({
      file: 'nodejs.jpeg',
      name: 'nodejs.jpeg',
      type: 'image',
      subtype: 'jpeg'
    })

    await Factory.model('App/Models/File').create({
      file: 'react.png',
      name: 'react.png',
      type: 'image',
      subtype: 'png'
    })

    await Factory.model('App/Models/File').create({
      file: 'rocketseat.png',
      name: 'rocketseat.png',
      type: 'image',
      subtype: 'png'
    })
  }
}

module.exports = FileSeeder
