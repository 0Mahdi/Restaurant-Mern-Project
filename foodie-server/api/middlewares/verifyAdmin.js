const jwt = require('jsonwebtoken');
const User = require('../models/User');

const verifyAdmin = async (req, res, next) => {
    try {
        // Check if the decoded token exists and contains email
        const email = req.decoded?.email;
        if (!email) {
            return res.status(401).send({ message: 'Unauthorized access' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send({ message: 'User not found' });
        }

        // Check if user is admin
        const isAdmin = user.role === 'admin';
        if (!isAdmin) {
            return res.status(403).send({ message: 'Forbidden access' });
        }

        // User is admin, proceed to the next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(500).send({ message: 'Internal server error' });
    }
};

module.exports = verifyAdmin;



// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const verifyAdmin = async (req, res, next) => {
//     const email = req.decoded.email;
//     const query ={email: email};

//     const user = await User.findOne(query);
//     const isAdmin = user?.role == 'admin';

//     if(!isAdmin){
//         return res.status(403).send({message: "forbidden access!"})
//     }

//     next();
// };

// module.exports = verifyAdmin;