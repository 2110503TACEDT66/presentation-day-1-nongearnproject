const express = require('express');
const router = express.Router();

const {getCoWorkingSpaces, getCoWorkingSpace, updateCoWorkingSpace, deleteCoWorkingSpace, createCoWorkingSpace} = require('../controllers/coWorkingSpaces')

router.route('/').get(getCoWorkingSpaces).post(createCoWorkingSpace)
router.route('/:id').get(getCoWorkingSpace).put(updateCoWorkingSpace).delete(deleteCoWorkingSpace)

module.exports = router;