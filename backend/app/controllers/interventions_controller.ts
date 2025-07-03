import type { HttpContext } from '@adonisjs/core/http'
import Intervention from '#models/intervention'
import Plan from '#models/plan'

export default class InterventionsController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    const interventions = user.role === 'admin'
      ? await Intervention.all()
      : await Intervention.query().whereIn('plan_id', await Plan.query().where('client_id', user.id).pluck('id'))
    return response.json(interventions)
  }

  async show({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const intervention = await Intervention.findOrFail(params.id)
    if (user.role !== 'admin') {
      const plan = await Plan.findOrFail(intervention.planId)
      if (plan.clientId !== user.id) {
        return response.unauthorized({ error: 'Accès interdit' })
      }
    }
    return response.json(intervention)
  }

  async store({ request, auth, response }: HttpContext) {
    const user = auth.user!
    const data = request.only(['planId', 'type', 'date', 'description', 'status'])
    if (user.role !== 'admin') {
      const plan = await Plan.findOrFail(data.planId)
      if (plan.clientId !== user.id) {
        return response.unauthorized({ error: 'Accès interdit' })
      }
    }
    const intervention = await Intervention.create(data)
    return response.json(intervention)
  }

  async update({ params, request, auth, response }: HttpContext) {
    const user = auth.user!
    const intervention = await Intervention.findOrFail(params.id)
    if (user.role !== 'admin') {
      const plan = await Plan.findOrFail(intervention.planId)
      if (plan.clientId !== user.id) {
        return response.unauthorized({ error: 'Accès interdit' })
      }
    }
    const data = request.only(['type', 'date', 'description', 'status'])
    intervention.merge(data)
    await intervention.save()
    return response.json(intervention)
  }

  async destroy({ params, auth, response }: HttpContext) {
    const user = auth.user!
    const intervention = await Intervention.findOrFail(params.id)
    if (user.role !== 'admin') {
      const plan = await Plan.findOrFail(intervention.planId)
      if (plan.clientId !== user.id) {
        return response.unauthorized({ error: 'Accès interdit' })
      }
    }
    await intervention.delete()
    return response.json({ success: true })
  }
} 