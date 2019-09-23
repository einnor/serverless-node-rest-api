import * as AWS from 'aws-sdk';
import { Callback } from 'aws-lambda';
import { CreateEvent, Item } from '../types';
import * as Config from '../lib/Config';
import * as uuid from 'uuid/v1';

const dynamoDb = new AWS.DynamoDB.DocumentClient();

export const createItem = (data: CreateEvent, callback: Callback) => {
  const timestamp = new Date().getTime();
  const item: Item = {
    id: uuid(),
    name: data.name,
    breed: data.breed,
    createdAt: timestamp,
    updatedAt: timestamp
  };
  const record = {
    TableName: Config.get('DYNAMO_TABLE'),
    Item: item
  };

  dynamoDb.put(record, (error) => {
    // handle potential errors
    if (error) {
      console.log(error);
      callback(new Error('Couldn\'t create the pet item'));
    }

    // Create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(record.Item)
    };
    callback(null, response);
  });
};