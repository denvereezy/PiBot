'use strict';

const express     = require('express'),
      app         = express(),
      five        = require('johnny-five'),
      Raspi       = require('raspi-io'),
      board       = new five.Board({ io: new Raspi() }),
      server      = require('http').createServer(app),
      io          = require('socket.io')(server),
      FrontWheels = require('./utils/front_wheels'),
      RearWheels  = require('./utils/rear_wheels'),
      Temp        = require('./utils/temp'),
      temp        = new Temp();


app.use(express.static('public'));

board.on('ready', () => {
    console.log('board ready');

    let motor = {};
    const pwmPins  = ['P1-12', 'P1-33'],
        directPins = ['P1-11', 'P1-31'];

    const rear_wheels = new RearWheels(pwmPins[0], directPins[0], motor),
        front_wheels  = new FrontWheels(pwmPins[1], directPins[1], motor);

    const fanPin = new five.Pin('P1-13');
    const music = {
        play_pause  : new five.Pin('P1-15'),
        rewind      : new five.Pin('P1-16'),
        skip        : new five.Pin('P1-18')
    };

    io.sockets.on('connection', socket => {
        console.log('socket connection');

        temp.temp(data => {
            socket.emit('temp', {
                temp: data
            });

            var num = data.replace(/[^0-9]/g, '');

            if (Number(num) >= 50) {
                fanPin.high();
            } else {
                fanPin.low();
            }
        });

        socket.on('speed', data => {
            switch (data.speed) {
                case 85:
                    motor.speed = 85;
                    break;
                case 170:
                    motor.speed = 170;
                    break;
                case 255:
                    motor.speed = 255;
                    break;
            };
        });

        socket.on('direction', data => {
            switch (data.direction) {
                case 'forward':
                    rear_wheels.forward();
                    console.log('forward');
                    break;
                case 'left':
                    front_wheels.left();
                    rear_wheels.forward();
                    console.log('left');
                    break;
                case 'right':
                    front_wheels.right();
                    rear_wheels.forward();
                    console.log('right');
                    break;
                case 'reverse':
                    rear_wheels.reverse();
                    front_wheels.stop();
                    console.log('reverse');
                    break;
                case 'stop':
                    front_wheels.stop();
                    rear_wheels.stop();
                    motor.speed = 0;
                    console.log('stop');
                    break;
            };
        });

        socket.on('music_event', data => {
            switch (data.action) {
                case 'play_pause':
                    music.play_pause.high();
                    setTimeout(() => music.play_pause.low(), 300);
                    break;
                case 'rewind':
                    music.rewind.high();
                    setTimeout(() => music.rewind.low(), 300);
                    break;
                case 'skip':
                    music.skip.high();
                    setTimeout(() => music.skip.low(), 300);
                    break;
            };
        });
    });
});

const port = process.env.PORT || 8080;
server.listen(port, () => {
    console.log('App running on port', port);
});
