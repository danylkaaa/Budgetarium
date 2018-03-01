var winston = require('winston');

function getLogger(module) {
    var path = module.filename.split('/').slice(-2).join('/'); //отобразим метку с именем файла, который выводит сообщение
    return new winston.Logger({
        transports: [
            new winston.transports.Console({
                colorize: true,
                level: process.env.NODE_ENV.startsWith('dev') ? 'debug' : 'info',
                silent: process.env.NODE_ENV.startsWith('test'),
                label: path
            }),
        ]
    });
}

module.exports = getLogger;