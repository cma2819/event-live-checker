import { EventConfig } from './types';

const events: Record<string, Promise<{ default: EventConfig }>> = {
    'katfl-true-ed-2024': import('./katfl-true-ed-2024')
} as const; 

export default events;