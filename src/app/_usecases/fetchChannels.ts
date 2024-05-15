import { Channel } from '@/domains/streams';
import { cache } from 'react';
import { twitchClient, youtubeClient } from '../_clients';
import { Teams } from '@/domains/teams';

export type FetchChannelsResult = {
    name: string,
    players: Channel[]
}[]

export const fetchChannels = cache(async (teams: Teams): Promise<FetchChannelsResult> => {
    const twitchUsernames = teams.flatMap(team => team.players.filter(player => player.platform === 'twitch').map(player => player.username));
    const youtubeUsernames = teams.flatMap(team => team.players.filter(player => player.platform === 'youtube').map(player => player.username));

    const twitchChannels = await twitchClient.listChannels(twitchUsernames);
    const youtubeChannels = await youtubeClient.listChannels(youtubeUsernames);

    const channels = [... twitchChannels, ... youtubeChannels];

    return teams.map(team => ({
        name: team.name,
        players: team.players.map(
            player => channels.find(
                c => c.platform === player.platform && c.username === player.username
            )
        ).filter((player): player is Channel => Boolean(player))
    }))
});
