
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;

const News = require('../models/news');
const Admin = require('../models/admin');
const Menu = require('../models/menu');
const Sub_menu_lv1 = require('../models/sub_menu_lv1');
const Sub_menu_lv2 = require('../models/sub_menu_lv2');
const Posts = require('../models/post');
const Question_type = require('../models/question_type');
const Question = require('../models/question');
const License = require('../models/licenses');

module.exports.admin = function (req, res) {
    res.redirect('/admin/news/news_list/1');
}

module.exports.login = function (req, res) {
    res.render('./admin/login', { title: "Login Form || Admin", error: undefined });
}

module.exports.register = function (req, res) {
    res.render('./admin/register', { title: "Register Form || Admin", error: undefined });
}

module.exports.postLogin = async function (req, res) {
    const name = req.body.username;
    const password = req.body.password;


    const data = await Admin.findOne({ name }).exec();
    if (data === null) {
        res.render('./admin/login', { error: "User does not exist!!!" });
    } else {
        bcrypt.compare(password, data.password, function (err, result) {
            if (err) {
                return res.send(err);
            } else {
                if (result) {
                    const token = jwt.sign({ name: "Kiet" }, process.env.SECRET_KEY, { algorithm: "HS256", expiresIn: "3h" });
                    res.cookie('access_token', token);
                    res.cookie('admin_id', data.employeeId);
                    res.redirect('/admin');
                } else {
                    return res.send('/error');
                }
            }
        });
    }
}

module.exports.postRegister = async function (req, res) {
    const employeeId = req.body.employeeId;
    const name = req.body.username;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    if (password !== confirmPassword) {
        res.render('./admin/register', { error: 'Password is wrong!!!' });
        return;
    }

    const data = await Admin.findOne({ name }).exec();

    if (data) {
        res.render('./admin/register', { error: 'User already exists!!!' });
        return;
    } else {
        bcrypt.hash(password, saltRounds, async function (err, hash) {
            if (err) {
                return res.send(err);
            } else {
                let admin = new Admin({
                    employeeId,
                    name,
                    password: hash
                });

                await admin.save(function (err) {
                    if (err) {
                        return res.send(err);
                    } else {
                        res.send('saved!');
                    }
                });
            }
        });
    }
}

module.exports.logout = function (req, res) {
    res.clearCookie('access_token');
    res.clearCookie('admin_id');
    res.redirect('/');
}


/* 
            MENU
*/
module.exports.menu = function (req, res) {

    Menu.find(function (err, data) {
        if (err) {
            return res.redirect('./error');
        } else {
            Sub_menu_lv1.find(function (err, data2) {
                if (err) {
                    return res.redirect('./error');
                } else {
                    res.render("./admin/add_menu.ejs", { list_parents1: data, list_parents2: data2 });
                }
            });
        }
    });
}

module.exports.postMenu = function (req, res) {
    const menu = new Menu({
        text: req.body.menu_text
    });

    menu.save(function (err) {
        if (err) {
            return res.redirect('/error');
        } else {
            res.redirect('back');
        }
    })
}

module.exports.sub_menu_lv1 = function (req, res) {
    let sub_menu_lv1 = new Sub_menu_lv1({
        text: req.body.sub_menu_lv1_text
    });
    sub_menu_lv1.save(function (err) {
        if (err) {
            return res.send(err);
        } else {
            Menu.findByIdAndUpdate(
                { _id: req.body.parentsOfLv1 },
                { $push: { kids: sub_menu_lv1._id } },
                function (err) {
                    if (err) {
                        return res.send(err);
                    } else {
                        res.redirect("back");
                    }
                });
        }
    });
}

module.exports.sub_menu_lv2 = function (req, res) {
    let sub_menu_lv2 = new Sub_menu_lv2({
        text: req.body.sub_menu_lv2_text
    });
    sub_menu_lv2.save(function (err) {
        if (err) {
            return res.send(err);
        } else {
            Menu.findByIdAndUpdate(
                { _id: req.body.parentsOfLv2 },
                { $push: { kids: sub_menu_lv2._id } },
                function (err) {
                    if (err) {
                        return res.send(err);
                    } else {
                        res.redirect("back");
                    }
                });
        }
    });
}

