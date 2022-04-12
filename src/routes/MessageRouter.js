const router = require('express').Router();
const { Message } = require('../controllers/Index');

router.get('/message', Message.list);
router.get('/message/:id', Message.load);
router.post('/message/add', Message.add);
router.post('/message/update', Message.update);
router.post('/message/delete/', Message.delete);

module.exports = router;