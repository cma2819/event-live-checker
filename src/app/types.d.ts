import { Teams } from '@/domains/teams';

export type AppConfig = {
    event: {
        name: string;
    };
    teams: Teams;
}