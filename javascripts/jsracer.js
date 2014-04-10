$(document).ready(function() {
    var game = new GameController;
    var view = new GameView;
    game.run(view, game);

})

// MODELS

function Felix(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
}

function Ralph(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
}

function Board() {}
Board.prototype = {
    updateHero: function(keysDown, hero) {
        if (37 in keysDown) {
            hero.x -= hero.speed;
        }
        if (38 in keysDown) {
            hero.y -= hero.speed;
        }
        if (39 in keysDown) {
            hero.x += hero.speed;
        }
        if (40 in keysDown) {
            hero.y += hero.speed;
        }
    },

    updateFelix: function(badGuys) {
        var i;
        for (i = 0; i < badGuys.length; i++) {
            if (badGuys[i].x >= 750) {
                badGuys[i].x = -20
            } else {
                badGuys[i].x += badGuys[i].speed;
            }
        }
    },

    checkForHit: function(view, badGuys, hero, game) {
        var i;
        that = this
        for (i = 0; i < badGuys.length; i++) {
            var aodX = [badGuys[i].x - 14, badGuys[i].x + 14];
            var aodY = [badGuys[i].y - 82, badGuys[i].y + 82];
            if (((aodX[0] <= hero.x) && (hero.x <= aodX[1])) && ((aodY[0] <= hero.y) && (hero.y <= aodY[1]))) {
                view.initLoseWindow(view, canvas, that, game);
                view.renderLoseWindow();
                this.endGame();
            }
        }
    },

    keyboardListener: function(keysDown) {
        window.addEventListener('keydown', function(e) {
            keysDown[e.keyCode] = true;
        });
        window.addEventListener('keyup', function(e) {
            delete keysDown[e.keyCode];
        });
    },
    winner: function(hero, view, canvas, board, game) {
        if (hero.y <= 0) {
            view.initWinWindow(view, canvas, board, game);
            view.renderWinWindow();
            this.endGame();
        }
    },

    endGame: function() {
        clearInterval(interval);
    }
}

//CONTROLLER

function GameController() {}

GameController.prototype = {
    run: function(view, game) {
        var canvas = view.createCanvas();
        view.bindWidget();
        $('#start').on('click', function() {
            view.startGame(view, canvas, game);
            view.toggleHeader('hidden');
            view.toggleBanner('hidden');
            view.toggleBackground('none');
            view.toggleBackground('url(Images/gamebg.png)')
        })
    },
}

// VIEW

function GameView() {

}

GameView.prototype = {
    startGame: function(view, canvas, game) {
        var board = new Board();
        var keysDown = {};
        var hero = new Ralph(0, 650, 2);
        var felix1 = new Felix(20, 90, 2);
        var felix2 = new Felix(120, 320, 6);
        var felix3 = new Felix(320, 520, 3);
        var badGuys = [felix1, felix2, felix3];
        this.toggleContainer("visible")
        this.toggleStartButton("hidden");
        board.keyboardListener(keysDown);
        interval = setInterval(function() {
            board.updateHero(keysDown, hero);
            board.updateFelix(badGuys);
            board.checkForHit(view, badGuys, hero, game);
            view.render(hero, badGuys, canvas);
            board.winner(hero, view, canvas, board, game);
        }, 10);
    },

    toggleContainer: function(visibility) {
        $('.container').css("visibility", visibility);
    },

    initLoseWindow: function(view, canvas, board, game) {
        console.log(view)
        console.log(canvas)
        console.log(board)
        console.log(game)
        $("#dialog-lose").dialog({
            modal: true,
            resizable: true,
            height: 330,
            buttons: {
                "Play Again?": function() {
                    $(this).dialog("close");
                    view.startGame(view, canvas, game);
                },
                "Quit": function() {
                    view.resetHomePage();
                    $(this).dialog("close");
                }
            }
        });
    },

    initWinWindow: function(view, canvas, board, game) {
        $("#dialog-win").dialog({
            modal: true,
            resizable: true,
            height: 330,
            buttons: {
                "Play Again?": function() {
                    $(this).dialog("close");
                    view.startGame(view, canvas, game);
                },
                "Quit": function() {
                    $(this).dialog("close");
                    view.resetHomePage();
                }
            }
        });
    },

    renderWinWindow: function() {
        $("#dialog-win").dialog("open");
    },

    renderLoseWindow: function() {
        $("#dialog-lose").dialog("open");
    },

    toggleHeader: function(visibility) {
        $('#header').css('visibility', visibility);
    },

    toggleBanner: function(visibility) {
        $('#banner').css('visibility', visibility);
    },

    toggleBackground: function(visibility) {
        $('body').css('background-image', visibility);
    },

    resetHomePage: function() {
        this.toggleContainer("hidden");
        this.toggleHeader("visible");
        this.toggleBanner('visible');
        this.toggleStartButton("visible");
        this.toggleBackground('none');
        this.toggleBackground('url(Images/startbg.png)');
    },

    render: function(hero, badGuys, canvas) {
        var that = this
        var heroImg = new Image();
        var felixImg = new Image();
        var ctx = canvas.getContext("2d");
        heroImg.src = 'Images/ralph.png';
        felixImg.src = 'Images/felix.png';
        heroImg.addEventListener("load", function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(heroImg, hero.x, hero.y);
            for (var i = 0; i < badGuys.length; i++) {
                ctx.drawImage(felixImg, badGuys[i].x, badGuys[i].y);
            }
        }, false);
    },

    bindWidget: function() {
        $(function() {
            $("#dialog-start").dialog({
                autoOpen: false
            });
            $("#dialog-win").dialog({
                autoOpen: false
            });
            $("#dialog-lose").dialog({
                autoOpen: false
            });
            $("#start").on("click", function() {
                $("#dialog-start").dialog({
                    modal: true
                });
                $("#dialog-start").dialog("open");
            });
        });
    },

    toggleStartButton: function(visibility) {
        $('#start').css('visibility', visibility)
    },

    createCanvas: function() {
        var canvas = document.createElement("canvas");
        canvas.id = 'canvas';
        canvas.width = 747;
        canvas.height = 700;
        $('container').empty();
        $('.container').append(canvas);
        return canvas;
    }
}