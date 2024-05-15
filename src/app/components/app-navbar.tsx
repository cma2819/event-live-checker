'use client';

import { AppBar, Typography, Toolbar, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { usePathname } from 'next/navigation';
import events from '../events/_config';

export const AppNavbar = async () => {
    const pathname = usePathname();
  
    let eventName;
    if (pathname.startsWith('/events')) {
        const [_, __, slug] = pathname.split('/');
        eventName = slug in events ? (await events[slug]).default.event.name : '';
    }

    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{
                    textAlign: 'center',
                    flexGrow: 1,
                }}>Event Live Checker{ eventName ? ` - ${eventName}` : ''}</Typography>
                <IconButton aria-label='github' href='https://github.com/cma2819/event-live-checker'>
                    <FontAwesomeIcon icon={faGithub} />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}