// sparoW2021
const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
const varMiddleware = require('./middleware/variables')
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const photosRoutes = require('./routes/photos');
const User=require('./models/user')

//подключение монгоДБ
const password = 'E3Z0CH1TXN0WPilR'; //пользователя CoolAuthDb
const url = `mongodb+srv://vladilen:E3Z0CH1TXN0WPilR@cluster0-buxki.mongodb.net/test?retryWrites=true&w=majority`
// подключение hbs
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
}); 

app.engine('hbs', hbs.engine);  // hbs по названию экстеншена регистрируем движок
app.set('view engine', 'hbs'); // начинаем его использовать 
app.set('views', 'views'); // настройка папки по дефолту

app.use(express.static('public')); // чтобы можно было корневой статической папкой сделать

app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false
}))  // теперь мы можем обращатьс к объекту req.session и хранить определённые данные внутри сессии

app.use(varMiddleware);

// app.use(async (req, res, next) => {
//     try{
//         const user = await User.findById('5e936b7002269a1200009506');
//         req.user = user // полноценный объект mongoose
//         next()
//     }catch(e){
//         console.log(e);
//     } 
// })

app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/photos', photosRoutes);

async function start() {
    try {
        await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true })
        const candidate = await User.findOne(); // есть ли хоть 1 пользователь в системе
        if(!candidate) {
            const user = new User({
                email: 'SparoW2021@yandex.ru',
                name: 'VladPashkovski'
            })
            await user.save()
        }
        //запуск приложения после подгрузки БД
        app.listen(3000, function(){
        console.log('Server is running on PORT 3000...');
    })}catch (e) {
        console.log(e)
    }
}
    

start();// пакет mongoose работает с промисами


