boxes = document.querySelectorAll('.boxes')
turn_display = document.querySelector('.turn')
box_x = []
box_y = []
win_status = 0;
winning_set = [ ['1','2','3'],
        ['4','5','6'],
        ['7','8','9'],
        ['1','4','7'],
        ['2','5','8'],
        ['3','6','9'],
        ['1','5','9'],
        ['3','5','7']] 
turn = 'X'
boxes.forEach(box => {
    box.addEventListener('click',()=>{
        if(win_status==0){

            boxtext = box.querySelector('.boxtext') 
            if (boxtext.innerText == "") {
                boxtext.innerText = turn
                current_box = box.id
                addbox(turn,current_box)
                checkWin(turn);
                turn = changeTurn(turn)
                turn_display.innerText = turn
            }
        }
    })
});


function changeTurn(turn){
    return turn === 'X'?'O':'X' 
}

function addbox(turn,box){
    if (turn ==='X') {
        box_x.push(box)
        // box_x.sort()
    }else{
        box_y.push(box)
    }
}

function checkWin(turn){
    if (turn ==='X') {
       user_array = box_x
    }else{
        user_array = box_y
    }

    for (let i = 0; i < 8; i++) {
        win_array = winning_set[i]
        found = 0;
        for(j=0;j<3;j++){
            win_num = win_array[j]
            for(k=0;k<user_array.length;k++){
                x = user_array[k]
                if (win_num===x) {
                    found ++;
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

function win(turn){
    text = document.querySelector('.text')
    text.innerText = `${turn} won the game`
    win_status = 1;
}