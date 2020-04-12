const {Router} = require('express');
const router = Router();
const auth = require('../middleware/auth')

router.get('/', auth, (req, res) => {
    res.render('photos', {
        title: "Фотографии",
        isPhotos: true
    })
})


module.exports = router