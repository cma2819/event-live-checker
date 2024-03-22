import { faTwitch, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconButton } from '@mui/material';

type Props = {
    url: string;
    colored?: boolean;
}

export const YoutubeIcon = ({ url, colored = false }: Props) => {
    return (
        <IconButton size='small' href={url} target='_blank' color={colored ? 'youtube' : 'inherit'}>
            <FontAwesomeIcon icon={faYoutube} />
        </IconButton>
    )
}

export const TwitchIcon = ({ url, colored = false }: Props) => {
    return (
        <IconButton size='small' href={url} target='_blank' color={colored ? 'twitch' : 'inherit'}>
            <FontAwesomeIcon icon={faTwitch} />
        </IconButton>
    )
}