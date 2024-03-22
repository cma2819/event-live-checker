import { Channel, Stream } from '@/domains/streams'
import { Card, CardActions, CardContent, CardMedia, Chip, IconButton, Typography } from '@mui/material';
import { Player } from '@/domains/teams';
import { TwitchIcon, YoutubeIcon } from './icons';

type Props = {
    player: Player;
    channel?: Channel;
    stream?: Stream;
}

export const ChannelCard = ({ player, channel, stream }: Props) => {
    return (
        <Card variant='outlined'>
            <CardContent sx={{
                paddingY: 1,
            }}>
                <Typography variant='subtitle1' component='div'>{ player.name }</Typography>
            </CardContent>
            {
                stream && (
                    <>
                        <CardMedia
                            component='img'
                            image={stream.thumbnail.url}
                            alt='thumbnail for stream'
                        />
                        <CardContent>
                            <Typography variant='body2' component='a' href={ stream.url } target='_blank'>
                                { stream.title }
                            </Typography>
                        </CardContent>
                    </>
                )
            }
            {
                channel && (
                    <CardActions disableSpacing>
                        { channel.platform === 'youtube' && (stream ? (
                            <YoutubeIcon url={stream.url} colored />
                        ) : (
                            <YoutubeIcon url={channel.url} />
                        ))}
                        { channel.platform === 'twitch' && (stream ? (
                            <TwitchIcon url={stream.url} colored />
                        ) : (
                            <TwitchIcon url={channel.url} />
                        ))}
                        {
                            stream && (
                                <Chip variant='filled' label='● LIVE' sx={{
                                    color: '#ffffff',
                                    bgcolor: 'red',
                                    marginLeft: 'auto',
                                }}/>
                            )
                        }
                    </CardActions>
                )
            }
            {
                !channel && (
                    <CardContent>
                        <Typography variant='body2'>
                            :(
                        </Typography>
                    </CardContent>
                )
            }
        </Card>
    )
}