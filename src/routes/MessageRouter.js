const router = require('express').Router();
const { Message } = require('../controllers/Index');

router.get('/', Message.list);
router.post('/add', Message.add);
router.post('/delete/', Message.delete);

module.exports = router;