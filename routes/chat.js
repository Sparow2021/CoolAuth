const {Router} = require('express');
const router = Router();
const auth = require('../middleware/auth')

router.get('/', auth, (req, res) => {
    res.render('chat', {
        title: "Чат",
        isChat: true
    })
})


module.exports = router