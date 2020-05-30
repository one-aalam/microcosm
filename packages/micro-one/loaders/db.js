const db = new DB()
module.exports = async (req, res) => await db.getSomeAsyncData()
module.exports.setup = async () => { await db.connect() }
module.exports.teardown = async () => { await db.disconnect() }