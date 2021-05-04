import React, { useState } from 'react';
import { Typography, CardHeader, IconButton, Toolbar, AppBar, Link, TextField, makeStyles, Paper, Grid, Checkbox, FormGroup, FormControlLabel, RadioGroup, Radio, CardActionArea, Card, CardMedia, CardContent, CardActions, Button } from '@material-ui/core';
import { isClassExpression } from 'typescript';
import green from '@material-ui/core/colors/green';
import Header from './components/Header'
import Words from './components/Words'
import { List, WindowScroller } from "react-virtualized";
import DisplayType from './components/DisplayType';

const useStyles = makeStyles((theme) => ({
  field: {
    width: "60%",
  },
}));
const App = () => {
  const classes = useStyles();
  const [typeValue, setTypeValue] = useState('first');
  const [searchWord, setSearchWord] = useState('');
  const [displayType, setDisplayType] = useState('none');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeValue(event.target.value);
    if (event.target.value === 'route') {
      setDisplayType('flex');
    } else {
      setDisplayType('none');
    }
  };
  const handleChangeT = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value.length)
    if (event.target.value.length === 0){
      setSearchWord('');
    }
    else if (event.target.value[0] !== searchWord && event.target.value[0].match( /[あ-ん]/ )) {
      console.log(event.target.value[0]);
      setSearchWord(event.target.value[0]);
    }
  }
  return (
    <>
      <WindowScroller>
        {({ width, height, isScrolling, registerChild, scrollTop }) =>
          <>
            <Header />
            <Typography variant="h6" color="inherit" align='center' style={{marginBottom:'1em',marginTop:'1em'}} >
                不明な点がございましたら<Link href="https://twitter.com/sehakubroadcast" >twitter</Link>のDMにお問い合わせください
            </Typography>
            <Grid container alignItems="center" justify="center">
              <TextField onChange={handleChangeT} className={classes.field} label="検索(ひらがな1文字)" defaultValue={searchWord} variant="outlined" />
            </Grid>
            <RadioGroup name="searchType" value={typeValue} onChange={handleChange} style={{marginLeft:'20%', marginBottom: '2rem'}}>
              <FormControlLabel value="first" control={<Radio />} label="先頭文字検索" />
              <FormControlLabel value="last" control={<Radio />} label="末尾文字検索" />
              <FormControlLabel value="route" control={<Radio />} label="自分が読みたい先頭文字のルート検索" />
            </RadioGroup>
            <Grid container alignItems="center" justify="center">
              <DisplayType searchWord={searchWord} displayType={typeValue} />
            </Grid>
          </>
        }
        </WindowScroller>
    </>
  )

}

export default App;
