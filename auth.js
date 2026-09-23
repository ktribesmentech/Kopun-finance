import jwt from 'jsonwebtoken';
export function sign(user){return jwt.sign({id:user.id,businessId:user.business_id,role:user.role,name:user.name},process.env.JWT_SECRET,{expiresIn:'12h'});}
export function requireAuth(req,res,next){const h=req.headers.authorization||'';const token=h.startsWith('Bearer ')?h.slice(7):'';if(!token)return res.status(401).json({error:'Authentication required'});try{req.user=jwt.verify(token,process.env.JWT_SECRET);next();}catch{return res.status(401).json({error:'Invalid or expired session'});}}
export function requireRole(...roles){return (req,res,next)=>roles.includes(req.user.role)?next():res.status(403).json({error:'Not permitted'});}
