// importing express to define routes
import express from 'express';
// importing mongoose user model from usermodel js file
import User from '../models/userModel.js';
// creates a router object that lets you define routes,
//this router gets exported n used in main express app 
const router = express.Router();


router.post('/', async(req, res)=> {
    //extracting data frpm the request body
    const {name, email, password, First_name} = req.body;
    try {
        // creating a new user doc using user model 
        const newUser = new User({name, email, password, First_name});
        // saving the new user to the database
        await newUser.save();
        // sending the newly created user as a response with status 201
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

router.post ('/login', async(req, res)=>{
    //extracting email and password from the request body 
    const {email, password} = req.body;
    try {
        //searching for a user in the database w the provided email 
        const user = await User.find0ne({email});
        if (user.password !== password) {
            return res.status (400).json({message: 'Invalid email or password'});    
        }
        res.json({user});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
})

export default router;


