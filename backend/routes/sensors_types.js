const { Router } = require('express');
const { get,id } = require('../controllers/sensors_types');
const { validarCampos } = require('../middleware/validarCampos');
const { check } = require('express-validator');

const router = Router();
router.get('/api/get/sensors_types', [
    check('intervalo', 'El intervalo de tiempo es opcional').optional(),
    validarCampos
], get);

router.get('/api/id/sensors_types/:id', [
    check('intervalo', 'El intervalo de tiempo es opcional').optional(),
    validarCampos
], id);

module.exports = router;