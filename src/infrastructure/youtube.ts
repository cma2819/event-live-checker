import { Channel, Stream, StreamPlatformClient } from '@/domains/streams';
import { google } from 'googleapis'

export type YoutubeCredentials = {
    apiKey: string;
}

export const YoutubeClient = ({ apiKey }: YoutubeCredentials): StreamPlatformClient => {
    const youtube = google.youtube({
        version: 'v3',
        auth: apiKey,
    });

    return {
        platform: 'youtube',
        listChannels: async (usernames) => {
            try {
                const results = await Promise.all(usernames.map(username => youtube.channels.list({
                    forHandle: username,
                    part: [
                        'id', 'snippet'
                    ]
                })));
    
                return results.map((result): Channel | undefined => {
                    const [channel] = result.data.items ?? [ undefined ];
                    return channel ? {
                        platform: 'youtube',
                        id: channel.id!,
                        displayName: channel.snippet?.title!,
                        username: channel.snippet?.customUrl!,
                        url: `https://www.youtube.com/${channel.snippet?.customUrl}`,
                    } : undefined;
                }).filter((channel): channel is Channel => {
                    return Boolean(channel);
                });
            } catch {
                return [];
            }
        },
        listLiveStream: async (ids) => {
            try {
                const results = await Promise.all(ids.map(id => youtube.search.list({
                    part: [ 'snippet' ],
                    type: [ 'video' ],
                    eventType: 'live',
                    channelId: id,
                })));
    
                return results.map((result): Stream | undefined => {
                    const [stream] = result.data.items ?? [ undefined ];
                    return stream ? {
                        platform: 'youtube',
                        channelId: stream.snippet?.channelId!,
                        title: stream.snippet?.title!,
                        url: `https://www.youtube.com/watch?v=${stream.id?.videoId}`,
                        thumbnail: {
                            url: stream.snippet?.thumbnails?.default?.url!
                        }
                    } : undefined;
                }).filter((stream): stream is Stream => {
                    return Boolean(stream);
                });
            } catch {
                return [];
            }
        }
    }
}