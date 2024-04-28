import { Container } from '@mui/material';
import { fetchChannels } from './_usecases';
import config from './config';
import { featLives } from './_usecases/featLives';
import { ChannelList } from './components/channel-list';
import { MessageBox } from './components/message-box';

export const revalidate = 300;

export default async function Home() {
  const teams = config.teams;
  const channels = await fetchChannels();
  const lives = await featLives(channels.flatMap(channel => channel.players.map(player => ({
      channelId: player.id,
      platform: player.platform,
  }))));

  return (
    <main>
      <Container>
        <MessageBox />
        <ChannelList teams={teams} channels={channels} lives={lives} />
      </Container>
    </main>
  );
}
