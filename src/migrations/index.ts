import * as migration_20251207_174832 from './20251207_174832';
import * as migration_20251216_201335 from './20251216_201335';

export const migrations = [
  {
    up: migration_20251207_174832.up,
    down: migration_20251207_174832.down,
    name: '20251207_174832',
  },
  {
    up: migration_20251216_201335.up,
    down: migration_20251216_201335.down,
    name: '20251216_201335'
  },
];
