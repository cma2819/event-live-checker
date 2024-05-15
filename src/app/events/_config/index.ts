import { EventConfig } from './types';
import katfl from './katfl-true-ed-2024';

const events: Record<string, EventConfig> = {
    'katfl-true-ed-2024': katfl
} as const; 

export default events;