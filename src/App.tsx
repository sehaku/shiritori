import React, { useState } from "react";
import {
  Typography,
  Link,
  TextField,
  makeStyles,
  Grid,
  FormControlLabel,
  RadioGroup,
  Radio,
} from "@material-ui/core";
import Header from "./components/Header";
import Words from "./components/Words";
import WordsData from "./words.json";
import { List, WindowScroller } from "react-virtualized";
import WordIdxDescription from "./components/WordIdxDescription";
// import DisplayType from './components/DisplayType';
const useStyles = makeStyles((theme) => ({
  field: {
    width: "60%",
  },
}));
const MAX_WORD_CHARACTERS = 63;

const App = () => {
  const classes = useStyles();
  const [typeValue, setTypeValue] = useState("first");
  const [searchWord, setSearchWord] = useState("");
  const [displayType, setDisplayType] = useState("none");
  const [searchIdx, setSearchIdx] = useState(1);
  const [dummy, setDummy] = useState([[""]]);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTypeValue(event.target.value);
    if (event.target.value === "route") {
      setDisplayType("flex");
    } else {
      setDisplayType("none");
    }
  };
  const handleChangeT = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value.length);

    if (event.target.value.length === 0) {
      setSearchWord("");
      createSearchList("");
    } else if (
      event.target.value[0] !== searchWord &&
      event.target.value[0].match(/[あ-ん]/)
    ) {
      let val = event.target.value[0];
      setSearchWord(val);
      console.log("create", val);
      createSearchList(val);
    } else {
      // pass
    }
  };
  const handleChangeNum = (event: React.ChangeEvent<HTMLInputElement>) => {
    const re = /^[0-9\b]+$/;
    if (event.target.value.length === 0 || !re.test(event.target.value)) {
      setSearchIdx(1);
    } else if (Number(event.target.value) <= 0) {
      setSearchIdx(1);
    } else {
      setSearchIdx(Number(event.target.value));
    }
  };
  const createSearchList = (val: string) => {
    let digDepth = 1;
    let tmp = [[val]];
    while (
      tmp[tmp.length - 1].length !== MAX_WORD_CHARACTERS &&
      digDepth <= 10
    ) {
      const searchWords = tmp[tmp.length - 1];
      let vals: string[] = [];
      WordsData.forEach((v) => {
        if (digDepth % 2 === 0 && searchWords.some((w) => w === v.first)) {
          vals.push(v.last);
        } else if (
          digDepth % 2 === 1 &&
          searchWords.some((w) => w === v.last)
        ) {
          vals.push(v.first);
        } else {

        }
      });
      vals = Array.from(new Set(vals));
      tmp.push(vals);
      console.log(digDepth, vals);
      digDepth += 1;
    }
    setDummy(tmp);
  };
  // const handleOnChange = (option: OptionType) => {
  //   setSelectedOption(option);
  // }
  // console.log(selectedOption?.value);
  return (
    <>
      <WindowScroller>
        {({ width, height, isScrolling, registerChild, scrollTop }) => (
          <>
            <Header />
            <Typography
              variant="h6"
              color="inherit"
              align="center"
              style={{ marginBottom: "1em", marginTop: "1em" }}
            >
              不明な点がございましたら
              <Link href="https://github.com/sehaku/shiritori/issues">
                GitHub
              </Link>
              のIssuesにお問い合わせください
            </Typography>
            <Grid container alignItems="center" justify="center">
              <TextField
                onChange={handleChangeT}
                className={classes.field}
                label="検索(ひらがな1文字)"
                defaultValue={searchWord}
                variant="outlined"
              />
            </Grid>
            <RadioGroup
              name="searchType"
              value={typeValue}
              onChange={handleChange}
              style={{ marginLeft: "20%", marginBottom: "2rem" }}
            >
              <FormControlLabel
                value="first"
                control={<Radio />}
                label="先頭文字検索"
              />
              <FormControlLabel
                value="last"
                control={<Radio />}
                label="末尾文字検索"
              />
              <FormControlLabel
                value="route"
                control={<Radio />}
                label="自分が読みたい先頭文字のルート検索"
              />
            </RadioGroup>
            <Grid
              container
              alignItems="center"
              justify="center"
              style={{ display: displayType }}
            >
              <TextField
                type="number"
                onChange={handleChangeNum}
                className={classes.field}
                label={searchIdx.toString() + "手前のワードを表示"}
                defaultValue={searchIdx}
                variant="outlined"
              />
            </Grid>
            {/* <Select options={options} value={selectedOption} onChange={(value) => {
              if (typeof value != null) {
                setSelectedOption(value)
              }
            }
            } /> */}
            <WordIdxDescription
              searchIdx={searchIdx}
              displayType={displayType}
            />
            <Grid container alignItems="center" justify="center">
              <Words
                searchWords={dummy}
                searchType={typeValue}
                searchIdx={searchIdx}
              />
            </Grid>
          </>
        )}
      </WindowScroller>
    </>
  );
};

export default App;
