import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
type Props = {
    isDisplay: boolean
    id: string
    srcUrl: string
    word: string
    wordId: string
}
const Word = (props:Props) => {
    return (
        <Card id={props.id} style={{ width: 90,height:190, marginRight: 10, marginBottom: '1rem', display: props.isDisplay ? "block" : "none" }}>
            <CardActionArea>
                <CardMedia
                component='img'
                src={props.srcUrl}
                />
                <CardContent>
                    <Typography align='center' style={{fontSize: '1em'}}>
                        No:{props.wordId}
                    </Typography>
                    <Typography align='center' style={{fontSize: '1em'}}>
                        {props.word}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export default Word;
