import mongoose from 'mongoose';

mongoose.pluralize(null);

const schema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true }, 
    title: { type: String, required: true },
    description: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    price: { type: Number, required: true, min: 0 },
    stock: { 
        type: Number, 
        required: true, 
        min: 0, 
        validate: { 
            validator: Number.isInteger, 
            message: 'El stock debe ser un número entero.' 
        } 
    },
    category: { 
        type: String, 
        required: true, 
        enum: ['Electrónica', 'Hogar', 'Ropa', 'Otros'] 
    },
    status: { type: Boolean, required: true, default: true },
}, {
    collection: 'products'
});

const model = mongoose.model('products', schema);
export default model;
