import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@material-ui/core';
import React from 'react';
import WordsData from '../words.json';
type Props={
    searchWord: string
    searchType: string
}
const wordsData = WordsData
const Words = React.memo((props: Props) => {
    const displayWords = wordsData.filter(data => {
        const wordType = props.searchType === 'route' ? data.first : (props.searchType === 'first' ? data.first : data.last)
        if (props.searchWord === '' || props.searchWord === wordType) return true;
        else return false;
    })
    return (
        <div style={{ display:'flex',flexFlow: 'row wrap',justifyContent:'center'}}>
            {displayWords.map((word, index) => {
            const srcUrl = '/imgs/' + word.img
            const wordColor = word.wordType
            return (
                <Card style={{ maxWidth: 90, marginLeft:'1rem', marginRight:'1rem', marginBottom:'1rem'}}>
                <CardActionArea>
                    <CardMedia
                    component='img'
                    src={srcUrl}
                    />
                    <CardContent>
                        <Typography align='center' style={{fontSize: '1em'}}>
                            {word.word}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                </Card>
            )
            })}
      </div>
    );
}
);

export default Words
