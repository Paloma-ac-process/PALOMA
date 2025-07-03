import app from '@adonisjs/core/services/app'
import User from './app/models/user.js'

await app.boot()

const email = 'th30pelli@gmail.com'
const password = 'password123'
const role = 'admin'

let user = await User.findBy('email', email)

if (!user) {
  user = await User.create({ email, password, role })
  console.log('✅ Compte admin créé !')
} else {
  user.role = role
  if (password) user.password = password // Optionnel : réinitialise le mot de passe
  await user.save()
  console.log('✅ Rôle admin appliqué à l\'utilisateur existant !')
}

console.log(`Email : ${email}`)
console.log(`Mot de passe : ${password}`)
console.log(`Rôle : ${role}`)

process.exit(0) 