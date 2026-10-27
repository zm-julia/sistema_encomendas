const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()

    const valores = {
        descricao: document.getElementById('descricao').value,
        peso: Number(document.getElementById('peso').value),
        volume: Number(document.getElementById('volume').value),
        rastreio: document.getElementById('rastreio').value,
        idMotorista: Number(document.getElementById('idMotorista').value)
    }

    fetch(`http://localhost:3000/carga`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
    })

    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ` `
        resposta.innerHTML += `${dados.message}`
        document.querySelector('form').reset()
    })
})