import { config } from './config/config.js';
import { cleanDirSync } from './utils/clean-dir-sync.js';

cleanDirSync(config.dist);
