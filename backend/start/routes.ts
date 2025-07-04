/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'

// Routes publiques
router.get('/', async () => {
  return {
    hello: 'world',
  }
})

// Routes d'authentification API
router.group(() => {
  router.post('/register', '#controllers/auth_controller.register')
  router.post('/login', '#controllers/auth_controller.login')
  router.post('/logout', '#controllers/auth_controller.logout').use(middleware.auth())
  router.get('/me', '#controllers/auth_controller.me').use(middleware.auth())
  router.put('/me', '#controllers/auth_controller.updateMe').use(middleware.auth())
  router.post('/verify-code', '#controllers/auth_controller.verifyCode')
  router.post('/resend-code', '#controllers/auth_controller.resendCode')
  router.post('/forgot-password', '#controllers/auth_controller.forgotPassword')
  router.post('/reset-password', '#controllers/auth_controller.resetPassword')
  // ... autres routes API si besoin
}).prefix('/api')
