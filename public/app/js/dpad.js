var dpad = function(){};

dpad.prototype = {

    preload: function() {

        game.load.atlas('d-pad', 'app/assets/sprites/d-pad.png',
            'app/assets/controller/dpad.json');

    },

    pad: {},

    buttonDPadLeft: {},
    buttonDPadRight: {},
    buttonDPadUp: {},
    buttonDPadDown: {},
    imageDPad: {},

    create: function() {

        imageDPad = game.add.image(100, game.camera.height-100, 'd-pad', 'DPAD');

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
            this.imageDPad.frameName = 'DPAD_Left';
        } else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_RIGHT) {
            this.imageDPad.frameName = 'DPAD_Right';
        } else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_UP) {
            this.imageDPad.frameName = 'DPAD_Up';
        } else if (button.buttonCode === Phaser.Gamepad.XBOX360_DPAD_DOWN) {
            this.imageDPad.frameName = 'DPAD_Down';
        }

    },

    onUp: function(button, value) {

        this.imageDPad.frameName = 'DPAD';

    }
};
