#!/usr/bin/env node

import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('🚀 Starting production server...')

// Function to run migrations with retry logic
async function runMigrations() {
  return new Promise((resolve) => {
    console.log('📦 Running database migrations...')
    
    const migrationProcess = spawn('node', ['build/ace', 'migration:run', '--force'], {
      stdio: 'inherit',
      cwd: __dirname
    })
    
    migrationProcess.on('close', (code) => {
      if (code !== 0) {
        console.log(`⚠️  Migration process exited with code ${code}, but continuing...`)
        console.log('⚠️  This might be due to database connection issues or migrations already applied')
      } else {
        console.log('✅ Migrations completed successfully')
      }
      resolve()
    })
    
    // Handle migration timeout
    setTimeout(() => {
      console.log('⏰ Migration timeout, continuing anyway...')
      migrationProcess.kill('SIGTERM')
      resolve()
    }, 30000) // 30 seconds timeout
  })
}

// Function to start the server
function startServer() {
  console.log('🌐 Starting HTTP server...')
  
  const serverProcess = spawn('node', ['build/ace', 'serve', '--watch=false'], {
    stdio: 'inherit',
    cwd: __dirname
  })
  
  serverProcess.on('close', (code) => {
    console.log(`❌ Server process exited with code ${code}`)
    process.exit(code)
  })
  
  // Handle process termination
  process.on('SIGTERM', () => {
    console.log('🛑 Received SIGTERM, shutting down gracefully...')
    serverProcess.kill('SIGTERM')
  })
  
  process.on('SIGINT', () => {
    console.log('🛑 Received SIGINT, shutting down gracefully...')
    serverProcess.kill('SIGINT')
  })
}

// Main execution
runMigrations().then(() => {
  startServer()
}).catch((error) => {
  console.error('❌ Error during startup:', error)
  process.exit(1)
}) 