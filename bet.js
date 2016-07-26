"use strict";

var bankroll = 100;
var gameover = false;

// Helpers
function init() {
    if (gameover)
        bankroll = 100;
    gameover = false;
}

function betOn(amount, num) {
    var res = Math.floor(Math.random() * 10) + 1;
    var string = "The winning number is " + res + ".";
    switch(num){
        case res:
            bankroll += amount;
            string += " You Win!";
            break;
        case res + 1:
        case res - 1:
            string += " Almost man!";
            break;
        default:
            bankroll -= amount;
            string += " Oh you lose, give it one more try!";
            break;
    }
    return string;
}

function showGameover() {
    var string = "", button_str = "";
    if (gameover) {
        string = "Sorry you lose all your money, take more money and win it back!";
        button_str = "Take more money";
    } else {
        string = "You have $" + bankroll + " with you, why not continue winning?";
        button_str = "Go back to casino";
    }
    $('#playground').hide();
    $('#gameover-screen').text(string);
    $('#btn-restart').text(button_str);
    $('#gameover').show();
}

function clickStart() {
    $('#start-menu').hide();
    $('#playground').show();
    init();
}

function clickBet() {
    if (gameover)
        return;
    var amount = parseInt($('#amount').val());
    var num = parseInt($('#num').val());
    if (amount > bankroll) {
        alert("You cannot bet more than you have!");
        return;
    }
    if (Number.isNaN(num)) {
        alert("You have to input a number to bet!");
        return;
    }
    var string = betOn(amount, num);
    $('#screen').text(string);
    $('#bankroll').text(bankroll);
    if (bankroll == 0) {
        gameover = true;
        showGameover();
    }
}

function clickCashOut() {
    showGameover();
}

function clickRestart() {
    init();
    $('#bankroll').text(bankroll);
    $('#playground').show();
    $('#gameover').hide();    
}

// Jquery part
$(document).ready(function(){
    // Press start button to start game
    $('#start-menu').on('click', '#btn-start', clickStart);

    // Press bet button to bet
    $('#playground').on('click', '#btn-bet', clickBet)

    // Press cash out button to cash out
    $('#playground').on('click', '#btn-cashout', clickCashOut);

    // Press restart button to restart the game
    $('#gameover').on('click', '#btn-restart', clickRestart);
});