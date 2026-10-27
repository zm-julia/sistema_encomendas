const token = localStorage.getItem('token')

if(!token){
    location.href = '../index.html'
}

const resposta= document.getElementById('resposta')
const btn = document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()

    const id = document.getElementById('id').value 

    fetch(`http://localhost:3000/motorista/${id}`,{
        method: 'DELETE',
        headers: {'Content-Type': 'application/json',
            'Authorization': token
        }
    })

    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ` `
        resposta.innerHTML += `${dados.message}`
        document.querySelector('form').reset()
    })
})