const fs = require('fs');

module.exports = function() {
    this.temp = (cb) => {

        setInterval(() => {
            const temp = fs.readFileSync('/sys/class/thermal/thermal_zone0/temp');
            const temp_c = temp / 1000;
            cb(temp_c);
        }, 1000);
    };
};
