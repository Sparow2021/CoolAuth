const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    //res.send('Hello, World');
    //res.sendFile(path.join(__dirname, 'views', 'index.html'));
    res.render('index', { // кажись этот объект является locals
        title: "Главная",
        isHome: true
    })  //hbs 
})



module.exports = router