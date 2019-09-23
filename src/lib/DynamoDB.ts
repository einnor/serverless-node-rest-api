import * as AWS from 'aws-sdk';
import { Callback } from 'aws-lambda';
import { CreateEvent, Item, Key } from '../types';
import * as Config from '../lib/Config';
import * as uuid from 'uuid/v1';

const dynamoDb = new AWS.DynamoDB.DocumentClient();
const TableName = Config.get('DYNAMO_TABLE');

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
    TableName,
    Item: item
  };

  // Create the record
  dynamoDb.put(record, (error) => {
    // handle potential errors
    if (error) {
      console.log(error);
      callback(new Error('Couldn\'t create the item'));
      return;
    }

    // Create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(record.Item)
    };
    callback(null, response);
  });
};

export const getItem = (id: string, callback: Callback) => {
  const key: Key = {
    id
  };

  const params = {
    TableName,
    Key: key
  }

  // Fetch item from database
  dynamoDb.get(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.log(error);
      callback(new Error('Couldn\'t get the item'));
      return;
    }

    // Create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Item)
    };
    callback(null, response);
  });
}

export const listItems = (callback: Callback) => {
  const params = {
    TableName
  };

  // Fetch all the items from the database
  dynamoDb.scan(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.log(error);
      callback(new Error('Couldn\'t fetch the items'));
      return;
    }

    // Create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Items)
    };
    callback(null, response);
  });
};
