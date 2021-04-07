let express = require("express");
let router = express.Router();
let indexController = require("../controllers/index");
/* Home Routes */
router.get("/", indexController.displayHomePage);

/* POST Route for processing the Login page */
router.post('/login', indexController.processLoginPage);

/* GET to perform UserLogout */
router.get('/logout', indexController.performLogout);

/* Error Route */
router.get("/error", indexController.displayErrorPage);

module.exports = router;
