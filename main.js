var game = new Phaser.Game(500, 590, Phaser.AUTO, 'game_div');
var main_state = {
	preload: function() {
	    this.game.stage.backgroundColor = '#FFFFFF';
	    this.game.load.image('asteroid', '/asteroid.jpg');
	    this.game.load.image('xwing', '/x-wing.jpg');

	},

	create: function () {
	    this.xwing = this.game.add.sprite(200, 140, 'xwing');
	    var left_key = 
    this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    left_key.onDown.add(this.left, this); 

    	var right_key =
    this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    right_key.onDown.add(this.right, this);

    this.asteroids = game.add.group();
    this.asteroids.createMultiple(20, 'asteroid');
    this.timer = this.game.time.events.loop(1800, this.add_row_of_asteroids, this);
    this.score = 0; 
    var style = { font: "30px Arial", fill: "#000000" 
    }; 
    this.label_score = this.game.add.text(20, 20, "0", 
    style);
 
	   
	},
	left: function () {
	    this.xwing.body.velocity.x = -190;
	},

	right: function () {
		this.xwing.body.velocity.x = 190;
	},
	update: function() {
        // Function called 60 times per second
        //If the bird is out of the world (too high or too low), call the 'restart_game' function

        if (this.xwing.inWorld == false)
        	this.restart_game();
        this.game.physics.overlap(this.xwing, this.asteroids, 
        this.restart_game, null, this);

    },

	restart_game: function() {
        this.game.time.events.remove(this.timer);
        // Start the 'main' state, which restarts the game
        this.game.state.start('main')
        this.game.time.events.remove(this.timer);
    },
    add_one_asteroid: function(x, y) { 
   
    // Get the first dead asteroid of our group
    var asteroid = this.asteroids.getFirstDead();
    
    // Set the new position of the asteroid
    asteroid.reset(x, y);

        //Add velocity to the asteroid to make it move left
        asteroid.body.velocity.y = -200;

        //Kill the asteroid when it's no longer visible
        asteroid.outOfBoundsKill = true;
    },

    //Adds the row of asteroids
    add_row_of_asteroids: function() {
        var hole = Math.floor(Math.random()*5)+1;

        for (var i = 0; i < 8; i++){
            if (i != hole && i != hole +1)
                this.add_one_asteroid(i*60+10, 500);
        }
        this.score += 1; 
        this.label_score.content = this.score; 

    },
};
game.state.add('main', main_state);  
game.state.start('main');  