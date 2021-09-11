const {Router} = require('express');
const router = Router();
const models = require('../models');

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

router.get('/users-page', async (req, res) => {
    const user = req.session.user;

    const error = req.session.errorMessage;

    const isAdmin = user.admin;
    var role;
    var users;
    if(isAdmin){
        role = 'admin'
        //todos los usuarios que no tengan rol de admin:
        users = await models.user.find({ admin: {$ne: true}})
    }else{
        role = 'user'
    }
    res.render('users_page.pug', {role, user, error, users})
})




module.exports=router