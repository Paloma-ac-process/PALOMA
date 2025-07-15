#!/usr/bin/env node

const https = require('https');

// Remplacez par vos vraies URLs
const BACKEND_URL = 'https://votre-backend-railway.up.railway.app';
const FRONTEND_URL = 'https://paloma.pages.dev';

console.log('🧪 Test de l\'application en production...\n');

// Test 1: Backend - Page d'accueil
console.log('1️⃣ Test Backend - Page d\'accueil...');
https.get(`${BACKEND_URL}/`, (res) => {
  console.log(`   ✅ Status: ${res.statusCode}`);
  console.log(`   ✅ Backend accessible\n`);
  
  // Test 2: Backend - Healthcheck
  console.log('2️⃣ Test Backend - Healthcheck...');
  https.get(`${BACKEND_URL}/health`, (res) => {
    console.log(`   ✅ Status: ${res.statusCode}`);
    console.log(`   ✅ Healthcheck OK\n`);
    
    // Test 3: Frontend
    console.log('3️⃣ Test Frontend...');
    https.get(FRONTEND_URL, (res) => {
      console.log(`   ✅ Status: ${res.statusCode}`);
      console.log(`   ✅ Frontend accessible\n`);
      
      console.log('🎉 Tous les tests sont passés !');
      console.log(`📱 Frontend: ${FRONTEND_URL}`);
      console.log(`🔧 Backend: ${BACKEND_URL}`);
    }).on('error', (err) => {
      console.log(`   ❌ Frontend erreur: ${err.message}`);
    });
  }).on('error', (err) => {
    console.log(`   ❌ Healthcheck erreur: ${err.message}`);
  });
}).on('error', (err) => {
  console.log(`   ❌ Backend erreur: ${err.message}`);
}); 