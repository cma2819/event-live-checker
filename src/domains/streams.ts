export type Platform = 'twitch' | 'youtube'

export type Thumbnail = {
    url: string;
}

export type Channel = {
    id: string;
    platform: Platform;
    username: string;
    displayName: string;
    url: string;
}

export type Stream = {
    platform: Platform;
    title: string;
    url: string;
    thumbnail: Thumbnail;
    channelId: Channel['id'];
}

export type StreamPlatformClient = {
    platform: Platform;
    listChannels: (usernames: Channel['username'][]) => Promise<Channel[]>;
    listLiveStream: (ids: Channel['id'][]) => Promise<Stream[]>;
}