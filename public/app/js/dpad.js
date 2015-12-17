var dpad = function() {};

dpad.prototype = {

    preload: function() {

        game.load.atlas('xbox360', 'app/assets/controllers/xbox360.png',
            'app/assets/controllers/xbox360.json');

    },

    pad: {},

    buttonDPadLeft: {},
    buttonDPadRight: {},
    buttonDPadUp: {},
    buttonDPadDown: {},

    imageDPad: {},

    create: function() {

        //  Add some images
        this.imageDPad = game.add.image(100, 200, 'xbox360', '360_Dpad');

        game.input.gamepad.start();

        this.pad = game.input.gamepad.pad1;

        this.pad.addCallbacks(this, {
            onConnect: this.addButtons
        });

    },

    addButtons: function() {

        //  We can't do this until we know that the gamepad has been connected and is started

    //  These won't work in Firefox, sorry! It uses totally different button mappings

        this.buttonDPadLeft = this.pad.getButton(Phaser.Gamepad.XBOX360_DPAD_LEFT);
        this.buttonDPadRight = this.pad.getButton(Phaser.Gamepad.XBOX360_DPAD_RIGHT);
        this.buttonDPadUp = this.pad.getButton(Phaser.Gamepad.XBOX360_DPAD_UP);
        this.buttonDPadDown = this.pad.getButton(Phaser.Gamepad.XBOX360_DPAD_DOWN);

        this.buttonDPadLeft.onDown.add(this.onDown, this);
        this.buttonDPadRight.onDown.add(this.onDown, this);
        this.buttonDPadUp.onDown.add(this.onDown, this);
        this.buttonDPadDown.onDown.add(this.onDown, this);

        this.buttonDPadLeft.onUp.add(this.onUp, this);
        this.buttonDPadRight.onUp.add(this.onUp, this);
        this.buttonDPadUp.onUp.add(this.onUp, this);
        this.buttonDPadDown.onUp.add(this.onUp, this);

    },

    onDown: function(button, value) {

        if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_LEFT) {
          console.log("left");
            this.imageDPad.frameName = '360_Dpad_Left';
        } else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_RIGHT) {
          console.log("right");
            this.imageDPad.frameName = '360_Dpad_Right';
        } else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_UP) {
          console.log("up");
            this.imageDPad.frameName = '360_Dpad_Up';
        } else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_DOWN) {
          console.log("down");
            this.imageDPad.frameName = '360_Dpad_Down';
        }

    },

    onUp: function(button, value) {


            this.imageDPad.frameName = '360_Dpad';


    }
};
