import express from 'express';
import bodyParser from 'body-parser';
import { port as configPort } from './server_config';
import { populateDb, populateCards, populateUpi, populateNetbanking } from './server/db/populateDb';

import productsRouter from './server/routes/product';
import paymentRouter from './server/routes/payment';

const PORT = configPort || 3001;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', "*");
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers,Origin,Accept,X-Requested-With,Content-Type,Access-Control-Request-Method,Access-Control-Request-Headers');
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

app.get('/ping', (req,res) => res.status(200).json({message: 'API server is up and running'}));

app.use('/products',productsRouter);
app.use('/payment', paymentRouter);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

//  populateDb("SlicepayFullStackScroll.csv");
// populateDb("SlicepayFullStackOffer.csv");
// populateCards();
// populateUpi(10);
// populateNetbanking(10);