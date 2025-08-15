const { handleBookEvent, handleGetAllEvents } = require("../controllers/event.controller")

const router = require("express").Router()


router.get('/', handleGetAllEvents )

// router.post('/create-event', handleCreateEvent)



module.exports =   router
