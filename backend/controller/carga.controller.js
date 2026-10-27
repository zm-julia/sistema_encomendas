const Carga = require('../models/Carga')
const Motorista = require('../models/Motorista')

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.descricao || !valores.peso || !valores.volume || !valores.rastreio || !valores.idMotorista){
        return res.status(400).json({message: 'todos os campos são obrigatórios'})
    }

    if(!/^\d+$/.test(String(valores.rastreio))){
        return res.status(400).json({message: 'o código de rastreio deve ser numérico'})
    }

    try{
        const motorista = await Motorista.findByPk(valores.idMotorista)
        if(!motorista){
            return res.status(404).json({message: 'não encontrado'})
        }

        const novaCarga = await Carga.create(valores)
        res.status(201).json({message: 'dados cadastrados',carga: novaCarga})
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

module.exports = {cadastrar}
