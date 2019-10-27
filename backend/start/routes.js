'use strict'

const Route = use('Route')

Route.post('users', 'UserController.store').validator('User')
Route.post('sessions', 'SessionController.store').validator('Session')
Route.post('forgotPassword', 'ForgotPasswordController.store').validator(
  'ForgotPassword'
)

Route.get('files/:id', 'FileController.show')
Route.group(() => {
  Route.put('users', 'UserController.update')
  Route.get('users', 'UserController.index')
  Route.get('users/meetups/:page', 'UserController.findByUser')
  Route.post('files', 'FileController.store')
  Route.resource('eventos', 'EventoController')
    .apiOnly()
    .validator(new Map([[['eventos.store'], ['Eventos']]]))

  Route.resource(
    'eventos.participantes',
    'EventoParticipanteController'
  ).apiOnly()
}).middleware(['auth'])
