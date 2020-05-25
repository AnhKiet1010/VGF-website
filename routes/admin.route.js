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
router.get('/', requireAuth.requireAuth, adminController.admin);

router.get('/login', adminController.login);

router.get('/register', requireAuth.requireAuth, adminController.register);

router.post('/login', adminController.postLogin);

router.post('/register', adminController.postRegister);

router.post('/logout', adminController.logout);

router.get('/menu', requireAuth.requireAuth, adminController.menu);

router.post('/menu', adminController.postMenu);

router.post('/sub_menu_lv1', adminController.sub_menu_lv1);

router.post('/sub_menu_lv2', adminController.sub_menu_lv2);

router.get('/menuData', requireAuth.requireAuth, adminController.menuData);

router.get('/news/add_news', requireAuth.requireAuth, adminController.getNewsForm);

router.post("/news/postNewsForm", upload.single('image'), adminController.postNewsForm);

router.get("/news/edit/:id", requireAuth.requireAuth, adminController.getEditForm);

router.post("/news/edit/:id", upload.single('image'), adminController.postEditForm);

router.get('/news/news_list/:page', requireAuth.requireAuth, adminController.getNewsList);

router.get('/news/delete/:id', requireAuth.requireAuth, adminController.deleteNews);

router.get('/posts/add_posts', requireAuth.requireAuth, adminController.getPostsForm);

module.exports = router;