const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
//const session = require('express-session');
const homeRoutes = require('./routes/home');
const authRoutes = require('./routes/auth');
const chatRoutes = require('./routes/chat');
const photosRoutes = require('./routes/photos');


// подключение hbs
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
}); 

app.engine('hbs', hbs.engine);  // hbs по названию экстеншена регистрируем движок
app.set('view engine', 'hbs'); // начинаем его использовать 
app.set('views', 'views'); // настройка папки по дефолту

app.use(express.static('public')); // чтобы можно было корневой статической папкой сделать

// app.use(session({
//     secret: 'some secret value',
//     resave: false,
//     saveUninitialized: false
// }))  // теперь мы можем обращатьс к объекту req.session и хранить определённые данные внутри сессии

app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/chat', chatRoutes);
app.use('/photos', photosRoutes);

app.listen(3000, function(){
    console.log('Server is running on PORT 3000...');
})
