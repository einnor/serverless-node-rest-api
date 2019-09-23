import { APIGatewayEvent, Context, Callback, Handler } from 'aws-lambda';
import { listItems } from '../lib/DynamoDB';

export const list: Handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
  listItems(callback);
};
