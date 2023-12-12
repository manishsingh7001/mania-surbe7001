var jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
    try {
        const token = req.header("Authorization").replace("Bearer ", "" );
        console.log(">>>>>>>>", token);
        const decoded = jwt.verify(token, "regex");
        // console.log(">>>>>>>>>>>>>>>>>>>> decoded", decoded);
        req.userId = decoded._id;
        next();
    } catch (e) {
        res.status(401).send({error: "Invalid Token"});
    }
}

module.exports = Auth;