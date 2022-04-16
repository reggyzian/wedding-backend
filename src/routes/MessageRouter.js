const router = require('express').Router();
const { Message } = require('../controllers/Index');

router.get('/', Message.list);
router.get('/:id', Message.load);
router.post('/add', Message.add);
router.post('/update', Message.update);
router.post('/delete/', Message.delete);

module.exports = router;