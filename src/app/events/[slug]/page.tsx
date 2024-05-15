import { redirect } from 'next/navigation';
import events from '../_config';
import { fetchChannels } from '@/app/_usecases';
import { featLives } from '@/app/_usecases/featLives';
import { Container } from '@mui/material';
import { MessageBox } from '@/app/components/message-box';
import { ChannelList } from '@/app/components/channel-list';

export const revalidate = 300;

export default async function Page({ params }: { params: { slug: string }}) {
    const slug = params.slug;
    if (!(slug in events)) {
        return redirect('/');
    }

    const config = (await events[slug]).default;
    const teams = config.teams;
    const channels = await fetchChannels(teams);
    const lives = await featLives(channels.flatMap(channel => channel.players.map(player => ({
        channelId: player.id,
        platform: player.platform,
    }))));
  
    return (
      <main>
        <Container>
          <ChannelList teams={teams} channels={channels} lives={lives} />
        </Container>
      </main>
    );
}