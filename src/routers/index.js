const { Router } = require('express')
const router = Router();
const { getUsers, createUser, editUser, deleteUser} = require('../controllers/index.controller');


router.post('/paginadeconsulta', getUsers);

router.post('/paginadecreacion', createUser);

router.post('/paginadeedicion', editUser);

router.post('/paginadeborrado', deleteUser);

module.exports = router;
