import { APIGatewayEvent, Context, Callback, Handler } from 'aws-lambda';
import { getItem } from '../lib/DynamoDB';

export const get: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  if (!event.pathParameters) {
    callback(new Error('Invalid path parameters'));
    return;
  }

  const { pathParameters } = event;
  if (typeof pathParameters.id !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Validation Failed. Couldn\'t get the pet item.'));
    return;
  }

  getItem(pathParameters.id, callback);
};
