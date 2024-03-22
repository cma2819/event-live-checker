import { Platform, Stream } from '@/domains/streams';
import { cache } from 'react';
import { twitchClient, youtubeClient } from '../_clients';

export type FeatLivesRequest = {
    platform: Platform;
    channelId: string;
}[];

export type FeatLivesResult = Stream[];

export const featLives = cache(async (request: FeatLivesRequest): Promise<FeatLivesResult> => {
    const twitchIds = request.filter(req => req.platform === 'twitch').map(req => req.channelId);
    const youtubeIds = request.filter(req => req.platform === 'youtube').map(req => req.channelId);

    const twitchLives = await twitchClient.listLiveStream(twitchIds);
    const youtubeLives = await youtubeClient.listLiveStream(youtubeIds);

    return [
        ... twitchLives,
        ... youtubeLives,
    ]
});