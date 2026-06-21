import { Stream, StreamPlatformClient } from '@/domains/streams';
import { google } from 'googleapis'
import Parser from 'rss-parser';

export type YoutubeCredentials = {
    apiKey: string;
}

export const YoutubeClient = ({ apiKey }: YoutubeCredentials): StreamPlatformClient => {
    const youtube = google.youtube({
        version: 'v3',
        auth: apiKey,
    });

    const rssParser: Parser<{}, {'yt:videoId': string}> = new Parser({
        customFields: {
            item: ['yt:videoId']
        }
    });

    const getVideoIdsFromFeed = async (channelId: string): Promise<string[]> => {
        const feed = await rssParser.parseURL(`https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`);

        return feed.items.filter((_, index) => index < 10).map(item => item['yt:videoId']);
    }

    return {
        platform: 'youtube',
        listLiveStream: async (ids) => {
            try {
                const videoIds = (await Promise.all(ids.map(channelId => getVideoIdsFromFeed(channelId)))).flat();

                const videos = await youtube.videos.list({
                    id: videoIds,
                    part: [ 'id', 'snippet' ],
                });

                return videos.data.items?.filter(video => video.snippet?.liveBroadcastContent === 'live').map((video): Stream => {
                    return {
                        platform: 'youtube',
                        channelId: video.snippet?.channelId!,
                        title: video.snippet?.title!,
                        url: `https://www.youtube.com/watch?v=${video.id}`,
                        thumbnail: {
                            url: video.snippet?.thumbnails?.default?.url!
                        }
                    }
                }) ?? [];
            } catch (e) {
                return [];
            }
        }
    }
}