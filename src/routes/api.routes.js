const { Router } = require("express");
const router = Router();
const models = require("../models");
//API
router.post("/register", async (req, res) => {
  const { username, password1, password2 } = req.body;
  //para mirar si ya hay un usuario con ese username
  const userExist = await models.user.findOne({ username });

  if (userExist) {
    req.session.errorMessage = "username already in use";
    return res.redirect("/pages/sign-up");
  }
  if (password1 !== password2) {
    req.session.errorMessage = "passwords don't match";
    return res.redirect("/pages/sign-up");
  }

  const hash = await models.user.encrypt(password2);
  const newUser = new models.user({ username, password: hash });

  await newUser.save();

  res.redirect("/pages/sign-in");
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  //para mirar si ya hay un usuario con ese username
  const userExist = await models.user.findOne({ username });

  if (!userExist) {
    req.session.errorMessage = "This username doesn't exist";
    res.redirect("/pages/sign-in");
  }

  const isCorrect = await models.user.compare(password, userExist.password);
  if (!isCorrect) {
    req.session.errorMessage = "email or password incorrect";
    res.redirect("/pages/sign-in");
  }

  req.session.user = userExist;

  res.redirect("/pages/users-page");
});

router.get("/logout", (req, res) => {
  req.session.destroy(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/pages/sign-in");
  });
});

router.delete("/remove/:id", async (req, res) => {
  const { id } = req.params;

  await models.user.deleteOne({ _id: id })
  
  res.json({message: 'user deleted'})
});

module.exports = router;
