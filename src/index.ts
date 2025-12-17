import { LoggerFactory } from '@venizia/ignis';
import { Application, appConfigs } from './application';

const logger = LoggerFactory.getLogger(['main']);

const main = async () => {
  const application = new Application({
    scope: 'MyApp',
    config: appConfigs,
  });

  const applicationName = process.env.APP_ENV_APPLICATION_NAME?.toUpperCase() ?? 'My-App';
  logger.info('[main] Getting ready to start up %s Application...', applicationName);
  await application.start();
  return application;
};

export default main();
