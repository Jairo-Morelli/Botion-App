/*Camel case id's, you can access through javascript */

const cards = []

btnAdd.onclick = createCard



/*function object*/
function Card(cardId) {
  // return {
  //   id: cardId,
  //   class: 'class',
  //   content: "",
  //   type: 'card'
  // }
  this.id = cardId
  this.class = "card"
  this.content = ""
  this.type = "card"
}

/* event listener that also handles 
    application update.*/
function createCard() {
  const cardId = `card-${cards.length + 1}`
  const card = new Card(cardId)
  console.log('card =', card)

  cards.push(card)

  updateDOM()
}

function CardComponent(card, cardId) {
  const div = document.createElement("div")
  div.id = card.id
  div.classList.add(card.class)


  const pre = document.createElement("pre")
  pre.textContent = card

  div.appendChild(pre)

  div.addEventListener("click", function() {
    handleSelectedCard(cardId)
  })

  return div
  
}

function handleSelectedCard(cardId) {
  console.log("handle selected card", cardId)
  const card = document.getElementById(cardId)
  

  const input = document.createElement("input")
  input.value = document.querySelector(`#${cardId} pre`).textContent
  input.addEventListener("keyup", function(e) {
    if(e.key === "Enter") {
      console.log("ENTER PRESSED")
    }
  })
  
  card.innerHTML = ""
  card.appendChild(input)

}

function updateDOM() {
  dash.innerHTML = ""
  cards.forEach((card, idx) => {
    dash.appendChild(CardComponent(card, card.id))
  })

}