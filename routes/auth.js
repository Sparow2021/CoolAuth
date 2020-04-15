const {Router} = require('express');
const router = Router();
const User = require('../models/user')
const bcrypt = require('bcryptjs')

router.get('/login', async (req, res) => {
    res.render('auth/login', {
        title: 'Авторизация',
        isLogin: true,
        loginError: req.flash('loginError'),
        registerError: req.flash('registerError')
    })
})



router.post('/login', async(req, res) => {
    try{
        const {email, password} = req.body
        const candidate = await User.findOne({email})

        if(candidate){
            //const areSame = password === candidate.password
            const areSame = await bcrypt.compare(password, candidate.password) // сравнивание по бикрипту паролей 
            if(areSame){
                //ждём получения определённого пользователя
                req.session.user = candidate
                req.session.isAuthenticated = true // если залогинилиь. Это своя перемменная
                req.session.save(err => {// .save() потому что ждём занесения данных в сессию, чтобы не произошло редиректа
                if(err){
                    throw err
                }
                res.redirect('/')
                }) 
            }else{
                req.flash('loginError', 'Неверный пароль')
                res.redirect('/auth/login#login')
            }
        }else{
            req.flash('loginError', 'Неверный пароль')
            res.redirect('/auth/login#login')
        }
    }catch(e){
        console.log(e)
    }
   
})

router.get('/logout', async (req, res) => {
    req.session.destroy(() => { // функция, которая будет вызвана, когда сессия будет отчищена, потребуется, чтобы отчистить данные из БД
        res.redirect('/auth/login#login')
    })
})

router.post('/register', async(req,res) => {
    try{
        const {email, password, repeat, name} = req.body; //дешифрование есть?
        const candidate = await User.findOne({email});
        if(candidate){
            req.flash('registerError', 'Пользователь с таким email уже существует')
            res.redirect('/auth/login#register')
        }else{
            const hashPassword = await bcrypt.hash(password, 10)
            const user = new User({
                email, name, password: hashPassword
            })
            await user.save();
            res.redirect('/auth/login#login')
        }
    }catch(e){
        console.log(e)
    }
})

module.exports = router