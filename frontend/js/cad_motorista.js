const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()

    const valores = {
        nome: document.getElementById('nome').value,
        cnh: document.getElementById('cnh').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value
    }

    fetch(`http://localhost:3000/motorista`,{
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