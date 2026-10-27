const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()

    const id = document.getElementById('id').value

    fetch(`http://localhost:3000/motorista/${id}`,{
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
            resposta.innerHTML = `<table>${criarThead()}${criarTbody([dados])}</table>`
        }
        document.querySelector('form').reset()
    })
    .catch(err =>{
        console.error(err)
    })
})

function criarTbody(dados){
    let corpo = `<tbody>`
    dados.forEach(el =>{
        corpo += `<tr>`
        corpo += `<td>${el.codMotorista}</td>`
        corpo += `<td>${el.nome}</td>`
        corpo += `<td>${el.cnh}</td>`
        corpo += `<td>${el.cpf}</td>`
        corpo += `<td>${el.telefone}</td>`
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
                <th>Nome</th>
                <th>CNH</th>
                <th>CPF</th>
                <th>Telefone</th>
            </tr>
        </thead>
    `
}
