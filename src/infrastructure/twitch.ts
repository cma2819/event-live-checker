import { StreamPlatformClient } from '@/domains/streams';
import { ApiClient } from '@twurple/api';
import { AppTokenAuthProvider } from '@twurple/auth';

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