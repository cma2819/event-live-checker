'use client';

import { Checkbox, FormControlLabel, FormGroup, Grid, Paper, Stack, Typography } from '@mui/material';
import { ChannelCard } from './channel-card';
import { red, green, blue, purple, yellow } from '@mui/material/colors';
import { useState } from 'react';
import { Player, Teams } from '@/domains/teams';
import { Channel, Stream } from '@/domains/streams';
import { FetchChannelsResult } from '../_usecases';
import { FeatLivesResult } from '../_usecases/featLives';

type Props = {
    teams: Teams;
    channels: FetchChannelsResult;
    lives: FeatLivesResult;
}

export const ChannelList = ({ teams, channels, lives }: Props) => {
    
    const teamColors = [
        red[200],
        green[200],
        blue[200],
        purple[200],
        yellow[200],
    ];

    const pickChannel = (player: Player): Channel | undefined => {
        return channels.flatMap(channel => channel.players).find(channel => channel.platform === player.platform && channel.username === player.username);
    }

    const pickLive = (channel: Channel): Stream | undefined => {
        return lives.find(live => live.platform === channel.platform && live.channelId === channel.id);
    }

    const [ onlyLive, setOnlyLive ] = useState<boolean>(true);
    
    const [ showTwitch, setShowTwitch ] = useState<boolean>(true);
    const [ showYoutube, setShowYoutube ] = useState<boolean>(true);

    const filterChannel = (player: Player, live?: Stream): boolean => {
        return Boolean(
            (onlyLive ? live : true)
            && (
                (player.platform === 'twitch' && showTwitch)
                || (player.platform === 'youtube' && showYoutube)
            )
        );
    }

    return (
        <Grid container columns={15} spacing={2} sx={{
            marginTop: 0,
        }}>
            <Grid item xs={15}>
                <Paper sx={{
                    p: 2,
                }}>
                    <Stack spacing={2}>
                        <FormGroup row>
                            <FormControlLabel control={<Checkbox defaultChecked value={onlyLive} onChange={(e) => { setOnlyLive(e.target.checked) }} />} label="Live channel" />
                        </FormGroup>
                        <FormGroup row>
                            <FormControlLabel control={<Checkbox defaultChecked value={showTwitch} onChange={(e) => { setShowTwitch(e.target.checked) }} />} label="Twitch" />
                            <FormControlLabel control={<Checkbox defaultChecked value={showYoutube} onChange={(e) => { setShowYoutube(e.target.checked) }} />} label="Youtube" />
                        </FormGroup>
                    </Stack>
                </Paper>
            </Grid>
            { teams.map(({ name, players }, tIndex) => (
                <Grid key={tIndex} item xs={15} md={5} lg={3}>
                    <Stack spacing={2}>
                        <Paper variant='outlined' sx={{
                            bgcolor: teamColors[tIndex],
                            p: 2,
                        }}>
                            <Typography variant='h5'>
                            { name }
                            </Typography>
                        </Paper>
                        {
                            players.map((player, pIndex) => {
                                const channel = pickChannel(player);
                                const live = channel && pickLive(channel);
                                return filterChannel(player, live) && <ChannelCard key={`${tIndex}_${pIndex}`} channel={channel} player={player} stream={live} />
                            })
                        }
                    </Stack>
                </Grid>
            ))}
        </Grid>
    )
}