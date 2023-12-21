const Router = require('koa-router')
const clientController = require('../Controllers/clienteController')

const router = new Router({ prefix: '/clients'})

router.get('/',clientController.getClients);
router.post('/',clientController.createClient);
router.get('/clients-to-do-follow-up',clientController.getClientsFollowUp);
router.get('/:clientId',clientController.getClientInfo);
router.get('/:clientId/score',clientController.getCalculatedClient);

module.exports = router;