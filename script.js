let board = document.getElementById('board')
let cellElements = document.querySelectorAll('[data-cell]')
let gameOverDiv = document.getElementById('gameOverDiv')
let gameOverText = document.getElementById('gameOverText')
let restartBtn = document.getElementById('restartBtn')
let player1plays
const CROSS = 'cross'
const CIRCLE = 'circle'
const WIN_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

startGame()
restartBtn.addEventListener('click', startGame)

function startGame() {
    player1plays = true
    cellElements.forEach(cell => {
        cell.classList.remove('cross')
        cell.classList.remove('circle')
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', handleClick , {once: true})
    })
    gameOverDiv.style.visibility = 'hidden'
    setHoverBoardClass()
}

function handleClick(event) {
    let cell = event.target
    let currentClass = player1plays ? CROSS : CIRCLE
    placeMark(cell, currentClass)
    if(checkWin(currentClass)) {
        endGame(false)
    }
    else if(isDraw()) {
        endGame(true)
    }
    else {
        swapTurns()
        setHoverBoardClass()
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass)
}

function swapTurns() {
    player1plays = !player1plays
}

function setHoverBoardClass() {
    board.classList.remove(CROSS)
    board.classList.remove(CIRCLE)
    if(player1plays) {
        board.classList.add(CROSS)
    }
    else {
        board.classList.add(CIRCLE)
    }
}

function checkWin(currentClass) {
    return WIN_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass)
        })
    })
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(CROSS) || cell.classList.contains(CIRCLE)
    })
}

function endGame(draw) {
    if(draw) {
        gameOverText.innerHTML = 'Draw !!!'
    }
    else {
        gameOverText.innerHTML = `Player ${player1plays ? '1' : '2'} Wins !!!`
    }
    gameOverDiv.style.visibility = 'visible'
}