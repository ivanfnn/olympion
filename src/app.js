import express from 'express';
import productRoutes from './public/routes/products';
import cartRoutes from './public/routes/carts';


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/api/products', productRoutes);
app.use('/api/carts', cartRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Ha ocurrido un error' });
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor funcionando en http://localhost:${PORT}`);
});
