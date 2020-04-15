// sparoW2021
const express = require('express');
const app = express();
const path = require('path');
const csrf = require('csurf')
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongodb-session')(session); // обязательно подключать после того как подключена сессия
const varMiddleware = require('./middleware/variables')
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const photosRoutes = require('./routes/photos');
const User=require('./models/user')

//подключение монгоДБ
const password = 'E3Z0CH1TXN0WPilR'; //пользователя CoolAuthDb
const MONGODB_URI = `mongodb+srv://vladilen:E3Z0CH1TXN0WPilR@cluster0-buxki.mongodb.net/test?retryWrites=true&w=majority`
// подключение hbs
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
}); 

const store = new MongoStore({ // заносим сессии в БД
    collection: 'session',
    uri: MONGODB_URI
})

app.engine('hbs', hbs.engine);  // hbs по названию экстеншена регистрируем движок
app.set('view engine', 'hbs'); // начинаем его использовать 
app.set('views', 'views'); // настройка папки по дефолту

app.use(express.static('public')); // чтобы можно было корневой статической папкой сделать
app.use(express.urlencoded({extended: false}))
app.use(session({
    secret: 'some secret value',
    resave: false,
    saveUninitialized: false,
    store: store
}))  // теперь мы можем обращатьс к объекту req.session и хранить определённые данные внутри сессии
app.use(csrf()); // после сессии
app.use(varMiddleware);


app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/photos', photosRoutes);

async function start() {
    try {
        await mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true })
        //запуск приложения после подгрузки БД
        app.listen(3000, function(){
        console.log('Server is running on PORT 3000...');
    })}catch (e) {
        console.log(e)
    }
}
    

start();// пакет mongoose работает с промисами


