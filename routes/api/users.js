const express = require('express');
const router = express.Router(); // express router
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
// POST api/users
// Register user
// Public
router.post(
    '/' ,
    [
        check('firstname', 'First Name is required')
            .not()
            .isEmpty(),
        check('lastname', 'Last Name is required')
            .not()
            .isEmpty(),
        check('email', 'Please include a valid email') .isEmail(),
        check('password', 'please enter a password with 6 or more chracters').isLength({min: 6})
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }
        const { firstname, lastname, email, password } = req.body;
        try{
        // checking if the user exists 
           let user = await User.findOne({email});
           if(user) {
               return res.status(400).json({ errors: [{msg: 'User already exists'}]})
           }
           const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' })
           user = new User({firstname,lastname,email,avatar, password });
        // get users gravatar
        // encrypt password 
           const salt = await bcrypt.genSalt(10);
           user.password = await bcrypt.hash(password, salt);
           await user.save();
        // return json webtoken
           const payload = {
               user: {id: user.id} // we dont have to use _.id    
           }
           jwt.sign(
               payload, 
               config.get('jwtSecret'),
               { expiresIn: 360000 },
               (err, token) => {
                   if(err) throw err;
                   res.send({token}) // if it doesnt throws the error it sends this. 
               }); //
        // res.send('User route')
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    }
);
module.exports = router;