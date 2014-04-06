$(document).ready(function() {
    var game = new GameController;
    var view = new GameView;
    game.run(view)
})

function Player(name) {
    this.name = name;
}

function Board() {

}

function GameController() {

}

function GameView() {

}

GameController.prototype.run = function(view) {
    var player1 = new Player("player1");
    var player2 = new Player("player2");
    var board = new Board;
    view.bindStartButton(board);
}

GameView.prototype.bindStartButton = function(board) {
    $('#start').on('click', function() {
        board.resetBoard();
        board.showBoard();
        board.hideStartButton();
    })
}

Board.prototype.showBoard = function() {
    $('.racer_table td').css("visibility", "visible");
}

Board.prototype.hideStartButton = function() {
    $('#start').css('visibility', "hidden")
}

Board.prototype.resetBoard = function() {
    $('.racer_table td').removeClass();
    $('#player1_strip td:nth-child(1)').addClass('active');
    $('#player2_strip td:nth-child(1)').addClass('active');

}