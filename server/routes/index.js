const express = require("express");
const router = express.Router();
const indexController = require("../controllers/index");
/* Home Routes */
router.get("/", indexController.displayHomePage);

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* POST Route for processing the Register page */
router.post('/register', indexController.processRegisterPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);

/* Error Route */
router.get("/error", indexController.displayErrorPage);

module.exports = router;
