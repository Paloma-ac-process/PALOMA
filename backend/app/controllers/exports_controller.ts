import type { HttpContext } from '@adonisjs/core/http'
import Export from '#models/export'

export default class ExportsController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const exportsList = user.role === 'admin'
      ? await Export.all()
      : await Export.query().where('client_id', user.id)
    return response.json(exportsList)
  }

  async show({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const exportItem = await Export.findOrFail(params.id)
    if (user.role !== 'admin' && exportItem.clientId !== user.id) {
      return response.unauthorized({ error: 'Accès interdit' })
    }
    return response.json(exportItem)
  }

  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const data = request.only(['clientId', 'type', 'filePath', 'status'])
    if (user.role !== 'admin' && data.clientId !== user.id) {
      return response.unauthorized({ error: 'Accès interdit' })
    }
    const exportItem = await Export.create(data)
    return response.json(exportItem)
  }

  async update({ params, request, auth, response }: HttpContext) {
    const user = auth.user!
    const exportItem = await Export.findOrFail(params.id)
    if (user.role !== 'admin' && exportItem.clientId !== user.id) {
      return response.unauthorized({ error: 'Accès interdit' })
    }
    const data = request.only(['type', 'filePath', 'status'])
    exportItem.merge(data)
    await exportItem.save()
    return response.json(exportItem)
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const exportItem = await Export.findOrFail(params.id)
    if (user.role !== 'admin' && exportItem.clientId !== user.id) {
      return response.unauthorized({ error: 'Accès interdit' })
    }
    await exportItem.delete()
    return response.json({ success: true })
  }
} 