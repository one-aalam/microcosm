const asyncRun = fn => (...args) => Promise.resolve(fn(...args)).catch(args[args.length-1])

module.exports = asyncRun;
