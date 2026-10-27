const criptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

function authMiddleware(req,res,next){
    const token = req.headers['authorization']

    if(!token){
        return res.status(400).json({message: 'faça login'})
    }

    try{
        const bytes = criptoJs.AES.decrypt(token,CHAVE_SECRETA)
        const dadosDecript = bytes.toString(criptoJs.enc.Utf8)

        if(!dadosDecript){
            return res.status(401).json({message: 'token invalido'})
        }

        const payload = JSON.parse(dadosDecript)

        if(Date.now() > payload.expiraEm){
            return res.status(401).json({message: 'token expirado'})
        }

        req.usuario = payload

        next()
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

module.exports = authMiddleware