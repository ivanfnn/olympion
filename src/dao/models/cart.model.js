import mongoose from 'mongoose';
import userModel from './user.model.js';

mongoose.pluralize(null);

const schema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'users' }, 
    products: [{ _id: { type: mongoose.Schema.Types.ObjectId, ref: 'products' }, qty: { type: Number, required: true } }]
});

const model = mongoose.model('carts', schema);
export default model;