module.exports.menuData = function (req, res) {
    var result = Menu.aggregate([
        {
            $lookup: {
                from: "sub_menu_lv1",
                localField: "kids",
                foreignField: "_id",
                as: "menu-lv1"
            }
        }
    ], function (err, data1) {
        if (err) {
            return res.send(err);
        } else {
            Sub_menu_lv1.aggregate([{
                $lookup: {
                    from: "sub_menu_lv2",
                    localField: "kids",
                    foreignField: "_id",
                    as: "menu-lv2"
                }
            }], function (err, data2) {
                if (err) {
                    return res.send(err);
                } else {
                    res.render('./testNavbar', { title: "Test Navbar", data1, data2 });
                }
            })
        }
    });
}


/* 
            NEWS
*/
module.exports.getNewsForm = function (req, res) {
    res.render('./admin/add_news', { title: "Add News || Admin", activeClass: 2 });
}

module.exports.postNewsForm = function (req, res) {
    const time = new Date().toLocaleString("vi", { timeZone: "Asia/Ho_Chi_Minh" });;
    const content_en = req.body.content_en;
    const content_vi = req.body.content_vi;
    const content_cn = req.body.content_cn;
    let news = new News({
        title_en: req.body.title_en,
        title_vi: req.body.title_vi,
        title_cn: req.body.title_cn,
        subtitle_en: req.body.subtitle_en === '' ? req.body.title_en + '...' : req.body.subtitle_en,
        subtitle_vi: req.body.subtitle_vi === '' ? req.body.title_vi + '...' : req.body.subtitle_vi,
        subtitle_cn: req.body.subtitle_cn === '' ? req.body.title_cn + '...' : req.body.subtitle_cn,
        content_en,
        content_vi,
        content_cn,
        news_type: req.body.news_type,
        created: time,
        updated: "No Updated",
        image: req.file ? req.file.filename : '',
        views: Math.floor(Math.random() * 201)
    });
    news.save(function (err) {
        if (err) {
            return res.send(err);
        } else {
            res.redirect('/admin');
        }
    });
}

