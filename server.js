import 'dotenv/config';
import express from 'express';
import mongoose from 'mongoose';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';
import passport from 'src/middlewares/passport';
import axios from 'axios';
import { api as apiRoutes, auth as authRoutes } from 'src/routes';

const app = express();
app.get('/price', async (req, res) => {
    const { data } = await axios
    // .get('https://cex.io/api/order_book/BTC/USDT');
    // .get('https://api.binance.com/api/v1/depth?symbol=BTCUSDT');
    .get('https://cmc-gate.btcnext.io/marketdata/cmc/v1/orderbook/btc_usdt');
    const spread = data.asks.sort((a, b) => parseFloat(a[0]) > parseFloat(b[0]) ? 1 : -1)[0][0] - data.bids.sort((a, b) => parseFloat(a[0]) > parseFloat(b[0]) ? -1 : 1)[0][0];
    const spreadDiff = parseFloat(data.asks[0][0]) - parseFloat(spread / 2);
    res.send(
        `
        <div>${spread}</div>
        <div style="display: flex">
        <div style="padding-right: 20px">
        <div>bids ${spreadDiff} </div>
        ${data.bids.sort((a, b) => parseFloat(a[0]) > parseFloat(b[0]) ? -1 : 1).map(v => {
            return `<div style="color: green"> bids ${v[0]} === ${v[1]} </div>`;
        }).join('')}</div>
        ${' '}
        <div>
        <div>asks ${spreadDiff} my order to sell </div>
        ${data.asks.sort((a, b) => parseFloat(a[0]) > parseFloat(b[0]) ? 1 : -1).map(v => {
            return `<div style="color: red"> asks ${v[0]} === ${v[1]} </div>`;
        }).join('')}</div>
        </br>`);
});

mongoose.connect(process.env.MONGO_URL, { useCreateIndex: true, useNewUrlParser: true, useUnifiedTopology: true });

app.use(passport.initialize());

app.use(morgan('dev'));

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/auth', authRoutes);
app.use('/api', passport.authenticate('jwt', { session: false }), apiRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is listening at port ${port}`));