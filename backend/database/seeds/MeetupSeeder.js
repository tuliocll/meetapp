'use strict'

/*
|--------------------------------------------------------------------------
| MeetupSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const { addHours } = require('date-fns')

const Factory = use('Factory')

class MeetupSeeder {
  async run () {
    await Factory.model('App/Models/Evento').create({
      title: 'Encontro ReactJS Bahia',
      description:
        'Duis nisi risus, hendrerit eget condimentum ac, mattis eu turpis. Aenean aliquam lectus ut velit volutpat, nec iaculis nunc mollis. Nulla euismod magna et urna placerat',
      date: addHours(new Date(), 1),
      location: 'Jequié, Bahia',
      file_id: 1,
      user_id: async () => {
        return (await Factory.model('App/Models/User').create()).id
      }
    })

    await Factory.model('App/Models/Evento').create({
      title: 'Nodejs Conf',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam vitae turpis ultricies, iaculis turpis id, fermentum lacus. Interdum et malesuada fames ac ante ipsum primis in faucibus',
      date: addHours(new Date(), 2),
      location: 'São Paulo, Sp',
      file_id: 2,
      user_id: 1
    })

    await Factory.model('App/Models/Evento').create({
      title: 'React Native Conf',
      description:
        'Phasellus nisi augue, volutpat in augue eu, hendrerit consequat est. Sed laoreet turpis eu nisi tincidunt, id pretium lac',
      date: addHours(new Date(), 3),
      location: 'São Paulo, SP.',
      file_id: 3,
      user_id: 1
    })

    await Factory.model('App/Models/Evento').create({
      title: 'Rocketseat XP',
      description:
        'O Rocketseat Experience é o foguete que vai te levar direto para o próximo nível, trazendo uma experiência única na sua carreira e acelerando ao máximo a sua evolução como programador.O objetivo do evento é causar impacto no cenário de programação, e te colocar de frente com as melhores oportunidades do mercado.Seja através das tecnologias, do networking, do aprendizado, das mentorias, da inspiração, dos desafios, dos prêmios, dos parceiros, serão 3 dias de imersão total para mudar completamente o rumo da sua carreira ou dos seus negócios.',
      date: '2019-11-25 09:00:00',
      location: 'São Paulo, SP',
      file_id: 4,
      user_id: 1
    })
  }
}

module.exports = MeetupSeeder
