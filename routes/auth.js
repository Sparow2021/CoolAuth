const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.send('Hello, World');
    // тут нужно подключить hbs
})



module.exports = router