import Logger from 'js-logger';

Logger.useDefaults();

Logger.setHandler(function (messages, context) {
  console.log(messages, context);
  // Send messages to a custom logging endpoint for analysis.
  // TODO: Add some security? (nah, you worry too much! :P)
  // jQuery.post('/logs', { message: messages[0], level: context.level });
});

export { Logger as Log };