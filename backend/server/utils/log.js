import { Logger, transports as _transports } from 'winston';

function getLogger(module) {
    var path = module.filename.split('/').slice(-2).join('/');

    return new Logger({
        transports : [
            new _transports.Console({
                colorize:   true,
                level:      'debug',
                label:      path
            })
        ]
    });
}

export default getLogger;
