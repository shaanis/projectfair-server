const express = require('express')
const userController = require('../controllers/userController')
const projectController = require('../controllers/projectController')
const jwtMiddleware = require('../middleware/jwtmiddleware')
const multerMiddleware = require('../middleware/multerMiddleware')


const router = new express.Router()

// register : http://localhost:3000/register
router.post('/register',userController.registerController)

// login : http://localhost:3000/login
router.post('/login',userController.loginController)

// add-projects : http://localhost:3000/add-projects
router.post('/add-projects',jwtMiddleware,multerMiddleware.single('projectimg') ,projectController.addProjectController)
// home-projects : http://localhost:3000/add-projects
router.get('/home-projects',projectController.homeProjectController)
// all-projects : http://localhost:3000/all-projects
router.get('/all-projects', jwtMiddleware,projectController.allProjectController)
// user-projects : http://localhost:3000/user-projects
router.get('/user-projects', jwtMiddleware,projectController.userProjectController)
// projects/10/edit : http://localhost:3000/projects/id/edit
router.put('/projects/:id/edit', jwtMiddleware,multerMiddleware.single("projectimg"),projectController.editProjectController)
// projects/id/remove : http://localhost:3000/projects/id/remove
router.delete('/projects/:id/remove', jwtMiddleware,projectController.removeProjectController)

// edit-user/10/edit : http://localhost:3000/projects/id/edit
router.put('/edit-profile', jwtMiddleware,multerMiddleware.single("profilePic"),userController.editUserController)

module.exports = router