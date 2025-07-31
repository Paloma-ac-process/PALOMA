#!/usr/bin/env node

import { randomInt } from 'crypto'

async function testEmail() {
  console.log('🧪 Test d\'envoi d\'email...')
  
  try {
    // Import du service mail
    const mail = await import('@adonisjs/mail/services/main').then(m => m.default)
    
    // Générer un code de test
    const testCode = String(randomInt(100000, 999999))
    const testEmail = 'test@example.com' // Remplacez par votre email
    
    console.log(`📧 Tentative d'envoi à: ${testEmail}`)
    console.log(`🔢 Code de test: ${testCode}`)
    
    // Envoyer l'email de test
    await mail.send((message) => {
      message
        .to(testEmail)
        .subject('Test - Code de vérification')
        .html(`
          <h2>Test d'envoi d'email</h2>
          <p>Bonjour,</p>
          <p>Ceci est un test d'envoi d'email.</p>
          <p>Code de test : <b>${testCode}</b></p>
          <p>Timestamp : ${new Date().toISOString()}</p>
        `)
    })
    
    console.log('✅ Email envoyé avec succès!')
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi d\'email:')
    console.error('Message:', error.message)
    console.error('Stack:', error.stack)
    
    // Afficher les variables d'environnement SMTP (sans les mots de passe)
    console.log('\n🔧 Configuration SMTP:')
    console.log('SMTP_HOST:', process.env.SMTP_HOST || 'Non défini')
    console.log('SMTP_PORT:', process.env.SMTP_PORT || 'Non défini')
    console.log('SMTP_USER:', process.env.SMTP_USER || 'Non défini')
    console.log('SMTP_PASS:', process.env.SMTP_PASS ? '***' : 'Non défini')
  }
}

// Exécution du test
testEmail().then(() => {
  console.log('✅ Test terminé.')
  process.exit(0)
}).catch((error) => {
  console.error('❌ Erreur fatale:', error)
  process.exit(1)
}) 