module.exports.getNewsList = async function (req, res) {
    const page = req.params.page || 1;
    const perPage = 10;
    const data = await News.find({})
        .sort({ _id: -1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec();
    const count = await News.countDocuments().exec();
    res.render('./admin/news_list', {
        data: data,
        total: count,
        title: "News List || Admin",
        activeClass: 1,
        current: page,
        pages: Math.ceil(count / perPage)
    });
}

module.exports.getEditForm = async function (req, res) {
    const id = req.params.id;
    const data = await News.findOne({ _id: id }).exec();
    res.render("./admin/edit_news", { title: "Edit News || Admin", data, activeClass: "no have" });
}

module.exports.postEditForm = async function (req, res) {
    const id = req.params.id;
    const date = new Date;
    const time = new Date().toLocaleString("vi", { timeZone: "Asia/Ho_Chi_Minh" });;
    const content_en = req.body.content_en;
    const content_vi = req.body.content_vi;
    const content_cn = req.body.content_cn;
    const newNews = {
        title_en: req.body.title_en,
        title_vi: req.body.title_vi,
        title_cn: req.body.title_cn,
        subtitle_en: req.body.subtitle_en,
        subtitle_vi: req.body.subtitle_vi,
        subtitle_cn: req.body.subtitle_cn,
        content_en,
        content_vi,
        content_cn,
        news_type: req.body.news_type,
        updated: time,
        image: req.file ? req.file.filename : req.body.hidden_image,
        editBy: req.cookies ? req.cookies.admin_id : 'No Updated'
    }
    await News.findOneAndUpdate({ _id: id }, { ...newNews }).exec();
    res.redirect("/admin");
}

module.exports.deleteNews = function (req, res) {
    const id = req.params.id;

    News.findOneAndDelete({ _id: id }, function (err) {
        if (err) {
            return res.send(err);
        } else {
            res.redirect('/admin');
        }
    })
}

/* 
            POSTS
*/
module.exports.getPostsForm = function (req, res) {
    res.render('./admin/posts/add_posts', { activeClass: 4, title: "Add Posts || Admin" });
}

module.exports.postPostsForm = function (req, res) {
    const date = new Date;
    const time = date.toDateString();
    const posts = new Posts({
        categoryId: req.body.category,
        title_en: req.body.title_en,
        title_vi: req.body.title_en,
        title_cn: req.body.title_en,
        subtitle_en: req.body.subtitle_en,
        subtitle_vi: req.body.subtitle_vi,
        subtitle_cn: req.body.subtitle_cn,
        content_en: req.body.content_en,
        content_vi: req.body.content_en,
        content_cn: req.body.content_en,
        created: time,
        updated: 'No Updated',
        editBy: '',
        image: req.file.filename
    });

    posts.save(function (err) {
        if (err) {
            return res.send(err);
        } else {
            res.redirect('/admin/posts/posts_list/1');
        }
    })
}

module.exports.getPostsList = async function (req, res) {
    const page = req.params.page || 1;
    const perPage = 10;

    const data = await Posts.find({})
        .sort({ _id: -1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec();
    const count = await Posts.countDocuments().exec();
    res.render('./admin/posts/posts_list', {
        data: data,
        count,
        title: "List Posts || Admin",
        activeClass: 3,
        current: page,
        pages: Math.ceil(count / perPage),
        lang: req.cookies.lang
    });
}

module.exports.getEditPostsForm = function (req, res) {
    const id = req.params.id;
    Posts.findOne({ _id: id }, function (err, data) {
        if (err) {
            return res.send(err);
        } else {
            res.render("./admin/posts/edit_posts", { title: "Edit Posts || Admin", data, activeClass: "no have" });
        }
    })
}

module.exports.postEditPostsForm = async function (req, res) {
    const id = req.params.id;
    const date = new Date;
    const time = new Date().toLocaleString("vi", { timeZone: "Asia/Ho_Chi_Minh" });;
    const content_en = req.body.content_en;
    const content_vi = req.body.content_vi;
    const content_cn = req.body.content_cn;
    const newPosts = {
        title_en: req.body.title_en,
        title_vi: req.body.title_vi,
        title_cn: req.body.title_cn,
        subtitle_en: req.body.subtitle_en,
        subtitle_vi: req.body.subtitle_vi,
        subtitle_cn: req.body.subtitle_cn,
        content_en,
        content_vi,
        content_cn,
        categoryId: req.body.category,
        updated: time,
        image: req.file ? req.file.filename : req.body.hidden_image,
        editBy: req.cookies ? req.cookies.admin_id : 'No Updated'
    }
    await Posts.findOneAndUpdate({ _id: id }, { ...newPosts }).exec();
    res.redirect("/admin/posts/posts_list/1");
}

module.exports.deletePosts = function (req, res) {
    const id = req.params.id;
    Posts.findOneAndDelete({ _id: id }, function (err) {
        if (err) {
            return res.send(err);
        } else {
            res.redirect('/admin/posts/posts_list/1');
        }
    })

}

/*
            QUESTION
*/
module.exports.getQuestionForm = function (req, res) {
    Question_type.find({}, function (err, data) {
        if (err) {
            return res.send(err);
        } else {
            res.render('./admin/question/add_question', { activeClass: 6, title: "Add Question || Admin", q_category: data });
        }
    });
}

module.exports.getListQuestion = async function (req, res) {
    const page = req.params.page || 1;
    const perPage = 10;

    const data = await Question.find({})
        .sort({ _id: -1 })
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .exec();

    const count = await Question.countDocuments().exec();
    res.render('./admin/question/list_question', {
        data: data,
        count,
        title: "List Question || Admin",
        activeClass: 5,
        current: page,
        pages: Math.ceil(count / perPage)
    });
}

module.exports.add_question_type = function (req, res) {
    const questionType = new Question_type({
        text_en: req.body.question_type_en,
        text_vi: req.body.question_type_vi,
        text_cn: req.body.question_type_cn,
        kids: []
    });

    questionType.save(function (err) {
        if (err) {
            return res.send(err);
        } else {
            res.redirect('/admin/add_question');
        }
    });
}

module.exports.postAddQuestion = async function (req, res) {
    const date = new Date;
    const time = new Date().toLocaleString("vi", { timeZone: "Asia/Ho_Chi_Minh" });;
    const question = new Question({
        mainQuestion: req.body.question_en,
        question_en: req.body.question_en,
        question_vi: req.body.question_vi,
        question_cn: req.body.question_cn,
        mainAnswer: req.body.answer_en,
        answer_en: req.body.answer_en,
        answer_vi: req.body.answer_vi,
        answer_cn: req.body.answer_cn,
        created: time,
        updated: "No Updated",
        updateBy: req.cookies.admin_id
    });

    await question.save().exec();
    await Question_type.findByIdAndUpdate(
        { _id: req.body.question_type },
        { $push: { kids: question._id } }
    ).exec();
    res.redirect("/admin/list_question/1");
}

module.exports.getEditQuestionForm = async function (req, res) {
    const id = req.params.id;
    const data = await Question.findOne({ _id: id }).exec();
    const data1 = await Question_type.find({}).exec();
    res.render("./admin/question/edit_question", { title: "Edit Question || Admin", data, q_category: data1, activeClass: "no have" });
}

module.exports.postEditQuestionForm = async function (req, res) {
    const id = req.params.id;
    const date = new Date;
    const time = new Date().toLocaleString("vi", { timeZone: "Asia/Ho_Chi_Minh" });;
    const newQuestion = {
        question_en: req.body.question_en,
        question_vi: req.body.question_vi,
        question_cn: req.body.question_cn,
        answer_en: req.body.answer_en,
        answer_vi: req.body.answer_vi,
        answer_cn: req.body.answer_cn,
        news_type: req.body.news_type,
        updated: time,
        editBy: req.cookies ? req.cookies.admin_id : 'No Updated'
    }

    await Question.findOneAndUpdate({ _id: id }, { ...newQuestion }).exec();
    res.redirect("/admin/list_question/1");
}

module.exports.deleteQuestion = function (req, res) {
    const id = req.params.id;
    Question.findOneAndDelete({ _id: id }, function (err) {
        if (err) {
            return res.send(err);
        } else {
            res.redirect('/admin/list_question/1');
        }
    });
}

// License
module.exports.licenseForm = function (req, res) {
    res.render('./admin/license/add_license', { title: "Add License || Admin", activeClass: 9 });
}

module.exports.postLicenseForm = async function (req, res) {
    let license = new License({
        title_en: req.body.title_en,
        title_vi: req.body.title_vi,
        title_cn: req.body.title_cn,
        content_en: req.body.content_en,
        content_vi: req.body.content_vi,
        content_cn: req.body.content_cn,
        license_type: req.body.license_type,
        image: req.file ? req.file.filename : '',
        link: req.body.link
    });
    license.save(function (err) {
        if (err) {
            return res.send(err);
        } else {
            res.redirect('/admin/license');
        }
    });
}

module.exports.getListLicenses = async function (req, res) {

    const data = await License.find({})
        .sort({ _id: -1 })
        .exec();

    const count = await License.countDocuments().exec();
    res.render('./admin/license/list_license', {
        data: data,
        count,
        title: "License Question || Admin",
        activeClass: 9
    });
}

module.exports.getEditLicenseForm = async function (req, res) {
    const id = req.params.id;
    const data = await License.findOne({ _id: id }).exec();
    res.render("./admin/license/edit_license", { title: "Edit License || Admin", data, activeClass: "no have" });
}

module.exports.getPostLicenseForm = async function (req, res) {
    const id = req.params.id;

    const newLicense = {
        title_en: req.body.title_en,
        title_vi: req.body.title_vi,
        title_cn: req.body.title_cn,
        content_en: req.body.content_en,
        content_vi: req.body.content_vi,
        content_cn: req.body.content_cn,
        license_type: req.body.license_type,
        image: req.file ? req.file.filename : ''
    }

    await License.findOneAndUpdate({ _id: id }, { ...newLicense }).exec();
    res.redirect("/admin/license/get_list_license");
}

module.exports.deleteLicense = function (req, res) {
    const id = req.params.id;
    License.findOneAndDelete({ _id: id }, function (err) {
        if (err) {
            return res.send(err);
        } else {
            res.redirect('/admin/license/get_list_license');
        }
    });
}