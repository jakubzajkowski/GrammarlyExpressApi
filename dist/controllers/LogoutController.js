"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const LogoutController = (req, res) => {
    try {
        res.cookie('token', '', {
            httpOnly: true,
            maxAge: 0,
            path: '/',
            sameSite: 'none',
            secure: true, // Make sure to use HTTPS in production
        });
        return res.status(200).send('Logged Out Success');
    }
    catch (error) {
        console.error(error);
        return res.status(500).send('An error occurred');
    }
};
