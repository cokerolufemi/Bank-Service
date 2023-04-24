
const jwt = require("jsonwebtoken");
const isAuth = (req, res, next) => {
try {
    const authorizedtionHeader = req.get("Authorization");

    if(!authorizedtionHeader)

    throw new Error ("unauthenticated");
    const token = authorizedtionHeader.split(" ")[1];

    const decodedToken = jwt.verify(token, "supersecretkeythatcannotbeeasilyguessed" );

    if(!decodedToken)
    throw new Error ("unauthorized");
    req.userId = decodedToken.userId;
    next();

} catch (error) {
    console.log(error);
    res.json({message: error.message});
}
}

module.exports = isAuth;