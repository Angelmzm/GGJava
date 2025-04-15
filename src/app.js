require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createConnection } = require('typeorm');

// rotas
const userRoutes = require('./routes/userRoutes');
//const productRoutes = require('./routes/productRoutes');
// se tiver rotas de pedidos e endereços, adicione aqui também futuramente

const app = express();

// middleware de log
app.use((req, res, next) => {
  console.log(`Recebida requisição: ${req.method} ${req.originalUrl}`);
  console.log('Cabeçalhos:', req.headers);  
  console.log('Corpo:', req.body);  
  next(); 
});

app.use(cors());
app.use(express.json());

// rotas
app.use('/api/users', userRoutes);
//app.use('/api/products', productRoutes);

createConnection({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [
    require('./entities/user.entity'),
    require('./entities/product.entity'),
    require('./entities/address.entity'),
    require('./entities/order.entity'),
    require('./entities/orderItem.entity'),
  ],
  synchronize: true,
  logging: true,  
})
  .then(() => {
    console.log('Conectado ao banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados', error);
  });

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
