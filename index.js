const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');

// подключение hbs
const hbs = exphbs.create({
    defaultLayout: 'main',
    extname: 'hbs'
}); 

app.engine('hbs', hbs.engine);  // hbs по названию экстеншена регистрируем движок
app.set('view engine', 'hbs'); // начинаем его использовать 
app.set('views', 'views'); // настройка папки по дефолту

app.get('/', function(req, res){
    //res.send('Hello, World');
    //res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.render('index')  //hbs 
});




app.listen(3000, function(){
    console.log('Server is running on PORT 3000...');
})
