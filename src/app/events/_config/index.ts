import { EventConfig } from './types';
import crash2 from './crash2-2026';

const events: Record<string, EventConfig> = {
    'crash2-2026': crash2,
} as const;

export default events;