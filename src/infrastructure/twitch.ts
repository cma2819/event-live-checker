import { StreamPlatformClient } from '@/domains/streams';
import { ApiClient } from '@twurple/api';
import { AppTokenAuthProvider } from '@twurple/auth';
import chunk from 'lodash.chunk';

export type TwitchCredentials = {
    clientId: string;
    clientSecret: string;
}

export const TwitchClient = ({ clientId, clientSecret }: TwitchCredentials): StreamPlatformClient => {
    const apiClient = new ApiClient({
        authProvider: new AppTokenAuthProvider(clientId, clientSecret)
    });

    return {
        platform: 'twitch',
        listChannels: async (usernames) => {
            const chunked = chunk(usernames, 100);
            const users = (await Promise.all(chunked.map(names => apiClient.users.getUsersByNames(names)))).flat();

            return users.map(user => ({
                platform: 'twitch',
                id: user.id,
                username: user.name,
                displayName: user.displayName,
                url: `https://twitch.tv/${user.name}`,
            }))
        },
        listLiveStream: async (ids) => {
            const request = await apiClient.streams.getStreamsPaginated({userId: ids, type: 'live'});

            return (await request.getAll()).map(stream => ({
                platform: 'twitch',
                channelId: stream.userId,
                title: stream.title,
                thumbnail: {
                    url: stream.thumbnailUrl.replace('{width}x{height}', '320x180'),
                },
                url: `https://twitch.tv/${stream.userName}`,
            }))
        }
    }
}