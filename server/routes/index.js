let express = require("express");
let router = express.Router();
let indexController = require("../controllers/index");
/* Home Routes */
router.get("/", indexController.displayHomePage);

/* Error Route */
router.get("/error", indexController.displayErrorPage);

module.exports = router;