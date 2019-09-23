import { APIGatewayEvent, Context, Callback, Handler } from 'aws-lambda';
import { deleteItem } from '../lib/DynamoDB';

export const remove: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  if (!event.pathParameters) {
    callback(new Error('Invalid path parameters'));
    return;
  }

  const { pathParameters } = event;
  if (typeof pathParameters.id !== 'string') {
    console.error('Validation Failed');
    callback(new Error('Validation Failed. Couldn\'t delete the item.'));
    return;
  }

  deleteItem(pathParameters.id, callback);
};
