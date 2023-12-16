const jwt = require('jsonwebtoken');

const Auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "" );
        console.log("Received Token:", token);

        // Use the correct secret that was used to sign the token
        const secret = "your-secret-key"; // Replace with your actual secret key
        const decoded = jwt.verify(token, 'regex');
        console.log("Decoded Token:", decoded);

        // Check if decoded object has _id property
        if (decoded && decoded._id) {
            req.userId = decoded._id;
            console.log("User ID:", req.userId);
            next();
        } else {
            console.error("Invalid token structure");
            res.status(401).send({error: "Invalid Token"});
        }
    } catch (e) {
        console.error("Error decoding token:", e);
        res.status(401).send({error: "Invalid Token"});
    }
}

module.exports = Auth;
