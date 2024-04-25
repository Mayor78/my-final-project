const jwt = require("jsonwebtoken");

async function authToken(req, res, next) {
    
    try {
        const token = req.cookies?.token;

        console.log("token -", token);

        if (!token) {
            return res.status(200).json({
                message: "User not logged in",
                error: true,
                success: false,
            });
        }

        // Wrap jwt.verify in a promise
        const decoded = await new Promise((resolve, reject) => {
            jwt.verify(token, process.env.TOKEN_SECRET_KEY, (err, decoded) => {
                if (err) reject(err);
                resolve(decoded);
            });
        });

        console.log("decoded", decoded);
        req.userId = decoded?._id;

        next();

    } catch (err) {
        console.log("Error in auth token:", err);
        res.status(400).json({
            message: err.message || "Authentication failed",
            error: true,
            success: false,
        });
    }
}

module.exports = authToken;

