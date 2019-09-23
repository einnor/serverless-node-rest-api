import { APIGatewayEvent, Context, Callback, Handler } from 'aws-lambda';
import { UpdateEvent } from '../types';
import { updateItem } from '../lib/DynamoDB';

export const update: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  if (!event.pathParameters) {
    callback(new Error('Invalid path parameters'));
    return;
  }

  const { pathParameters } = event;
  if (typeof pathParameters.id !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Validation Failed. Couldn\'t update the item.'));
    return;
  }

  if (!event.body) {
    callback(new Error('Invalid body'));
    return;
  }

  const data: UpdateEvent = JSON.parse(event.body);
  if (typeof data.name !== 'string' || typeof data.breed !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Validation Failed. Couldn\'t update the item.'));
    return;
  }

  updateItem(pathParameters.id, data, callback);
};
