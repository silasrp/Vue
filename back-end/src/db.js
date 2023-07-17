import {MongoClient} from 'mongodb';
let db;

async function  connectToDb(cb){
    try {
        const client = new MongoClient(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@vue-cluster.hldcook.mongodb.net/?retryWrites=true&w=majority`);
        await client.connect();

        db = client.db('full-stack-vue');  //use full-stack-vue    
        cb();
    }
    catch(err) {
        console.error("Something went wrong")
        console.error(err)
    }
}
export {
    db,
    connectToDb,
};