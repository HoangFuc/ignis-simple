import { Configuration } from '@/models/entities/configuration.model';
import { ConfigurationRepository } from '@/repositories/configuration.repository';
import {
  BindingKeys,
  BindingNamespaces,
  controller,
  ControllerFactory,
  inject,
} from '@venizia/ignis';

const BASE_PATH = '/configuration';

const _Controller = ControllerFactory.defineCrudController({
  repository: { name: ConfigurationRepository.name },
  controller: {
    name: 'ConfigurationController',
    basePath: BASE_PATH,
  },
  entity: () => Configuration,
});

@controller({ path: BASE_PATH })
export class ConfigurationController extends _Controller {
  constructor(
    @inject({
      key: BindingKeys.build({
        namespace: BindingNamespaces.REPOSITORY,
        key: ConfigurationRepository.name,
      }),
    })
    repository: ConfigurationRepository,
  ) {
    super(repository);
  }
}
