import mongoose from 'mongoose';

export default mongoose.connect('mongodb://localhost:27017/Store', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
});

