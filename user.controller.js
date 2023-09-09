const User = require ('../Models/user.model');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(6);


// /auth/signup : post request : for registering new users to website 
const signup = async (request, response) => {
    const {
        username,
        email,
        password
    } = request.body;
    try {
        // If all the fields are empty then user must fill up to register
        if (username == '' || email == '' || password == '') {
            return response.status(400).json({
                message: `Please fill all the required fields`
            })
        } 
        // Check whether any user exists with the entered email ID
        const isUserExists = await User.find({email});

        // If user exists with the same email ID
        if(isUserExists.length > 0){
            return response.status(401).json({
                message: "User already exists with the same Email ID"
            })
        }

        // If the user doesnot exist then
        // Create a new user
        const newUser = await User.create({
            username,
            email,
            password: await bcrypt.hash(password, salt),
        });

        // Return the newly created user details
        return response.status(200).json({
            message: `New User created successfully`,
            newUser
        })
    } catch (error) {
        // If any other server error is encountered
        return response.status(404).json({
            message: `Error is encountered because of Server not working..... ${error.message}`
        });
    }
}

// /auth/login : post request : for logging in the user and authenticating.
const login = async (request, response) => {
    // Fetching the login details
    let {
        email,
        password
    } = request.body;

    try {
        // If the user doesnot enter any credentials
        if (email == '' || password == ''){
            return response.status(400).json({
                message: `Please fill up all the fields to login`
            })
        }

        // If any user already exists 
        const isUserExists = await User.find({email});

        // if the user doesnot exist
        if (isUserExists.length == 0){
            return response.status(400).json({
                message: "First Signup then Login"
            })
        }

        // if the user exists
        if (isUserExists.length > 0 && isUserExists[0].password){
            if (await bcrypt.compare(password, isUserExists[0].password)){
                return response.status(200).json({
                    message: "User logged in successfully",
                    isUserExists
                })
            }
        }

    } catch (error) {
        // If the server doesn't work properly or any other issues encountered report the error to the console
        return response.status(401).json({
            message: `Something went wrong...The server is facing some issues ${error.message}`
        })
    }
}


module.exports = {
    signup,
    login
};