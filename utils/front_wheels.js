const five = require('johnny-five');

module.exports = function(pwmPin, directPin, motorSpeed) {
    const motor = new five.Motor({
        pins: {
            pwm: pwmPin,
            dir: directPin
        },
        invertPWM: true
    });

    this.left = () => {
        motorSpeed.speed === 0 ? motor.stop() : motor.reverse(motorSpeed.speed);
    };

    this.right = () => {
        motorSpeed.speed === 0 ? motor.stop() : motor.forward(motorSpeed.speed);
    };

    this.stop = () => {
        motor.stop();
    };
};
