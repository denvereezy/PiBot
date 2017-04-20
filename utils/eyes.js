const five  = require('johnny-five'),
      board = new five.Board();

module.exports = function() {
    this.readings = (cb) => {
        board.on('ready', () => {
          console.log('board is ready');

            const proximity = new five.Proximity({controller: 'HCSR04', pin: 7});

            proximity.on('data', function() {
                var distance = `object ${this.cm} away`;
                cb(distance);
            });
        });
    };
};
