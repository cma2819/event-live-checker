import { TwitchClient } from '@/infrastructure/twitch';
import { YoutubeClient } from '@/infrastructure/youtube';

if (!process.env.TWITCH_CLIENT_ID || !process.env.TWITCH_CLIENT_SECRET) {
    throw new Error('Twitch credential is invalid');
}

export const twitchClient = TwitchClient({
    clientId: process.env.TWITCH_CLIENT_ID,
    clientSecret: process.env.TWITCH_CLIENT_SECRET,
});

if (!process.env.YOUTUBE_API_KEY) {
    throw new Error('Youtube credential is invalid');
}

export const youtubeClient = YoutubeClient({
    apiKey: process.env.YOUTUBE_API_KEY,
});