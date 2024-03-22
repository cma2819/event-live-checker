import { AppBar, Typography, Toolbar, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

type Props = {
    appName: string;
}

export const AppNavbar = ({ appName }: Props) => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6' component='div' sx={{
                    textAlign: 'center',
                    flexGrow: 1,
                }}>{ appName }</Typography>
                <IconButton aria-label='github' href='https://github.com/cma2819/event-live-checker'>
                    <FontAwesomeIcon icon={faGithub} />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}