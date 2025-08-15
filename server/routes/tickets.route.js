const { handleBookTicket, handleGetTickets, handleCancelTickets } = require('../controllers/ticket.controller')

const router =  require('express').Router()


router.post('/book', handleBookTicket )

router.get('/', handleGetTickets)

router.patch('/', handleCancelTickets)


module.exports = router