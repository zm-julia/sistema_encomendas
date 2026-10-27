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
        cidade: document.getElementById('cidade').value,
        destino: document.getElementById('destino').value,
        status: document.getElementById('status').value,
        data: document.getElementById('data').value,
        hora: document.getElementById('hora').value,
        idCarga: Number(document.getElementById('idCarga').value)
    }

    fetch(`http://localhost:3000/entrega/${id}`,{
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
