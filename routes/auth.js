const {Router} = require('express');
const router = Router();

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    })
})



router.post('/login', async(req, res) => {
    req.session.isAuthenticated = true // если залогинилиь. Это своя перемменная
    res.redirect('/')
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => { // функция, которая будет вызвана, когда сессия будет отчищена, потребуется, чтобы отчистить данные из БД
        res.redirect('/auth/login#login')
    })
})

module.exports = router