const crypto = require("crypto")

function randomBytesGenerator(length) {
    return crypto.randomBytes(length).toString('hex')
}

function hash(data, salt, algorithm = 'sha256') {
    return crypto.createHmac(algorithm, salt).update(data).digest('hex')
  }
  

module.exports = { randomBytesGenerator, hash }