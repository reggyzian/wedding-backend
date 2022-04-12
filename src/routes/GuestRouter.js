const router = require('express').Router();
const { Guest } = require('../controllers/Index');

router.get('/', Guest.list);
router.get('/:id', Guest.load);
router.post('/add', Guest.add);
router.post('/update', Guest.update);
router.post('/delete/', Guest.delete);

module.exports = router;