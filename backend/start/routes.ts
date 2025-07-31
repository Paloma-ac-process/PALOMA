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
import db from '@adonisjs/lucid/services/db'

// Routes publiques
router.get('/', async () => {
  return {
    hello: 'world',
    message: 'Vitrine Client Backend API',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  }
})

// Test endpoint pour vérifier que l'API fonctionne
router.get('/test', async () => {
  return {
    status: 'ok',
    message: 'API is working',
    timestamp: new Date().toISOString(),
    cors: 'enabled',
    environment: process.env.NODE_ENV || 'development'
  }
})

// Simple health check without database
router.get('/ping', async () => {
  return {
    status: 'ok',
    message: 'pong',
    timestamp: new Date().toISOString()
  }
})

// Endpoint de debug pour vérifier la structure de la table users
router.get('/debug/users', async ({ response }) => {
  try {
    const { default: User } = await import('#models/user')
    const users = await User.query().select('*')
    return response.json({ 
      success: true, 
      users: users.map(u => ({
        id: u.id,
        fullName: u.fullName,
        email: u.email,
        role: u.role,
        isVerified: u.isVerified,
        createdAt: u.createdAt
      })),
      total: users.length 
    })
  } catch (error) {
    return response.json({ 
      success: false, 
      error: error.message,
      stack: error.stack 
    })
  }
})

router.get('/health', async () => {
  try {
    // Test simple de la connexion à la base de données
    await db.rawQuery('SELECT 1')
    
    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      database: 'connected',
      environment: process.env.NODE_ENV || 'development'
    }
  } catch (error) {
    return {
      status: 'error',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: error.message,
      environment: process.env.NODE_ENV || 'development'
    }
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
  
  // Routes d'administration des utilisateurs (admin seulement)
  router.get('/users', '#controllers/admin_controller.listUsers').use(middleware.auth())
  router.get('/users/:id', '#controllers/admin_controller.getUser').use(middleware.auth())
  router.post('/users', '#controllers/admin_controller.createUser').use(middleware.auth())
  router.put('/users/:id', '#controllers/admin_controller.updateUser').use(middleware.auth())
  router.delete('/users/:id', '#controllers/admin_controller.deleteUser').use(middleware.auth())
  router.get('/users/stats', '#controllers/admin_controller.getUserStats').use(middleware.auth())
  
  // ... autres routes API si besoin
}).prefix('/api')
