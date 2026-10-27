const Funcionario = require('../models/Funcionario')
const cryptoJs = require('crypto-js')
const CHAVE_SECRETA = 'segredo'

const logar = async(req,res)=>{
    const valores = req.body

    if(!valores.email || !valores.senha){
        return res.status(400).json({message: 'todos os campos são obrigatórios'})
    }

    try{
        const funcionario = await Funcionario.findOne({where: {email: valores.email}})
        if(!funcionario){
            return res.status(404).json({message: 'não encontrado'})
        }

        const bytes = cryptoJs.AES.decrypt(funcionario.senha, CHAVE_SECRETA)
        const senhaDecript = bytes.toString(cryptoJs.enc.Utf8)

        if(valores.senha !==senhaDecript){
            return res.status(401).json({message: 'senha invalida'})
        }

        const tempoEmMs = 3 * 60 * 60 * 1000
        const tempoExpira = Date.now() + tempoEmMs
        
        const payload = {
            idFuncionario: funcionario.codFuncionario,
            nome: funcionario.nome,
            expiraEm: tempoExpira
        }

        const token = cryptoJs.AES.encrypt(JSON.stringify(payload),CHAVE_SECRETA).toString()

        res.status(200).json({message: 'dados logado',nome: funcionario.nome, token: token})
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

module.exports = {logar}