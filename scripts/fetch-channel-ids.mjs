// 実行: node --env-file=.env.local scripts/fetch-channel-ids.mjs < players.txt
//
// players.txt の形式 (タブ区切り):
//   名前\thttps://www.twitch.tv/username
//   名前\thttps://www.youtube.com/@handle
import { ApiClient } from '@twurple/api';
import { AppTokenAuthProvider } from '@twurple/auth';
import { google } from 'googleapis';
import { createInterface } from 'readline';

const parsePlayer = (name, url) => {
    const { hostname, pathname } = new URL(url);
    const segment = pathname.replace(/\/$/, '').split('/').pop();
    if (hostname === 'www.twitch.tv') {
        return { name, platform: 'twitch', username: segment.toLowerCase() };
    }
    if (hostname === 'www.youtube.com') {
        return { name, platform: 'youtube', username: segment };
    }
    throw new Error(`未対応のURL: ${url}`);
};

const lines = await new Promise(resolve => {
    const rl = createInterface({ input: process.stdin });
    const result = [];
    rl.on('line', line => { if (line.trim()) result.push(line); });
    rl.on('close', () => resolve(result));
});

const players = lines.map(line => {
    const [name, url] = line.split('\t');
    return parsePlayer(name.trim(), url.trim());
});

// ── Twitch ──────────────────────────────────────────────
const twitchPlayers = players.filter(p => p.platform === 'twitch');
if (twitchPlayers.length > 0) {
    const auth = new AppTokenAuthProvider(
        process.env.TWITCH_CLIENT_ID,
        process.env.TWITCH_CLIENT_SECRET,
    );
    const api = new ApiClient({ authProvider: auth });
    const users = await api.users.getUsersByNames(twitchPlayers.map(p => p.username));
    const idMap = Object.fromEntries(users.map(u => [u.name, u.id]));

    console.log('// Twitch');
    for (const player of twitchPlayers) {
        const id = idMap[player.username] ?? '(not found)';
        console.log(`Twitch('${player.name}', '${player.username}', '${id}'),`);
    }
}

// ── YouTube ─────────────────────────────────────────────
// YouTube API はハンドルの一括取得ができないため 1件ずつ呼ぶ
// クォータ消費: channels.list 1回 = 1ユニット
const youtubePlayers = players.filter(p => p.platform === 'youtube');
if (youtubePlayers.length > 0) {
    const youtube = google.youtube({ version: 'v3', auth: process.env.YOUTUBE_API_KEY });
    const results = await Promise.all(
        youtubePlayers.map(p =>
            youtube.channels.list({ forHandle: p.username, part: ['id'] })
        )
    );

    console.log('\n// YouTube');
    for (let i = 0; i < youtubePlayers.length; i++) {
        const player = youtubePlayers[i];
        const id = results[i].data.items?.[0]?.id ?? '(not found)';
        console.log(`Youtube('${player.name}', '${player.username}', '${id}'),`);
    }
}
