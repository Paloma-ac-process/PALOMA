#!/usr/bin/env node

import { createServer } from 'http'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('🚀 Starting test HTTP server...')

// Function to handle the actual request logic
function handleRequest(req, res, body = null) {
  // Handle different routes
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      message: 'Test server is working!',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    }))
  } else if (req.url === '/ping') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      status: 'ok',
      message: 'pong',
      timestamp: new Date().toISOString()
    }))
  } else if (req.url === '/test') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      status: 'ok',
      message: 'Test endpoint working',
      timestamp: new Date().toISOString(),
      cors: 'enabled'
    }))
  } else if (req.url === '/api/login' && req.method === 'POST') {
    try {
      const loginData = body ? JSON.parse(body) : {}
      console.log('Login attempt:', loginData)
      
      // Simuler une validation basique
      if (!loginData.email || !loginData.password) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          message: 'Email et mot de passe requis'
        }))
        return
      }
      
      // Simuler un login réussi
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        message: 'Connexion réussie (mode test)',
        user: {
          id: 1,
          email: loginData.email,
          fullName: 'Utilisateur Test',
          role: 'user',
          isVerified: true
        }
      }))
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        message: 'Données invalides'
      }))
    }
  } else if (req.url === '/api/register' && req.method === 'POST') {
    try {
      const registerData = body ? JSON.parse(body) : {}
      console.log('Register attempt:', registerData)
      
      // Simuler une validation basique
      if (!registerData.email || !registerData.password || !registerData.fullName) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          message: 'Email, mot de passe et nom complet requis'
        }))
        return
      }
      
      // Simuler un code de vérification
      const verificationCode = String(Math.floor(100000 + Math.random() * 900000))
      console.log(`Code de vérification généré pour ${registerData.email}: ${verificationCode}`)
      
      // Simuler un utilisateur créé
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        message: 'Utilisateur créé. Un code de vérification a été envoyé par email.',
        user: {
          id: Math.floor(Math.random() * 1000),
          email: registerData.email,
          fullName: registerData.fullName,
          role: 'user',
          isVerified: false
        },
        verificationCode: verificationCode // En mode test, on retourne le code
      }))
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        message: 'Données invalides'
      }))
    }
  } else if (req.url === '/api/me' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      success: true,
      user: {
        id: 1,
        email: 'test@example.com',
        fullName: 'Utilisateur Test',
        role: 'user',
        isVerified: true
      }
    }))
  } else if (req.url === '/api/resend-code' && req.method === 'POST') {
    try {
      const resendData = body ? JSON.parse(body) : {}
      console.log('Resend code attempt:', resendData)
      
      if (!resendData.email) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          message: 'Email requis'
        }))
        return
      }
      
      // Simuler un nouveau code de vérification
      const newCode = String(Math.floor(100000 + Math.random() * 900000))
      console.log(`Nouveau code de vérification pour ${resendData.email}: ${newCode}`)
      
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        message: 'Nouveau code envoyé par email',
        verificationCode: newCode // En mode test, on retourne le code
      }))
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        message: 'Données invalides'
      }))
    }
  } else if (req.url === '/api/verify-code' && req.method === 'POST') {
    try {
      const verifyData = body ? JSON.parse(body) : {}
      console.log('Verify code attempt:', verifyData)
      
      if (!verifyData.email || !verifyData.code) {
        res.writeHead(400, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({
          success: false,
          message: 'Email et code requis'
        }))
        return
      }
      
      // En mode test, on accepte n'importe quel code
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: true,
        message: 'Compte vérifié avec succès'
      }))
    } catch (error) {
      res.writeHead(400, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify({
        success: false,
        message: 'Données invalides'
      }))
    }
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      error: 'Not found',
      path: req.url,
      method: req.method
    }))
  }
}

const server = createServer((req, res) => {
  // Get the origin from the request
  const origin = req.headers.origin
  
  // Set CORS headers - don't use wildcard when credentials are involved
  if (origin) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Allow-Credentials', 'true')
  
  if (req.method === 'OPTIONS') {
    res.writeHead(200)
    res.end()
    return
  }
  
  // Handle POST requests with body
  if (req.method === 'POST') {
    let body = ''
    req.on('data', chunk => {
      body += chunk.toString()
    })
    req.on('end', () => {
      // Continue with the rest of the request handling
      handleRequest(req, res, body)
    })
    return
  }
  
  // Handle GET requests directly
  handleRequest(req, res)
})

const port = process.env.PORT || 3333
server.listen(port, '0.0.0.0', () => {
  console.log(`✅ Test server running on port ${port}`)
  console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`)
})

// Handle graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Received SIGTERM, shutting down gracefully...')
  server.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
})

process.on('SIGINT', () => {
  console.log('🛑 Received SIGINT, shutting down gracefully...')
  server.close(() => {
    console.log('✅ Server closed')
    process.exit(0)
  })
}) 