const {Router} = require('express');
const router = Router();


//Render Pages
router.get('/sign-in', (req, res) => {
    let error;
    if(req.session.errorMessage){
        error = req.session.errorMessage;
        delete req.session.errorMessage;
    }
    res.render('sign_in.pug', {error})
})

router.get('/sign-up', (req, res) => {
    let error;
    if(req.session.errorMessage){
        error = req.session.errorMessage;
        delete req.session.errorMessage;
    }
    
    res.render('sign_up.pug', {error})
})

router.get('/users-page', (req, res) => {
    const user = req.session.user;

    const error = req.session.errorMessage;

    const isAdmin = user.admin;
    var role
    if(isAdmin){
        role = 'admin'
    }else{
        role = 'user'
    }
    res.render('users_page.pug', {role, user, error})
})




module.exports=router