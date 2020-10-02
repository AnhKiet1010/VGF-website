const express = require('express');
const router = express.Router();
const multer = require('multer');

const adminController = require('../controllers/admin.controller');
const requireAuth = require('../middlewares/auth.controller');

// UPLOAD IMAGE
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/upload');
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

// router.get('/menu', requireAuth.requireAuth, adminController.menu);

// router.post('/menu', adminController.postMenu);

// router.post('/sub_menu_lv1', adminController.sub_menu_lv1);

// router.post('/sub_menu_lv2', adminController.sub_menu_lv2);

// router.get('/menuData', requireAuth.requireAuth, adminController.menuData);

/* 
            NEWS
*/
router.get('/news/add_news', requireAuth.requireAuth, adminController.getNewsForm);

router.post("/news/postNewsForm", upload.single('image'), adminController.postNewsForm);

router.get("/news/edit/:id", requireAuth.requireAuth, adminController.getEditForm);

router.post("/news/edit/:id", upload.single('image'), adminController.postEditForm);

router.get('/news/news_list/:page', requireAuth.requireAuth, adminController.getNewsList);

router.get('/news/delete/:id', requireAuth.requireAuth, adminController.deleteNews);

/* 
            POSTS
*/
router.get('/posts/add_posts', requireAuth.requireAuth, adminController.getPostsForm);

router.post('/posts/add_posts', upload.single('image'), adminController.postPostsForm);

router.get('/posts/posts_list/:page', adminController.getPostsList);

router.get("/posts/edit/:id", requireAuth.requireAuth, adminController.getEditPostsForm);

router.post("/posts/edit/:id", upload.single('image'), adminController.postEditPostsForm);

router.get('/posts/delete/:id', adminController.deletePosts);

/* 
            QUESTION
*/

router.get('/list_question/:page', requireAuth.requireAuth, adminController.getListQuestion);

router.post('/add_question_type', adminController.add_question_type);

router.get('/add_question', requireAuth.requireAuth, adminController.getQuestionForm);

router.post('/add_question', adminController.postAddQuestion);

router.get("/question/edit/:id", requireAuth.requireAuth, adminController.getEditQuestionForm);

router.get('/question/delete/:id', adminController.deleteQuestion);

router.get('/license', adminController.licenseForm);

router.post('/license/postLicenseForm', upload.single('image'), adminController.postLicenseForm);

router.get('/license/get_list_license', adminController.getListLicenses);

router.get('/license/edit/:id', adminController.getEditLicenseForm);

router.post('/license/edit/:id', adminController.getPostLicenseForm);

router.get('/license/delete/:id', adminController.deleteLicense);



module.exports = router;