import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
type Props = {
    srcUrl: string
    word: string
}
const Word = (props:Props) => {
    return (
        <Card style={{ width: 90,height:190, marginLeft: '1rem', marginRight: '1rem', marginBottom: '1rem' }}>
            <CardActionArea>
                <CardMedia
                component='img'
                src={props.srcUrl}
                />
                <CardContent>
                    <Typography align='center' style={{fontSize: '1em'}}>
                        {props.word}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Word;
