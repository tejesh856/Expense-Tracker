const mongoose = require('mongoose');
const mongodb = async () => {
    await mongoose.connect('mongodb+srv://tejesh:VijPad6972@cluster0.ycbrzpc.mongodb.net/expense', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log('MongoDB connected successfully');
    }).catch((err) => { console.log(err) })
}
module.exports=mongodb;
