const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()

    const ordem = document.getElementById('ordem').value

    fetch(`http://localhost:3000/entregas?ordem=${ordem}`,{
        method: 'GET',
        headers: {'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    .then(res =>{
        if(res.status === 401){
            localStorage.clear()
            alert('Faça login novamente, tempo expirado!')
            location.href = '../index.html'
            throw new Error('sessão expirada')
        }
        return res.json()
    })
    .then(dados =>{
        if(dados.message){
            resposta.innerHTML = `${dados.message}`
        }else{
            resposta.innerHTML = `<table>${criarThead()}${criarTbody(dados)}</table>`
        }
    })
    .catch(err =>{
        console.error(err)
    })
})

function formatarData(data){
    return data.split('-').reverse().join('/')
}

function criarTbody(dados){
    let corpo = `<tbody>`
    dados.forEach(el =>{
        const descricao = el.cargaEntrega ? el.cargaEntrega.descricao : 'N/A'
        const rastreio = el.cargaEntrega ? el.cargaEntrega.rastreio : 'N/A'

        corpo += `<tr>`
        corpo += `<td>${el.codEntrega}</td>`
        corpo += `<td>${el.cidade}</td>`
        corpo += `<td>${el.destino}</td>`
        corpo += `<td>${el.status}</td>`
        corpo += `<td>${formatarData(el.data)}</td>`
        corpo += `<td>${el.hora}</td>`
        corpo += `<td>${descricao}</td>`
        corpo += `<td>${rastreio}</td>`
        corpo += `</tr>`
    })
    corpo += `</tbody>`
    return corpo
}

function criarThead(){
    return `
        <thead>
            <tr>
                <th>Código</th>
                <th>Cidade</th>
                <th>Destino</th>
                <th>Status</th>
                <th>Data</th>
                <th>Hora</th>
                <th>Carga</th>
                <th>Rastreio</th>
            </tr>
        </thead>
    `
}
