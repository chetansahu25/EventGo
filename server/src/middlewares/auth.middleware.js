function auth(req, res, next) {
    const authHeader = req.headers["authorization"];
    const accessToken = authHeader && authHeader.split(" ")[1];
    const refreshToken = res.cookies?.refreshToken;

    if (!accessToken) {
        return res.status(401).json({ message: "Access token missing" });
    }

    try {
        const decoded = jwt.verify(
            accessToken,
            process.env.ACCESS_TOKEN_SECRET
        );
        req.user = decoded; // attach user data to request
        next();
    } catch (err) {
        if (err.name == "TokenExpiredError") {
            if (!refreshToken) {
                return res.status(401).json({ message: "Refresh token missing" });
            }
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET,
                (refreshErr, refreshUser) => {
                    if (refreshErr) {
                        return res.status(403).json({ message: "Invalid refresh token" });
                    }
                    req.user = refreshUser
                }
            );

            //creating a new access token now & setting it to the header

            const newToken = generateToken("access", dbUser);
            res.setHeader("Authorization", `Bearer ${newToken}`);            
            next();
        }
    }
}
