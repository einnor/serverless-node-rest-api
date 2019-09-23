import * as AWS from 'aws-sdk';
import { Callback } from 'aws-lambda';
import { CreateEvent, UpdateEvent, Item, Key } from '../types';
import * as Config from '../lib/Config';
import * as uuid from 'uuid/v1';

AWS.config.update({ region: 'eu-west-1' });
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

export const updateItem = (id: string, data: UpdateEvent, callback: Callback) => {
  const timestamp = new Date().getTime();
  const key: Key = {
    id
  };

  const params = {
    TableName,
    Key: key,
    ExpressionAttributes: {
      ':name': data.name,
      ':breed': data.breed,
      ':checked': data.checked,
      ':updatedAt': timestamp
    }
  };

  // Update the record
  dynamoDb.update(params, (error, result) => {
    // handle potential errors
    if (error) {
      console.log(error);
      callback(new Error('Couldn\'t update the item'));
      return;
    }

    // Create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify(result.Attributes)
    };
    callback(null, response);
  });
};

export const deleteItem = (id: string, callback: Callback) => {
  const key: Key = {
    id
  };

  const params = {
    TableName,
    Key: key
  }

  // Delete item from database
  dynamoDb.delete(params, (error) => {
    // handle potential errors
    if (error) {
      console.log(error);
      callback(new Error('Couldn\'t delete the item'));
      return;
    }

    // Create a response
    const response = {
      statusCode: 200,
      body: JSON.stringify({})
    };
    callback(null, response);
  });
}
