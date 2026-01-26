import * as migration_20251207_174832 from './20251207_174832';
import * as migration_20251216_201335 from './20251216_201335';
import * as migration_20260126_205633 from './20260126_205633';

export const migrations = [
  {
    up: migration_20251207_174832.up,
    down: migration_20251207_174832.down,
    name: '20251207_174832',
  },
  {
    up: migration_20251216_201335.up,
    down: migration_20251216_201335.down,
    name: '20251216_201335',
  },
  {
    up: migration_20260126_205633.up,
    down: migration_20260126_205633.down,
    name: '20260126_205633'
  },
];
