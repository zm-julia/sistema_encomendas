const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()

    const id = document.getElementById('id').value

    const valores = {
        nome: document.getElementById('nome').value,
        cnh: document.getElementById('cnh').value,
        cpf: document.getElementById('cpf').value,
        telefone: document.getElementById('telefone').value
    }

    fetch(`http://localhost:3000/motorista/${id}`,{
        method: 'PUT',
        headers: {'Content-Type': 'application/json',
            'Authorization': token
        },
        body: JSON.stringify(valores)
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
        resposta.innerHTML = ` `
        resposta.innerHTML += `${dados.message}`
        document.querySelector('form').reset()
    })
    .catch(err =>{
        console.error(err)
    })
})
