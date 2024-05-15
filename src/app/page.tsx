import { Container } from '@mui/material';
import events from './events/_config';
import Link from 'next/link';

export default async function Home() {
  const eventProfiles = Object.values(events).map(config => config.event);

  return (
    <main>
      <Container>
        <ul>
          { eventProfiles.map(p => (
            <Link key={p.slug} href={`/events/${p.slug}`}>{ p.name }</Link>
          ))}
        </ul>
      </Container>
    </main>
  );
}
