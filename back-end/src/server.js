import express from 'express';
import { MongoClient } from 'mongodb';

async function start() {
    const client = new MongoClient('mongodb://localhost:27017');

    await client.connect();
    const db = client.db('full-stack-vue');

    const app = express();
    app.use(express.json());

    app.get('/products', async (req,res) => {
        const products = await db.collection('products').find({}).toArray();
        res.send(products);
    });

    async function populateCartIds(ids) {
        return Promise.all(ids.map(id => db.collection('products').findOne({id})));
    }

    app.get('/users/:userId/cart', async (req,res) => {
        const user = await db.collection('users').findOne({id: req.params.userId});
        const populatedCart = await populateCartIds(user.cartItems);
        res.json(populatedCart);
    });

    app.get('/products/:productId', async (req,res) => {
        const productId = req.params.productId;
        const product = await db.collection('products').findOne({ id: productId});
        res.json(product);
    });

    app.post('/users/:userId/cart', async (req, res) => {
        const userId = req.params.userId;
        const productId = req.body.id;
        await db.collection('users').updateOne({id: userId}, {
            $addToSet: { cartItems: productId },  //addToSet doesnt add duplicates
        });
        const user = await db.collection('users').findOne({id: req.params.userId});
        const populatedCart = await populateCartIds(user.cartItems);
        res.json(populatedCart);
    });

    app.delete('/users/:userId/cart/:productId', async (req, res) => {
        const userId = req.params.userId;
        const productId = req.params.productId;
        await db.collection('users').updateOne({id: userId}, {
            $pull: { cartItems: productId },  
        });
        const user = await db.collection('users').findOne({id: req.params.userId});
        const populatedCart = await populateCartIds(user.cartItems);
        res.json(populatedCart);
    });


    app.listen(8000, () => {
        console.log('Server is listening on port 8000');
    });
}

start();