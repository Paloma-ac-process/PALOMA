import type { HttpContext } from '@adonisjs/core/http'
import Plan from '#models/plan'

export default class PlansController {
  async index({ auth, response }: HttpContext) {
    const user = auth.user!
    // Si admin, voir tous les plans, sinon seulement ceux du client
    const plans = user.role === 'admin'
      ? await Plan.all()
      : await Plan.query().where('client_id', user.id)
    return response.json(plans)
  }

  async show({ params, response }: HttpContext) {
    const plan = await Plan.find(params.id)
    return response.json(plan)
  }

  async store({ request, response }: HttpContext) {
    const data = request.only(['name', 'clientId', 'filePath'])
    const plan = await Plan.create(data)
    return response.json(plan)
  }

  async update({ params, request, response }: HttpContext) {
    const plan = await Plan.findOrFail(params.id)
    const data = request.only(['name', 'filePath'])
    plan.merge(data)
    await plan.save()
    return response.json(plan)
  }

  async destroy({ params, response }: HttpContext) {
    const plan = await Plan.findOrFail(params.id)
    await plan.delete()
    return response.json({ success: true })
  }
} 