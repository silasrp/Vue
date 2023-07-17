import {MongoClient} from 'mongodb';
let db;

async function  connectToDb(cb){
    const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@vue-cluster.hldcook.mongodb.net/`);
    await client.connect();

    db = client.db('full-stack-vue');  //use full-stack-vue    
    cb();

}
export {
    db,
    connectToDb,
};