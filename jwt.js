const {sign,verify} = require('jsonwebtoken');

const createTokens = (user)=>{
    const accessToken = sign(
        {userEmail:user.email, id:user._id},
        'jwtsecretkey'
    )

    return accessToken
}

const createAdminToken =  (admin)=>{
    const accessToken = sign(
        {adminEmail:admin.email, id:admin._id},
        'jwtAdminsecretkey'
    )

    return accessToken
}

const validateToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];
    verify(token,'jwtsecretkey', (err, decoded) => {
        if (err) {
        return res.json('unauthorized');
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.json('unauthorized');
  }
};

const validateAdminToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
      const token = authHeader.split(' ')[1];
      verify(token,'jwtAdminsecretkey', (err, decoded) => {
          if (err) {
             res.json('unauthorized');
            }
        req.user = decoded;
      next();
    });
  } else {
     res.json('unauthorized');
  }
};




module.exports = {
    createTokens,
    validateToken,
    createAdminToken,
    validateAdminToken
}