const router = require('express').Router();
const Guest = require('./GuestRouter');
const Message = require('./MessageRouter');

const Main = {
    home(req, res){
        res.send({ 
            success: true, 
            message: 'Hello World'
        });
    }
}

router.get('/', Main.home);
router.use('/guest', Guest);
router.use('/message', Message);

module.exports = router;