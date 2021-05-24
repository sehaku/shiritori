import React, { useState } from 'react';
import WordsData from '../words.json';
import Word from './Word';
import { List, WindowScroller, AutoSizer, Grid } from "react-virtualized";

type Props={
    searchWords: string[][]
    searchType: string
    searchIdx: number
}
const Words = React.memo((props: Props) => {
    // const rowRenderer = (idx: number) => {
    //     const word = displayWords[idx];
    //     const srcUrl = '/imgs/' + word.img;
    //     return(
    //         <Word srcUrl={srcUrl} word={word.word} />)
    // }
    console.log(props.searchWords)
    console.log(props.searchWords.length)
    const idx = props.searchType === 'route' ? Math.min(props.searchIdx, props.searchWords.length) - 1 : 0;
    console.log('val',idx)
    const displayWords = WordsData.filter(data => {
        // console.log(props.searchWords.length)
        const searchWord = props.searchType === 'route' ? data.first : (props.searchType === 'first' ? data.first : data.last)
        if (props.searchWords[idx].length === 0 || props.searchWords[idx].some(v => v === searchWord)) return true;
        else return false;
    })
    return (
        <div style={{ display: 'flex', flexFlow: 'row wrap', justifyContent:'center'}}>
            {/* <AutoSizer>
                {({ height, width }=>(
                <List
                autoHeight
                rowRenderer={({ index }) => {
                    const items = [];
                    for (let i = 0; i < displayWords.length; i++){
                        const srcUrl = '/imgs/' + displayWords[i].img;
                        items.push(<Word srcUrl={srcUrl} word={displayWords[i].word} />)
                    }
                    // const word = displayWords[index];
                    // const srcUrl = '/imgs/' + word.img;
                    return (
                        <>
                            {items}
                        </>
                        // <Word srcUrl={srcUrl} word={word.word} />
                    );
                }}
                // columnCount={displayWords.length}
                // columnWidth={100}
                height={1000}
                // rowCount={list.length}
                rowCount={1}
                rowHeight={190}
                width={props.width}
            />
                ))}
            </AutoSizer> */}

            {displayWords.map((word, index) => {
                const srcUrl = '/imgs/' + word.img;
                const wordColor = word.wordType;
                const wordId = word.id.toString().padStart(3,'0')
                return (
                    <Word srcUrl={srcUrl} word={word.word} wordId={wordId}/>
                )
            })}
      </div>
    );
}
);

export default Words
