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
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify({
      success: true,
      message: 'Register endpoint (test mode)',
      timestamp: new Date().toISOString(),
      body: body ? JSON.parse(body) : null
    }))
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