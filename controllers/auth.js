const User = require('../models/User');

// @description     Register User
// @route           POST /api/v1/auth/registetr
// @access          Public
exports.register = async (req,res,next) => {
    try {
        const {name, tel, email, password, role} = req.body;

        // Create User
        const user =  await User.create({
            name,
            tel,
            email,
            password,
            role
        });

        // const token = user.getSignedJwtToken();
        // res.status(200).json({success:true, token});
        sendTokenRespond(user, 200, res);
    } catch(err){
        res.status(400).json({
            success:false
        });
        console.log(err.stack);
    }
}

// @Desc    user login
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = async(req,res,next) => {
    try {
        const {email, password} = req.body;

        // Validate password and email
        if(!email || !password) {
            return res.status(400).json({
                success: false, 
                message: 'Please provide an email and password'
            });
        }

        // Check for user
        const user = await User.findOne({email}).select('+password');
        if(!user) {
            return res.status(400).json({
                success: false, 
                message: 'Invalid credentials'
            });
        }

        // check if password matches
        const isMatch = await user.matchPassword(password);
        if(!isMatch) {
            return res.status(401).json({
                success: false, 
                message: 'Invalid credentials'
            });
        }

        // Create token
        sendTokenRespond(user, 200, res);
    } catch(err) {
        return res.status(401).json({
            success: false, 
            message: 'Cannot convert email or password to string'
        });
    }
}

// Get token from model, create cookie and send response
const sendTokenRespond = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    
    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    if(process.env.NODE_ENV === 'production') {
        options.secure = true;
    }
    res.status(statusCode).cookie('token', token, options).json({
        success:true,
        token
    });
}

// @Desc    get current logged in user
// @route   POST /api/v1/auth/me
// @access  Private
exports.getMe = async(req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success : true,
        data : user
    });
};

exports.logout = async (req, res, next) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).json({
        success: true,
        data: {}
    });
}

