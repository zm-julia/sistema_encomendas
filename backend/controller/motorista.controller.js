const Motorista = require('../models/Motorista')
const cryptoJs = require('crypto-js')
const {Op} = require('sequelize')
const CHAVE_SECRETA = 'segredo'

const descriptografar = (texto)=>{
    const bytes = cryptoJs.AES.decrypt(texto, CHAVE_SECRETA)
    return bytes.toString(cryptoJs.enc.Utf8)
}

const formatar = (el)=>{
    return {
        codMotorista: el.codMotorista,
        nome: el.nome,
        cnh: descriptografar(el.cnh),
        cpf: descriptografar(el.cpf),
        telefone: el.telefone
    }
}

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.nome || !valores.cnh || !valores.cpf || !valores.telefone){
        return res.status(400).json({message: 'todos os campos são obrigatórios'})
    }

    try{
        const cnhCripto = cryptoJs.AES.encrypt(valores.cnh, CHAVE_SECRETA).toString()
        const cpfCripto = cryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()

        await Motorista.create({
            nome: valores.nome,
            cnh: cnhCripto,
            cpf: cpfCripto,
            telefone: valores.telefone
        })
        res.status(201).json({message: 'dados cadastrados'})
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

const listar = async(req,res)=>{
    try{
        const motoristas = await Motorista.findAll()
        const resultado = motoristas.map(formatar)
        res.status(200).json(resultado)
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

const consultar = async(req,res)=>{
    const id = req.params.id
    try{
        const motorista = await Motorista.findByPk(id)
        if(!motorista){
            return res.status(404).json({message: 'não encontrado'})
        }
        res.status(200).json(formatar(motorista))
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

const consultarNome = async(req,res)=>{
    const nome = req.params.nome
    try{
        const motoristas = await Motorista.findAll({where: {nome: {[Op.like]: `%${nome}%`}}})
        if(motoristas.length === 0){
            return res.status(404).json({message: 'não encontrado'})
        }
        res.status(200).json(motoristas.map(formatar))
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

const atualizar = async(req,res)=>{
    const id = req.params.id
    const valores = req.body

    try{
        const motorista = await Motorista.findByPk(id)
        if(!motorista){
            return res.status(404).json({message: 'não encontrado'})
        }

        const dados = {}
        if(valores.nome){
            dados.nome = valores.nome
        }
        if(valores.cnh){
            dados.cnh = cryptoJs.AES.encrypt(valores.cnh, CHAVE_SECRETA).toString()
        }
        if(valores.cpf){
            dados.cpf = cryptoJs.AES.encrypt(valores.cpf, CHAVE_SECRETA).toString()
        }
        if(valores.telefone){
            dados.telefone = valores.telefone
        }

        if(Object.keys(dados).length === 0){
            return res.status(400).json({message: 'informe ao menos um campo'})
        }

        await Motorista.update(dados, {where: {codMotorista: id}})
        res.status(200).json({message: 'atualizado com sucesso'})
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

const apagar = async(req,res)=>{
    const id = req.params.id
    try{
        const dados = await Motorista.findByPk(id)
        if(!dados){
            return res.status(404).json({message: 'não encontrado'})
        }
        await Motorista.destroy({where: {codMotorista: id}})
        res.status(200).json({message: 'apagado com sucesso'})
    }catch(err){
        res.status(500).json({message: 'erro'})

    }
}

module.exports = {cadastrar,listar,consultar,consultarNome,atualizar,apagar}
