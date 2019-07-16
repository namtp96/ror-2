const conf = require('../conf')

module.exports = class Err extends Error {
    constructor(message, code) {
        super(message)
        Error.captureStackTrace(this, Err)
        this.errCode = code
    }

    errForDev() {
        return console.error(this.errCode, this.message)
    }

    errForBussines() {
        let err = {
            status: conf.err[this.errCode].status || 500,
            msg: conf.err[this.errCode].msg || 'Something error in server'
        }
        return err
    }

    getErr() {
        this.errForDev()
        return this.errForBussines()
    }
}