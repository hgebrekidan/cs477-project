const express = require('express')
const router = express.Router();
const bookController = require('../controllers/bookController')

router.get('/book/:bookId',bookController.getbookById)
router.post('/book',bookController.saveBook);

router.get('/user/:uid/orders/:orderId',(req,res,next)=>{
    console.log(rq.params)//{uid:12, orderId:567}
})


module.exports = router;
