const router = require('express').Router();
const Guest = require('./GuestRouter');
const Message = require('./MessageRouter');

router.use('/guest', Guest);
router.use('/message', Message);

module.exports = router;