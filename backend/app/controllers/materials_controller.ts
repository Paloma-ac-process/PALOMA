import type { HttpContext } from '@adonisjs/core/http'
import Material from '#models/material'
import Plan from '#models/plan'

export default class MaterialsController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const plans = user.role === 'admin' ? null : await Plan.query().where('client_id', user.id)
    const planIds = plans ? plans.map(p => p.id) : undefined
    const materials = user.role === 'admin'
      ? await Material.all()
      : await Material.query().whereIn('plan_id', planIds)
    return response.json(materials)
  }

  async show({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const material = await Material.findOrFail(params.id)
    if (user.role !== 'admin') {
      const plan = await Plan.findOrFail(material.planId)
      if (plan.clientId !== user.id) {
        return response.unauthorized({ error: 'Accès interdit' })
      }
    }
    return response.json(material)
  }

  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const data = request.only(['planId', 'name', 'type', 'properties'])
    if (user.role !== 'admin') {
      const plan = await Plan.findOrFail(data.planId)
      if (plan.clientId !== user.id) {
        return response.unauthorized({ error: 'Accès interdit' })
      }
    }
    const material = await Material.create(data)
    return response.json(material)
  }

  async update({ params, request, auth, response }: HttpContext) {
    const user = auth.user!
    const material = await Material.findOrFail(params.id)
    if (user.role !== 'admin') {
      const plan = await Plan.findOrFail(material.planId)
      if (plan.clientId !== user.id) {
        return response.unauthorized({ error: 'Accès interdit' })
      }
    }
    const data = request.only(['name', 'type', 'properties'])
    material.merge(data)
    await material.save()
    return response.json(material)
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const material = await Material.findOrFail(params.id)
    if (user.role !== 'admin') {
      const plan = await Plan.findOrFail(material.planId)
      if (plan.clientId !== user.id) {
        return response.unauthorized({ error: 'Accès interdit' })
      }
    }
    await material.delete()
    return response.json({ success: true })
  }
} 