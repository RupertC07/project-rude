import { createLogger, format, transports } from 'winston';
import config from '.';

const logger = createLogger({
  level: config.app.log_level || 'info',
  format: format.combine(
    format.timestamp(),
    format.json()
  ),
  transports: [
    new transports.File({ filename: 'logs/error.log', level: 'error' }),
    new transports.File({ filename: 'logs/combined.log' })
  ]
});

if (config.app.env !== 'production') {
  logger.add(
    new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      )
    })
  );
}

export default logger;
