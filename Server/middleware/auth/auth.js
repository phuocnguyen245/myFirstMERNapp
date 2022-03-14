import jwt from 'jsonwebtoken'
const verify = (req, res, next) => {
    const token = req.headers.authorization;
    if (token) {
        const accessToken = token.split(" ")[1];
        jwt.verify(accessToken, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                res.status(403).json("Token is not valid!");
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).json("You're not authenticated");
    }
}
export const generateAccessToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_ACCESS_KEY,
        { expiresIn: "2h" }
    );
}

export default verify