import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import path from 'path';
import mongoose from 'mongoose';

import productRoutes from './routes/products.js';
import cartRoutes from './routes/carts.js';

const app = express();
const PORT = process.env.PORT || 8080;

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.get('/', (req, res) => {
    res.render('index', { products: [] });
});

const startServer = async () => {
    try {
        await mongoose.connect('mongodb+srv://ivan:123@cluster0.qz5fw.mongodb.net/coder70275');
        console.log('Conectado a la base de datos');

        const httpServer = app.listen(PORT, () => {
            console.log(`Servidor corriendo en el puerto ${PORT}`);
        });

        const socketServer = new Server(httpServer);

        socketServer.on('connection', (socket) => {
            console.log('Nuevo cliente conectado');
            socket.on('disconnect', () => console.log('Cliente desconectado'));
        });
    } catch (error) {
        console.error('Error al conectar a la base de datos', error);
    }
};

startServer();
