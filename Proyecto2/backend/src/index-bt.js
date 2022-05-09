


const bluetooth = require('node-bluetooth');

const device = new bluetooth.DeviceINQ();

// Find devices
device
    .on('finished', console.log.bind(console, 'finished'))
    .on('found', function found(address, name) {
        console.log('Found: ' + address + ' with name ' + name);

        // We know our Arduino bluetooth module is called 'HC-05', so we only want to connect to that.
        if (name === 'HC-05') {

            // find serial port channel
            device.findSerialPortChannel(address, function (channel) {
                console.log('Found channel for serial port on %s: ', name, channel);

                // make bluetooth connect to remote device
                bluetooth.connect(address, channel, function (err, connection) {
                    if (err) return console.error(err);

                    // This is some example code from the library for writing, customize as you wish.
                    connection.delimiter = Buffer.from('/n', 'utf-8');
                    connection.on('data', (buffer) => {
                        console.log('received message: ', buffer.toString());
                    });

                    // This is some example code from the library for writing, customize as you wish.
                    connection.write(new Buffer('hello', 'utf-8'), () => {
                        console.log('wrote');
                    });
                });
            });
        }
    });
device.scan();