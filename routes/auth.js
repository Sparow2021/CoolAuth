const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    })
})

// router.post('/login', async(req, res) => {
//     req.session.isAuthenticated = true // если залогинилиь. Это своя перемменная
//     res.redirect('/')
// })

module.exports = router