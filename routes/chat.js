const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('chat', {
        title: "Чат",
        isChat: true
    })
})


module.exports = router