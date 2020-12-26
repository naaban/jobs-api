

const multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/../images')
    },
    filename: function (req, file, cb) {

        console.log(file)
        let filename = file.fieldname + '-' + Date.now() + '-' + file.originalname
        req.body.image = `${process.env.APP_BASE_URL}/${filename}`
        cb(null, filename)
    }
})

const Upload = multer({ storage: storage })


module.exports = Upload