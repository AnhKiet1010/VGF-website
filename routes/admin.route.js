const express = require('express');
const router = express.Router();
const multer = require('multer');

const adminController = require('../controllers/admin.controller');
const requireAuth = require('../middlewares/auth.controller');

// UPLOAD IMAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: storage,
    fileFilter: function (req, file, cb) {
        if (
            file.mimetype == "image/bmp" ||
            file.mimetype == "image/png" ||
            file.mimetype == "image/gif" ||
            file.mimetype == "image/jpg" ||
            file.mimetype == "image/jpeg"
        ) {
            cb(null, true)
        } else {
            return cb(new Error("only image are allowed!"));
        }
    }
});
router.get('/login', adminController.login);

router.get('/register', requireAuth.requireAuth, adminController.register);

router.post('/login', adminController.postLogin);

router.post('/register', adminController.postRegister);

router.get('/menu', requireAuth.requireAuth, adminController.menu);

router.post('/menu', requireAuth.requireAuth, adminController.postMenu);

router.post('/sub_menu_lv1', requireAuth.requireAuth, adminController.sub_menu_lv1);

router.post('/sub_menu_lv2', requireAuth.requireAuth, adminController.sub_menu_lv2);

router.post('/todo', requireAuth.requireAuth, adminController.todo);

router.get('/news', requireAuth.requireAuth, adminController.getNewsForm);

router.post("/news", upload.single('image'), adminController.postNewsForm);

module.exports = router;