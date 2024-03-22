import { fetchChannels } from '../_usecases';
import { featLives } from '../_usecases/featLives';

export const revalidate = 60;

export default async function Page() {
    const channels = await fetchChannels();
    const lives = await featLives(channels.flatMap(channel => channel.players.map(player => ({
        channelId: player.id,
        platform: player.platform,
    }))))

    return (
        <>
        {JSON.stringify(channels)};
        </>
    );
}