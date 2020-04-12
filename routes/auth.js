const {Router} = require('express');
const router = Router();
const User = require('../models/user')


router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true
    })
})



router.post('/login', async(req, res) => {
    //ждём получения определённого пользователя
    const user = await User.findById('5e936b7002269a1200009506');
    req.session.user = user
    req.session.isAuthenticated = true // если залогинилиь. Это своя перемменная
    
    req.session.save(err => {// .save() потому что ждём занесения данных в сессию, чтобы не произошло редиректа
        if(err){
            throw err
        }
        res.redirect('/')
    })  
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => { // функция, которая будет вызвана, когда сессия будет отчищена, потребуется, чтобы отчистить данные из БД
        res.redirect('/auth/login#login')
    })
})

module.exports = router