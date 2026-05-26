const authorize = (roles) => {

    return (req, res, next) => {

        const role = req.headers.role;

        if (!role) {

            return res.status(401).json({
                error: 'No role provided'
            });
        }

        if (!roles.includes(role)) {

            return res.status(403).json({
                error: 'Access denied'
            });
        }

        next();
    };
};

module.exports = authorize;