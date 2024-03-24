import { Platform } from './streams';

export type Player = {
    name: string;
    platform: Platform;
    username: string;
}

export type Teams = {
    name: string;
    players: Player[];
}[];

export const Twitch = (name: string, username: string): Player => ({
    platform: 'twitch',
    name,
    username: username.toLowerCase(),
});

export const Youtube = (name: string, username: string): Player => ({
    platform: 'youtube',
    name,
    username: username.toLowerCase(),
});