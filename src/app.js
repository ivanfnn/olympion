import express from 'express';
import { Server } from 'socket.io';
import handlebars from 'express-handlebars';
import path from 'path';

import productRoutes from './public/routes/products';
import cartRoutes from './public/routes/carts';

const app = express();
const products = [];  


app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, '/views'));

app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error' });
});

app.get('/', (req, res) => {
  res.render('index', { products });
});

app.get('/realtimeproducts', (req, res) => {
  res.render('realTimeProducts', { products });
});


const PORT = process.env.PORT || 8080;
const httpServer = app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


const socketServer = new Server(httpServer);

socketServer.on('connection', (socket) => {
  console.log('Nuevo cliente conectado');
  
 
  socket.emit('updateProducts', products);

  socket.on('addProduct', (data) => {
    const newProduct = {
      title: data.title,
      price: parseFloat(data.price),
    };
    products.push(newProduct);
    
 
    socketServer.emit('updateProducts', products);
  });
});
const messages = [];
socketServer.on('connection' , socket =>{
    console.log('Nuevo Cliente Conectado');
socket.on('new_user_data', data => {
    socket.emit('current_messages', messages);
    socket.broadcast.emit('new_user', data);
});

socket.on('new_own_msg', data =>{
    messages.push(data);
    socketServer.emit('new_own_msg', data);
});

});