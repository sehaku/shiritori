import { Typography } from '@material-ui/core';
import React from 'react';
type Props = {
    searchIdx: number
    displayType:string
}
const WordIdxDescription = (props: Props) => {
    const displayType = props.displayType === 'flex' ? 'block': 'none'
    return (
        <>
            <Typography style={{ marginBottom: '1em', marginTop: '1em',display:displayType }} variant="h6" color="inherit" align='center' >
                { props.searchIdx.toString()}手前のワード
            </Typography>
        </>
        )
}
export default WordIdxDescription;
