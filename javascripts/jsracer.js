$(document).ready(function() {
    game = new GameController;
    view = new GameView;
    game.run(view)

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

function GameController() {}

function GameView() {}

GameController.prototype = {
    run: function(view) {
        board = new Board();
        time = Date.now();
        keysDown = {};
        hero = new Ralph(0, 650, 2);
        felix1 = new Felix(20, 90, 2);
        felix2 = new Felix(120, 320, 6);
        felix3 = new Felix(320, 520, 3);
        badGuys = [felix1, felix2, felix3];
        view.createCanvas();
        view.bindWidget();
        $('#start').on('click', function() {
            view.startGame(view, board);
            $('#header').css('visibility', 'hidden');
            $('#banner').css('visibility', 'hidden');
            $('body').css('background-image', 'none');
            $('body').css('background-image', 'url(Images/gamebg.png)');
        })
    }
}

GameView.prototype = {
    startGame: function(view, board) {
        $('.container').css("visibility", "visible")
        view.hideStartButton();
        board.keyboardListener();
        interval = setInterval(board.runUpdate, 10);
    },

    resetHomePage: function() {
        $('.container').css("visibility", "hidden");
        $('#header').css('visibility', 'visible');
        $('#banner').css('visibility', 'visible');
        $('#start').css('visibility', 'visible');
        $('body').css('background-image', 'none');
        $('body').css('background-image', 'url(Images/startbg.png)');
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

    hideStartButton: function() {
        $('#start').css('visibility', "hidden")
    },

    createCanvas: function() {
        canvas = document.createElement("canvas");
        canvas.id = 'canvas';
        ctx = canvas.getContext("2d");
        canvas.width = 747;
        canvas.height = 700;
        $('.container').append(canvas);
    }


}

Board.prototype = {
    updateHero: function() {
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

    updateFelix: function() {
        var i;
        for (i = 0; i < badGuys.length; i++) {
            if (badGuys[i].x >= 750) {
                badGuys[i].x = 0
            } else {
                badGuys[i].x += badGuys[i].speed;
            }
        }
    },

    render: function() {
        ctx = canvas.getContext("2d");
        heroImg = new Image();
        felixImg = new Image();

        heroImg.addEventListener("load", function() {
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            ctx.drawImage(heroImg, hero.x, hero.y);
            ctx.drawImage(felixImg, badGuys[0].x, badGuys[0].y);
            ctx.drawImage(felixImg, badGuys[1].x, badGuys[1].y);
            ctx.drawImage(felixImg, badGuys[2].x, badGuys[2].y);
        }, false);
        heroImg.src = 'Images/ralph.png';
        felixImg.src = 'Images/felix.png';
    },

    runUpdate: function() {
        board.updateHero();
        board.updateFelix();
        board.checkForHit();
        board.render();
        board.winner();
        time = Date.now();
    },

    checkForHit: function() {
        var i;
        var view = new GameView();
        for (i = 0; i < badGuys.length; i++) {
            var aodX = [badGuys[i].x - 14, badGuys[i].x + 14];
            var aodY = [badGuys[i].y - 82, badGuys[i].y + 82];
            if (((aodX[0] <= hero.x) && (hero.x <= aodX[1])) && ((aodY[0] <= hero.y) && (hero.y <= aodY[1]))) {

                $("#dialog-lose").dialog({
                    modal: true,
                    resizable: true,
                    height: 330,
                    buttons: {
                        "Play Again?": function() {
                            $(this).dialog("close");
                            view.startGame(view, board);
                            hero = new Ralph(0, 650, 2);
                        },
                        "Quit": function() {
                            view.resetHomePage();
                            $(this).dialog("close");
                            game.run();
                        }
                    }
                });
                $("#dialog-lose").dialog("open");
                this.reset();
            }
        }
    },

    keyboardListener: function() {
        window.addEventListener('keydown', function(e) {
            keysDown[e.keyCode] = true;
        });
        window.addEventListener('keyup', function(e) {
            delete keysDown[e.keyCode];
        });
    },
    winner: function() {
        if (hero.y <= 0) {
            $("#dialog-win").dialog({
                modal: true,
                resizable: true,
                height: 330,
                buttons: {
                    "Play Again?": function() {
                        $(this).dialog("close");
                        view.startGame(view, board);
                        hero = new Ralph(0, 650, 2);
                    },
                    "Quit": function() {
                        view.resetHomePage();
                        $(this).dialog("close");
                        game.run();
                    }
                }
            });
            $("#dialog-win").dialog("open");
            this.reset();
        }
    },

    reset: function() {
        hero.x = -44;
        hero.y = 1;
        clearInterval(interval);
        // DisableArrowKeys();

    }
}

function DisableArrowKeys() {
    var ar = [37, 38, 39, 40];
    $(document).keydown(function(e) {
        var key = e.which;
        if ($.inArray(key, ar) > -1) {
            e.preventDefault();
            return false;
        }
        return true;
    });
}

function EnableArrowKeys() {
    var ar = new Array(37, 38, 39, 40);
    $(document).keydown(function(e) {
        var key = e.which;
        if ($.inArray(key, ar) > -1) {
            return true;
        }
    });
}