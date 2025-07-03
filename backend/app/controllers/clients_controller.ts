import type { HttpContext } from '@adonisjs/core/http'
import Client from '#models/client'

export default class ClientsController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    if (user.role !== 'admin') {
      return response.unauthorized({ error: 'Accès interdit' })
    }
    const clients = await Client.all()
    return response.json(clients)
  }

  async show({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const client = await Client.findOrFail(params.id)
    if (user.role !== 'admin' && user.id !== client.id) {
      return response.unauthorized({ error: 'Accès interdit' })
    }
    return response.json(client)
  }

  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    if (user.role !== 'admin') {
      return response.unauthorized({ error: 'Accès interdit' })
    }
    const data = request.only(['name', 'email'])
    const client = await Client.create(data)
    return response.json(client)
  }

  async update({ params, request, auth, response }: HttpContext) {
    const user = auth.user!
    const client = await Client.findOrFail(params.id)
    if (user.role !== 'admin' && user.id !== client.id) {
      return response.unauthorized({ error: 'Accès interdit' })
    }
    const data = request.only(['name', 'email'])
    client.merge(data)
    await client.save()
    return response.json(client)
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const client = await Client.findOrFail(params.id)
    if (user.role !== 'admin') {
      return response.unauthorized({ error: 'Accès interdit' })
    }
    await client.delete()
    return response.json({ success: true })
  }
} 