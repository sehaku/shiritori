import React from 'react';
import { Grid } from  '@material-ui/core';
import Words from './Words'

type Props = {
    displayType: string
    searchWord: string
}
const DisplayType = (props:Props) => {
    switch (props.displayType) {
        case 'route':
            return (
                    <Grid container alignItems="center" justify="center">
                        <p>直前のクロエのワード</p>
                        <Words searchWord={props.searchWord} searchType='last'/>
                        <Words searchWord={props.searchWord} searchType='first' />
                    </Grid>
            );
        default:
            return (
                    <Grid container alignItems="center" justify="center">
                        <Words searchWord={props.searchWord} searchType={props.displayType} />
                    </Grid>
            );
    }
};
export default DisplayType;
