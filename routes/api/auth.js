const express = require('express');
const router = express.Router(); // express router
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const User = require('../../models/User');
//GET api/auth
// Test route
// Public
router.get('/' , auth,  async(req, res) => {
    try { 
        const user = await User.findById(req.user.id).select('-password'); // this exclude the password
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('Server error');

    }
});
// POST api/auth
// authenticate user and get token
// Public
router.post(
    '/' ,
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ], 
    async (req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({errors: errors.array() });
        }
        const { email, password } = req.body;        
        try{
        // checking if the user exists 
           let user = await User.findOne({email});
           if(!user) {
               return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
           }           
           const isMatch = await bcrypt.compare(password, user.password); //plain paswd which user enters, encrypted pswdd which we can get from the user
           if(!isMatch) {
                return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}]})
           }
           // return json webtoken
           const payload = {
               user: {
                   id: user.id // we dont have to use _.id 
               }
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