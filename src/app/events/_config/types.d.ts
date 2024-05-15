import { Teams } from '@/domains/teams';

export type EventConfig = {
    event: {
        name: string;
        slug: string;
    };
    teams: Teams;
}