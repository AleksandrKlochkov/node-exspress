const {body} = require('express-validator/check')
const User = require('../models/user')

exports.registerValidators = [
    body('email')
        .isEmail().withMessage('Введите корректный email')
        .custom(async (value, {req})=> {
            try{
                const user = await User.findOne({ email: value })
                if(user) {
                    return Promise.reject('Такой емайл занят')
                }
            }catch(e){
                console.log(e)
            }
        }).normalizeEmail(),
    body('password', 'Пароль должен быть минимум 3 символов')
    .isLength({min:3, max: 56})
    .isAlphanumeric()
    .trim(),
    body('confirm').custom((value, {req})=> {
        if(value !== req.body.password){
            throw new Error('Пароли должны совпадать')
        }

        return true
    })
    .trim(),
    body('name','Имя должно быть минимум 2 символа').isLength({min:2})
    .trim()
]

exports.courseValidators = [
    body('title').isLength({min:3}).withMessage('Минимальная длина названия 3 символа').trim(),
    body('price').isNumeric().withMessage('Введите корректную цену'),
    body('img','Введите корректный Url картинки').isURL()
]