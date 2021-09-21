import jwt from 'jsonwebtoken';

export default function Authorization(req, res, next) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET_KEY, function (err, decode) {
        if (err) {
            res.status(401);
        }
        if (!err) {
            const date = Math.floor(Date.now() / 1000);
            if (date > decode.exp) {
                res.status(401);
                console.log("Session time out");
            }
            else {
                req.body.id = decode.user_id;
                req.body.type = decode.type;
                next();
            }
        };
    })
}