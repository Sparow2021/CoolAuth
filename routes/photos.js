const {Router} = require('express');
const router = Router();

router.get('/', (req, res) => {
    res.render('photos', {
        title: "Фотографии",
        isPhotos: true
    })
})


module.exports = router