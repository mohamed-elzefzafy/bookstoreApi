const jwt = require("jsonwebtoken");
// verifyToken
function verifyToken (req , res , next)
{
    const token = req.headers.token;
    if (token)
    {
      try {
       const decoded = jwt.verify(token , process.env.JWT_SECRET_KEY);
       req.user = decoded;
       next();
        
      } catch (error) {
        res.status(401).json({message : "invalid token"});
      }
    } else {
        res.status(401).json({message : "no token provided"});
    }


}


// verifyToken && And Authorize the user

function verifyTokenAndAuthorization (req , res , next )
{
 verifyToken(req , res , () =>{
  if (req.user.id === req.params.id || req.user.isAdmin )
  next();
  else {
   return res.status(403).json({mwssage : "you are not allowed"})
  }
 })

}


// verifyToken && And Admin

function verifyTokenAndAdmin (req , res , next )
{
 verifyToken(req , res , () =>{
  if (req.user.isAdmin )
  next();
  else {
   return res.status(403).json({mwssage : "you are not allowed only admins allowed"})
  }
 })

}




module.exports = {verifyToken , verifyTokenAndAuthorization  , verifyTokenAndAdmin};
