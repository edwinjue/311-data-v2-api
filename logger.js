const winston = require('winston');

const { format } = winston;

// Console transport logFormat
const logFormat = format.printf(
  // Print metadata onto console:
  // (info) => `${info.timestamp} ${info.level}: ${info.message} ${JSON.stringify(info.metadata)}`,

  // Do not print metadata onto console:
  // (info) => `${info.timestamp} ${info.level}: ${info.message}`,

  // Use console.log to print metadata to console
  (info) => {
    // metadata exists
    if (!!info.metadata === true
      && typeof info.metadata === 'object'
      && Object.keys(info.metadata).length !== 0) {
      // Use console.log to print metadata to the console since I like how it pretty prints
      console.log(`${info.timestamp} ${info.level}: ${info.message}`, info.metadata);
      return '';
    }

    // no metadata
    return `${info.timestamp} ${info.level}: ${info.message}`;
  },

);

const options = {
  file: {
    level: 'info',
    filename: './logs/app.log',
    handleExceptions: true,
    json: true,
    maxsize: 5242880, // 5MB
    maxFiles: 5,
    colorize: false,
    format: format.combine(
      format.json(),
    ),
  },
  console: {
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
    silent: false,
    format: format.combine(
      format.colorize(),
      logFormat,
    ),
  },
};

const logger = winston.createLogger({
  levels: winston.config.npm.levels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.metadata({ fillExcept: ['message', 'level', 'timestamp'] }),
  ),
  transports: [
    new winston.transports.File(options.file),
    new winston.transports.Console(options.console),
  ],
  exitOnError: false,
  silent: false,
});

module.exports = logger;
