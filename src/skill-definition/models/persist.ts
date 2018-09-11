import {MongoClient} from 'mongodb';
import { GameStatus } from './game-status';

export async function updateDb(userId: string, gameStatus: GameStatus) {
        // tslint:disable-next-line:max-line-length
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@alexausers-vknka.mongodb.net/users`;
        const client = await MongoClient.connect(uri);
        const collection = client.db("users").collection("factOrOpinion");
        await collection.updateOne({userId}, {
            $set: gameStatus,
        }, {
            upsert: true,
        });
        client.close();

    }

export async function findDb(userId: string): Promise<GameStatus> {
        // tslint:disable-next-line:max-line-length
        const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@alexausers-vknka.mongodb.net/users`;

        const client = await MongoClient.connect(uri);
        const collection = client.db("users").collection("factOrOpinion");
        const results =  await collection.findOne({userId});
        client.close();

        return results;
    }
