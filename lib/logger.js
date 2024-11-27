import winston, { createLogger } from 'winston'
const { combine, colorize, errors, simple, timestamp, json } = winston.format

// const fileRotateTransport = new winston.transports.DailyRotateFile({
//     level: "info",
//     filename: 'combined-%DATE%.log',
//     datePattern: 'YYYY-MM-DD',
//     maxFiles: '7d',
// })

const options = {
    console: {
        level: 'debug',
        handleExceptions: true,
        format: combine(
            colorize(),
            simple()
        ),
    },
    file: {
        level: 'info',
        handleExceptions: true,
        format: combine(
            timestamp(),
            json()
        ),
    }
}

const logger = createLogger({
    level: 'info',
    format: combine(timestamp(), json()),
    transports: [
        new winston.transports.Console(options.console)
    ]
})

export default logger
