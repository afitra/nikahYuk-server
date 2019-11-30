const mongoose = require('mongoose')
const MongoUrl = `mongodb://localhost:27017/${process.env.DB_NAME}`
mongoose.connect(MongoUrl, { useCreateIndex: true, useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log(`Mongoose Connect Successfuly`)
    })
    .catch(err => {
        console.log(err)
        console.log(`Mongoose Connect Fail`)
    })

module.exports = mongoose