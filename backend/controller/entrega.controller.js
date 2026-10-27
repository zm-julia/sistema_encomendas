const Entrega = require('../models/Entrega')
const Carga = require('../models/Carga')

const STATUS = ['ENTREGUE','TRANSITO']

const cadastrar = async(req,res)=>{
    const valores = req.body

    if(!valores.cidade || !valores.destino || !valores.status || !valores.data || !valores.hora || !valores.idCarga){
        return res.status(400).json({message: 'todos os campos são obrigatórios'})
    }

    const status = String(valores.status).toUpperCase()
    if(!STATUS.includes(status)){
        return res.status(400).json({message: 'status inválido, use ENTREGUE ou TRANSITO'})
    }

    try{
        const carga = await Carga.findByPk(valores.idCarga)
        if(!carga){
            return res.status(404).json({message: 'não encontrado'})
        }

        const novaEntrega = await Entrega.create({...valores, status})
        res.status(201).json({message: 'dados cadastrados',entrega: novaEntrega})
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

const atualizar = async(req,res)=>{
    const id = req.params.id
    const valores = req.body

    try{
        const entrega = await Entrega.findByPk(id)
        if(!entrega){
            return res.status(404).json({message: 'não encontrado'})
        }

        const dados = {}
        if(valores.cidade){
            dados.cidade = valores.cidade
        }
        if(valores.destino){
            dados.destino = valores.destino
        }
        if(valores.status){
            const status = String(valores.status).toUpperCase()
            if(!STATUS.includes(status)){
                return res.status(400).json({message: 'status inválido, use ENTREGUE ou TRANSITO'})
            }
            dados.status = status
        }
        if(valores.data){
            dados.data = valores.data
        }
        if(valores.hora){
            dados.hora = valores.hora
        }
        if(valores.idCarga){
            const carga = await Carga.findByPk(valores.idCarga)
            if(!carga){
                return res.status(404).json({message: 'carga não encontrada'})
            }
            dados.idCarga = valores.idCarga
        }

        if(Object.keys(dados).length === 0){
            return res.status(400).json({message: 'informe ao menos um campo'})
        }

        await Entrega.update(dados, {where: {codEntrega: id}})
        res.status(200).json({message: 'atualizado com sucesso'})
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

const listarOrdenado = async(req,res)=>{
    const ordem = req.query.ordem === 'DESC' ? 'DESC' : 'ASC'

    try{
        const entregas = await Entrega.findAll({
            order: [['data', ordem],['hora', ordem]],
            include: [
                {
                    model: Carga,
                    as: 'cargaEntrega',
                    attributes: ['codCarga','descricao','rastreio']
                }
            ]
        })
        res.status(200).json(entregas)
    }catch(err){
        res.status(500).json({message: 'erro'})
    }
}

module.exports = {cadastrar,atualizar,listarOrdenado}
