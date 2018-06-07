const express = require('express')
const auth = require('./auth')

module.exports = (server) => {

  /**
   * Rotas protegidas po Token JWT
   */
  const protectedApi = express.Router()
  server.use('/api', protectedApi)

  protectedApi.use(auth)

  /**
   * Billing Cycle
   * CRUD
   */
  const billingCycleService = require('../api/billingCycle/billingCycleService')
  billingCycleService.register(protectedApi, '/billing-cycles')

  /**
   * Billing Cycle Summary
   * GET
   */
  const billingSummaryService = require('../api/billingSummary/billingSummaryService')
  protectedApi.route('/billing-summary').get(billingSummaryService.getSummary)

  /**
  * Rotas abertas
  * [Login, Signup e validateToken]
  * POST
  */
  const openApi = express.Router()
  server.use('/oapi', openApi)

  const AuthServer = require('../api/user/authService')
  openApi.post('/login', AuthServer.login)
  openApi.post('/signup', AuthServer.signup)
  openApi.post('/validate-token', AuthServer.validatorToken)

}
