const express = require('express');
const router = express.Router();
const User = require('../models/user');
const validationMiddleWare = require('../middleware/validation')
const authenticationmiddleWare = require('../middleware/authentecation');
require('express-async-errors');
const CustomError = require('../helpers/customError');
const signupValidator = require('../middleware/joiValidator')

const {
    check,
    validationResult
} = require('express-validator');

module.exports = router;

router.get("/", async (req, res, next) => {
    const usersList = await User.find().populate('roleId').populate('branches')
    res.status(200).json(usersList);
});

router.post('/register', validationMiddleWare(
        check('password')
        .isLength({
            min: 5
        })
        .withMessage('must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('must contain a number'),
        check('email')
        .isEmail()
    ),

    async (req, res, next) => {

        const {
            userName,
            password,
            email,
            imageSrc,
            roleId,
            branches,
        } = req.body;
        const description = "this is your description"
        if (password) {
            if (password == req.body.confirmPassword) {
                const user = new User({
                    userName,
                    password,
                    email,
                    imageSrc,
                    roleId,
                    branches,
                    description
                });
                await user.save();
                res.json(user);
            }
        }
    })

router.post('/login', async (req, res, next) => {
    const {
        email,
        password
    } = req.body;
    const user = await User.findOne({
        email
    })
    if (!user) throw new Error('wrong data');
    const isMatch = await user.comparePassword(password);
    if (!isMatch) throw new Error('Wrong password');
    //sign
    const token = await user.generateToken();
    res.json({
        user,
        token
    })
})




router.patch('/', authenticationmiddleWare, validationMiddleWare(
        check('password')
        .isLength({
            min: 5
        })
        .withMessage('must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('must contain a number'),
        check('email')
        .isEmail(),
    ),
    async (req, res, next) => {
        id = req.user.id;
        const userById = await User.findById(id)
        // const { userName,
        //     password,
        //     email,
        //     imagesrc,
        //     roleId,
        //     branches,} = userById;
        const {
            userName,
            password,
            email,
            imagesrc,
            roleId,
            branches,
        } = req.body;
        const user = await User.findByIdAndUpdate(id, {
            $set: {
                userName: userName || userById.userName,
                password: password || userById.password,
                email: email || userById.email,
                imagesrc: imagesrc || userById.imagesrc,
                roleId: roleId || userById.roleId,
                branches: branches || userById.branches,
            }
        }, {
            new: true,
            runValidators: true,
            omitUndefined: true
        });
        res.status(200).json(user)
    })

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json(user)
})

router.get("/:id", async (req, res, next) => {
    const id = req.params.id
    const user = await User.findById(id).populate('roleId').populate('branches')
    res.status(200).json(user);
});