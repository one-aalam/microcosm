const visualize = require('micro-visualize')

module.exports = visualize(async (req, res) => {
    res.end('Welcome to Micro #2')
})