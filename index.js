let participantes = [
  {
    nome: "William Matheus",
    email: "williammatheus@mail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0) 
  },
  {
    nome: "William Lima",
    email: "williamlima@mail.com",
    dataInscricao: new Date(2024, 2, 22, 19, 20),
    dataCheckIn: new Date(2024, 2, 25, 22, 0) 
  },
  {
    nome: "João da Silva",
    email: "joaosilva@mail.com",
    dataInscricao: new Date(2024, 2, 23, 10, 30),
    dataCheckIn: new Date(2024, 2, 25, 21, 0) 
  },
  {
    nome: "Ana Souza",
    email: "anasouza@mail.com",
    dataInscricao: new Date(2024, 2, 23, 14, 45),
    dataCheckIn: new Date(2024, 2, 25, 20, 0) 
  },
  {
    nome: "Pedro Oliveira",
    email: "pedrooliveira@mail.com",
    dataInscricao: new Date(2024, 2, 24, 9, 0),
    dataCheckIn: new Date(2024, 2, 25, 19, 30) 
  },
  {
    nome: "Mariana Santos",
    email: "marianasantos@mail.com",
    dataInscricao: new Date(2024, 2, 24, 11, 20),
    dataCheckIn: new Date(2024, 2, 25, 18, 45) 
  },
  {
    nome: "Carlos Pereira",
    email: "carlospereira@mail.com",
    dataInscricao: new Date(2024, 2, 24, 13, 15),
    dataCheckIn: new Date(2024, 2, 25, 17, 55) 
  },
  {
    nome: "Juliana Costa",
    email: "julianacosta@mail.com",
    dataInscricao: new Date(2024, 2, 25, 8, 30),
    dataCheckIn: new Date(2024, 2, 25, 16, 20) 
  },
  {
    nome: "Lucas Silva",
    email: "lucassilva@mail.com",
    dataInscricao: new Date(2024, 2, 25, 10, 10),
    dataCheckIn: new Date(2024, 2, 25, 15, 40) 
  },
  {
    nome: "Maria Oliveira",
    email: "mariaoliveira@mail.com",
    dataInscricao: new Date(2024, 2, 25, 12, 45),
    dataCheckIn: new Date(2024, 2, 25, 14, 55) 
  }
];

const criarNovoParticipante = (participante) => {
  const dataInscricao = dayjs(Date.now())
  .to(participante.dataInscricao)

  let dataCheckIn = dayjs(Date.now())
  .to(participante.dataCheckIn)
  
  if(participante.dataCheckIn == null) {
    dataCheckIn = `
      <button
        data-email="${participante.email}"
        onclick="fazerCheckIn(event)"
      >
        Confirmar check-in
      </button>
    `
  }

  return `
  <tr>
    <td>
      <strong>
        ${participante.nome}
      </strong>
      <br>
      <small>
        ${participante.email}
      </small>
    </td>
    <td>${dataInscricao}</td>
    <td>${dataCheckIn}</td>
  </tr>
  `
}

const atualizarLista = (participantes) => {
  let output = ""
  for(let participante of participantes) {
    output = output + criarNovoParticipante(participante)
  }

  // substituir informação do HTML
  document
  .querySelector('tbody')
  .innerHTML = output
}

atualizarLista(participantes)

const adicionarParticipante = (event) => {
  event.preventDefault()

  const dadosDoFormulario = new FormData(event.target)

  const participante = {
    nome: dadosDoFormulario.get('nome'),
    email: dadosDoFormulario.get('email'),
    dataInscricao: new Date(),
    dataCheckIn: null  
  }

  // verificar se o particpante já existe
  const participanteExiste = participantes.find(
    (p) => p.email == participante.email
  )

  if(participanteExiste) {
    alert('Email já cadastrado!')
    return
  }

  participantes = [participante, ...participantes]
  atualizarLista(participantes)

  // limpar o formulario
  event.target.querySelector('[name="nome"]').value = ""
  event.target.querySelector('[name="email"]').value = ""
}

const fazerCheckIn = (event) => {
  // confirmar se realmente quer o check-in
  const mensagemConfirmacao = 'Tem certeza que deseja fazer o check-in?' 

  if(confirm(mensagemConfirmacao) == false) {
    return
  }

  // encontrar o participante dentro da lista
  const participante = participantes.find(
    (p) => p.email == event.target.dataset.email  
  )
  
  // atualizar o check-in do participante
  participante.dataCheckIn = new Date()

  // atualizar a lista de participantes
  atualizarLista(participantes)
}