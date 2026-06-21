import { Platform } from './streams';

export type Player = {
    name: string;
    platform: Platform;
    username: string;
    channelId: string;
}

export type Teams = {
    name: string;
    players: Player[];
}[];

export const Twitch = (name: string, username: string, channelId: string): Player => ({
    platform: 'twitch',
    name,
    username: username.toLowerCase(),
    channelId,
});

export const Youtube = (name: string, username: string, channelId: string): Player => ({
    platform: 'youtube',
    name,
    username: username.toLowerCase(),
    channelId,
});