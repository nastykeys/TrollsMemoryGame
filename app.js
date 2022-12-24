const cardArray = [
    {
        name: 'troll1',
        img: "images/troll1.png"
    },
    {
        name: 'troll2',
        img: "images/troll2.png"
    },
    {
        name: 'troll3',
        img: "images/troll3.png"
    },
    {
        name: 'troll4',
        img: "images/troll4.png"
    },
    {
        name: 'troll5',
        img: "images/troll5.png"
    },
    {
        name: 'troll6',
        img: "images/troll6.png"
    },
    {
        name: 'bone',
        img: "images/bone.png"
    },
    {
        name: 'ghost',
        img: "images/ghost.png"
    },
    {
        name: 'demon',
        img: "images/demon.png"
    },{
        name: 'troll1',
        img: "images/troll1.png"
    },
    {
        name: 'troll2',
        img: "images/troll2.png"
    },
    {
        name: 'troll3',
        img: "images/troll3.png"
    },
    {
        name: 'troll4',
        img: "images/troll4.png"
    },
    {
        name: 'troll5',
        img: "images/troll5.png"
    },
    {
        name: 'troll6',
        img: "images/troll6.png"
    },
    {
        name: 'bone',
        img: "images/bone.png"
    },
    {
        name: 'ghost',
        img: "images/ghost.png"
    },
    {
        name: 'demon',
        img: "images/demon.png"
    },
]


//concat array  number of level times and randomize srt
grid = document.querySelector("#grid")
resultDisplay = document.querySelector("#result")
cardsChosen =[]
chosenIds = []
cardsWon = []
class MemoryGame {
    constructor(cards, speed, result){
        this.cards = cards.sort(() => Math.floor(0.5 - Math.random()))
        this.speed = speed
        this.result = result
    }
   
    createBoard(){
        resultDisplay.innerHTML = this.result
        this.cards.forEach((card, i) => {
            const cardImg = document.createElement("img")
            grid.appendChild(cardImg)
            cardImg.setAttribute("src", card.img)
            setTimeout(() => {
            cardImg.setAttribute("src", "images/blank.png")
            cardImg.setAttribute('data-id', i)
            }, this.speed)
            cardImg.addEventListener('click', () =>{this.flipCard(cardImg)})
        })
        
    }
    
    flipCard(cardImg){
        const cardId = Number(cardImg.getAttribute("data-id"))
        cardsChosen.push(this.cards[cardId].name)
        chosenIds.push(cardId)
        cardImg.setAttribute('src', this.cards[cardId].img)
        if(cardsChosen.length === 2){
            setTimeout(() =>{this.checkMatch()}, 400)
        }
    }
    
    checkMatch(){
        const images = document.querySelectorAll("img")
        if(chosenIds[0] == chosenIds[1]){
            alert("You clicked the dame card!")
            images[chosenIds[0]].setAttribute('src', 'images/blank.png')
        }else if (cardsChosen[0] == cardsChosen[1]){
            alert("You found a Match!")
            images[chosenIds[0]].setAttribute('src', 'images/white.png')
            images[chosenIds[1]].setAttribute('src', 'images/white.png')
            images[chosenIds[0]].style.pointerEvents = 'none'
            images[chosenIds[1]].style.pointerEvents = 'none'
            cardsWon.push(cardsChosen)
            this.result += 100
            resultDisplay.innerHTML = this.result
        }else{
            images[chosenIds[0]].setAttribute('src', 'images/blank.png')
            images[chosenIds[1]].setAttribute('src', 'images/blank.png')
            this.result -= 5
            resultDisplay.innerHTML = this.result
        }
        cardsChosen = []
        chosenIds = []
        
        if(cardsWon.length == this.cards.length/2){
            alert(`Your score is ${this.result}!`)
            cardsWon = []
            grid.innerHTML = ''
            this.run()
        }
    }

    run(){
        if(this.speed< 3000){
            this.cards.concat(this.cards)
        }
        const rerunGame = new MemoryGame(this.cards, this.speed-1000, this.result)
        rerunGame.createBoard()
    }
}


const runGame = new MemoryGame(cardArray, 6000, 0)

runGame.run()