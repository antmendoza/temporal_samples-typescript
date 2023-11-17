// @@@SNIPSTART typescript-hello-activity
import { ApplicationFailure } from '@temporalio/workflow';
import { Context } from '@temporalio/activity';

export async function sendEmail(userId: string, number: number): Promise<string> {
  console.log('sending reminder...' + number);

  if (number % 5 == 0) {
    if (Context.current().info.attempt < 2) {
      // throw ApplicationFailure.create({message: 'Simulating external API is down'});
    }
  }

  return `Hello, ${userId}!`;
}
// @@@SNIPEND
