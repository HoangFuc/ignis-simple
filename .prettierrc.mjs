import { prettierConfigs } from "@venizia/dev-configs";

const customConfigs = {
  singleQuote: true,
};

Object.assign(prettierConfigs, customConfigs);

export default prettierConfigs;