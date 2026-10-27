const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn')

btn.addEventListener('click',(e)=>{
    e.preventDefault()

      const email =  document.getElementById('email').value
      const senha = document.getElementById('senha').value

      const valores = {
        email: email,
        senha: senha
      }

    fetch(`http://localhost:3000/login`,{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(valores)
    })

    .then(res => res.json())
    .then(dados =>{
        resposta.innerHTML = ` `
        resposta.innerHTML += `${dados.message}`
        if(dados.token){
            localStorage.setItem('token',dados.token)
            localStorage.setItem('nomeFuncionario',dados.nome)
            location.href = '../index.html'
        }
        document.querySelector('form').reset()

    })
})