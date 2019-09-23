import { APIGatewayEvent, Context, Callback, Handler } from 'aws-lambda';
import { CreateEvent } from '../types';
import { createItem } from '../lib/DynamoDB';

export const create: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  if (!event.body) {
    callback(new Error('Invalid body'));
    return;
  }

  const data: CreateEvent = JSON.parse(event.body);
  if (typeof data.name !== 'string' || typeof data.breed !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Validation Failed. Couldn\'t create the pet item.'));
    return;
  }

  createItem(data, callback);
};
