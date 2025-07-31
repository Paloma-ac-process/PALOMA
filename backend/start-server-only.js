#!/usr/bin/env node

import { spawn } from 'child_process'
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

console.log('🚀 Starting server only (no migrations)...')

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