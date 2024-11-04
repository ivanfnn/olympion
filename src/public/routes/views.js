import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
    const data = {
      "id": 1,
      "title": "EnergyMax Pro",
      "description": "Bebida energética con alto contenido de cafeína y vitaminas.",
      "code": "EMP1001",
      "price": 2.99,
      "stock": 50,
      "category": "Bebidas Energéticas",
      "status": true
    };
    
    res.status(200).render('index', data);
});

export default router;
