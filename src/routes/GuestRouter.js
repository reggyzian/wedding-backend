const router = require('express').Router();
const { Guest } = require('../controllers/Index');

router.get('/guest', Guest.list);
router.get('/guest/:id', Guest.load);
router.post('/guest/add', Guest.add);
router.post('/guest/update', Guest.update);
router.post('/guest/delete/', Guest.delete);

module.exports = router;