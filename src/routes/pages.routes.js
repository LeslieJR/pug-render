const {Router} = require('express');
const router = Router();


//Render Pages
router.get('/sign-in', (req, res) => {
    res.render('sign_in.pug')
})

router.get('/sign-up', (req, res) => {
    res.render('sign_up.pug')
})

router.get('/users-page', (req, res) => {
    const user = req.session.user;
    const isAdmin = user.admin;
    var role
    if(isAdmin){
        role = 'admin'
    }else{
        role = 'user'
    }
    res.render('users_page.pug', {role, user})
})




module.exports=router