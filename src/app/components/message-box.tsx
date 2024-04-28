import { Card, CardContent, Typography } from '@mui/material'

export const MessageBox = () => {
    return (
        <Card sx={{
            marginY: 2
        }}>
            <CardContent>
                <Typography variant='h5' component='div'>
                    K-STAR 2024 is Over!
                </Typography>
                <Typography variant='body1' component='div'>
                    本ページは数日後、 <a href='https://cmario.net' target='_blank'>cmario.net</a> にリダイレクトされます。
                </Typography>
                <Typography variant='body1' component='div'>
                    This URL will be redirected to <a href='https://cmario.net' target='_blank'>cmario.net</a> a few days later.
                </Typography>
            </CardContent>
        </Card>
    )
}