import mongoose from 'mongoose';

mongoose.pluralize(null);

const schema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    stock: { type: Number, required: true, min: 0 },
    category: { type: String, required: true },
    status: { type: Boolean, required: true, default: true },
});

const model = mongoose.model('products', schema);
export default model;
