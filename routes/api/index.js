const router = require("express").Router();
//my url should be localhost:3001/api
//IN THE BRAIN OF THE API FOLDER
const noteRoutes = require("./noteRoutes.js")
//WHICH TABLE
router.use("/notes", noteRoutes)

module.exports = router;