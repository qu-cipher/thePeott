import * as toml from 'toml';
import * as fs from 'fs';
import Config from './Config';

class ConfigLoader {
  private config: Config;

  constructor(configPath: string) {
    const fileContents = fs.readFileSync(configPath, 'utf-8');
    this.config = toml.parse(fileContents);
  }

  get(key?: string): Config | any {
    if (!key) return this.config;
    return key.split('.').reduce((o, i) => o[i], this.config);
  }
}

const sample = new ConfigLoader('../config/config.toml');
export {ConfigLoader, sample};