let boxes = document.querySelectorAll('.boxes')
let choice_div = document.querySelector('.choice')
let vsCup = document.querySelector('#cpu')
let vsPlayer = document.querySelector('#player')
let playerAgain = document.querySelector('#restart')
let text = document.querySelector('.text')



let box_x = []
let box_y = []
let win_status = 0;
let gameStarted = false;
let turn = 'X'
let empty_boxes = ['1', '2', '3', '4', '5', '6', '7', '8', '9']

let winning_set = [['1', '2', '3'],
['4', '5', '6'],
['7', '8', '9'],
['1', '4', '7'],
['2', '5', '8'],
['3', '6', '9'],
['1', '5', '9'],
['3', '5', '7']]


vsCup.addEventListener('click', () => {
    against_cup = true;
    gameStarted = true;
    choice_div.style.display = 'none';
    text.innerText = `Turn for '${turn}'`;

})
vsPlayer.addEventListener('click', () => {
    against_cup = false;
    gameStarted = true;
    choice_div.style.display = 'none';
    text.innerText = `Turn for '${turn}'`;
})
playerAgain.addEventListener('click',()=>{
    box_x = []
    box_y = []
    win_status = 0;
    gameStarted = false;
    turn = 'X'
    empty_boxes = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    choice_div.style.display = 'flex'
    boxtexts = document.querySelectorAll('.boxtext')
    for(boxtext of boxtexts){
        boxtext.innerText = "";
    }
    playerAgain.style.display = 'none'
    text.innerText = "";



})


boxes.forEach(box => {
    box.addEventListener('click', () => {
        if (win_status == 0 && gameStarted) {
            boxtext = box.querySelector('.boxtext')
            if (boxtext.innerText == "") {
                mark_move_on_board(box)
                if (against_cup && win_status ==0) {
                        setTimeout(cpuMove, 500)
                }
            }
        }
    })
});


function cpuMove() {

    let cpu_move = wiseMove(box_y)
    if(cpu_move==null){
        cpu_move = wiseMove(box_x)
    }
    if (cpu_move==null) {
        ranNum = Math.floor(Math.random() * empty_boxes.length);
        cpu_move = empty_boxes[ranNum]
    }
    box = document.getElementById(`${cpu_move}`)
    mark_move_on_board(box)
}

function mark_move_on_board(box) {
    boxtext = box.querySelector('.boxtext')
    boxtext.innerText = turn
    current_box = box.id

    index = empty_boxes.findIndex((b) => {
        return b == current_box;
    })
    empty_boxes.splice(index, 1);
    addbox(turn, current_box)
    checkWin(turn);
    if (empty_boxes.length == 0) {
        if (win_status == 0) {
            text = document.querySelector('.text')
            text.innerText = `It is a Draw`
            win_status = 1
            playerAgain.style.display = 'block'

        }
    } else {
        if (win_status == 0) {   
            turn = changeTurn(turn)
            text.innerText = `Turn for '${turn}'`;
        }

    }

}

function changeTurn(turn) {
    return turn === 'X' ? 'O' : 'X'
}

function addbox(turn, box) {
    if (turn === 'X') {
        box_x.push(box)
        // box_x.sort()
    } else {
        box_y.push(box)
    }
}

function checkWin(turn) {
    if (turn === 'X') {
        user_array = box_x
    } else {
        user_array = box_y
    }

    for (let i = 0; i < 8; i++) {
        win_array = winning_set[i]
        found = 0;
        for (j = 0; j < 3; j++) {
            win_num = win_array[j]
            for (k = 0; k < user_array.length; k++) {
                x = user_array[k]
                if (win_num === x) {
                    found++;
                    break
                }
            }
        }
        if (found == 3) {
            win(turn)
            break;
        }
    }
}

function win(turn) {
    text.innerText = `${turn} won the game`
    win_status = 1;
    playerAgain.style.display = 'block'
}



function wiseMove(arr){
    for(each_winning_set of winning_set){
        let i = 0;
        mightWin = [];
        for(num of each_winning_set){
            if(arr.includes(num)){
                i++;
                mightWin.push(num)
            }
        }
        if(i==2){
            for(winNum of each_winning_set){
                if (!mightWin.includes(winNum)) {
                    if (empty_boxes.includes(winNum)) {
                        return winNum
                    }
                }
            }
        }
    }
    return null
}