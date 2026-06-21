import { Channel } from '@/domains/streams';
import { Teams } from '@/domains/teams';

export type FetchChannelsResult = {
    name: string,
    players: Channel[]
}[]

export const fetchChannels = (teams: Teams): FetchChannelsResult => {
    return teams.map(team => ({
        name: team.name,
        players: team.players.map(player => ({
            platform: player.platform,
            id: player.channelId,
            username: player.username,
            displayName: player.name,
            url: player.platform === 'twitch'
                ? `https://twitch.tv/${player.username}`
                : `https://www.youtube.com/${player.username}`,
        })),
    }));
};
