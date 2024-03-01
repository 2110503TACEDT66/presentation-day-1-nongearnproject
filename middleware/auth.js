const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async(req,res,next) => {
    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    // check if token exist
    if(!token || token == 'null') {
        return res.status(401).json({
            success:false, 
            message:'Not authorize to access this route'
        });
    }

    try {
        // Verify token decoded token with the secret code
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        console.log(decoded);

        req.user = await User.findById(decoded.id);

        next();
    } catch(err) {
        console.log(err.stack);
        return res.status(401).json({
            seccess : false,
            message : 'Not authorize to access this route'
        });
    }
}

// grant access to specific user(admin)
exports.authorize = (...roles)=> {
    return (req ,res ,next) => {
        if(!roles.includes(req.user.role)) {
            return res.status(403).json({success:false, meassage: `User role ${req.user.role} is not authorize to access this route`});
        }
        
        next();
    }
}