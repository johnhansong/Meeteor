const { Op } = require('sequelize');
const express = require('express')
const bcrypt = require('bcryptjs');

const router = express.Router();

const { setTokenCookie, restoreUser } = require('../../utils/auth');
const { Group, Membership } = require('../../db/models');

// express validation
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateGroup = [
    check('name')
        .exists({checkFalsy: true})
        .isLength({max: 60})
        .withMessage("Name must be 60 characters or less"),
    check('about')
        .exists({checkFalsy: true})
        .isLength({min:50})
        .withMessage("About must be 50 characters or more"),
    check('type')
        .exists({checkFalsy: true})
        .isIn(['Online', 'In person'])
        .withMessage("Type must be 'Online' or 'In person'"),
    check('private'),
    check('city'),
    check('state')
]

router.get(
    '/',
    async (req, res, next) => {
    const groups = await Group.findAll();

    res.status(200).json(groups)
});
