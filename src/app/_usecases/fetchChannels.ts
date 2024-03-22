import { Channel } from '@/domains/streams';
import { cache } from 'react';
import { twitchClient, youtubeClient } from '../_clients';
import Config from '@/app/config';

const Teams = Config.teams;

export type FetchChannelsResult = {
    name: string,
    players: Channel[]
}[]

export const fetchChannels = cache(async (): Promise<FetchChannelsResult> => {
    const twitchUsernames = Teams.flatMap(team => team.players.filter(player => player.platform === 'twitch').map(player => player.username));
    const youtubeUsernames = Teams.flatMap(team => team.players.filter(player => player.platform === 'youtube').map(player => player.username));

    const twitchChannels = await twitchClient.listChannels(twitchUsernames);
    const youtubeChannels = await youtubeClient.listChannels(youtubeUsernames);

    const channels = [... twitchChannels, ... youtubeChannels];

    return Teams.map(team => ({
        name: team.name,
        players: team.players.map(
            player => channels.find(
                c => c.platform === player.platform && c.username === player.username
            )
        ).filter((player): player is Channel => Boolean(player))
    }))
});
