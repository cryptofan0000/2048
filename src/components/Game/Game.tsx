import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core";
import MuiGrid from "@material-ui/core/Grid";

import Board from "../Board";
import { Cell, CellNew, CellMove, CellMerge } from "../Cell";

import NewGameButton from "./NewGameButton";
import ReturnButton from "./ReturnButton";
import Header from "./Header";
import DoneCover from "./DoneCover";

import useGame from "./useGame";
import useSlide from "../../hooks/useSlide";

import { getSize } from "./utils";

const useStyles = makeStyles<Theme>(theme => {
  const headerWidth = getSize() * 110 + 10
  return createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      minHeight: "100vh",

      [theme.breakpoints.down("xs")]: {
        minHeight: "0px"
      },

      "& > div": {
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
      }
    },
    controller: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%"
    },
    headerarea: {
      width: headerWidth + "px",
      marginLeft: "calc((100% - " + headerWidth + "px) / 2)",
      
      [theme.breakpoints.down("xs")]: {
        width: "65vw",
        marginLeft: "17.5vw"
      },
    },
    headerGrid: {
      display: "flex",
      justify: "space-between",
      flexWrap: "wrap",
      alignItems: "center",
      width: "100%",
      marginBottom: "10px"
    }
  });
});

const Game = (props) => {
  const {
    grid,
    score,
    bestScore,
    step,
    isDone,
    changing,
    onNewGame,
    slideTo,
  } = useGame();
  const classes = useStyles({});

  document.onkeydown = function(evt){
    let keyPressed;
    evt.preventDefault();
    keyPressed = evt.key;

    if(keyPressed == "ArrowUp") {
      const diffX = -1, diffY = -2;
      slideTo(diffX, diffY);
    }
    if(keyPressed == "ArrowDown") {
      const diffX = 0, diffY = 2;
      slideTo(diffX, diffY);
    }
    if(keyPressed == "ArrowRight") {
      const diffX = 2, diffY = 1;
      slideTo(diffX, diffY);
    }
    if(keyPressed == "ArrowLeft") {
      const diffX = -2, diffY = -1;
      slideTo(diffX, diffY);
    }
  }
  const slideHandlers = useSlide(slideTo, changing);
  const onReturnGame = () => {
    props.onStartGame(0)
  }

  return (
    <>
    <div className={classes.headerarea}>
      <Header step={step} score={score} bestScore={bestScore} />
      <div className={classes.headerGrid}>
        <MuiGrid container justify="flex-end" spacing={4} wrap="nowrap">
          <MuiGrid item>
            <ReturnButton onReturnGame={onReturnGame} />
          </MuiGrid>
          <MuiGrid item>
            <NewGameButton onNewGame={onNewGame} />
          </MuiGrid>
        </MuiGrid>
      </div>
    </div>

    <div className={classes.root} {...slideHandlers}>
      <div>
        <div>
          <Board {...slideHandlers}>
            {grid !== null &&
              grid.map(row => {
                return row.map(cell => {
                  if (cell === null) return null;
                  // stay:  from === null && to === null
                  // new:   from === null && to !== null
                  // move:  from !== null && to === null
                  // merge: from !== null && to !== null
                  const { id, from, to, final } = cell;
                  const key = `grid-cell-${final.x}-${final.y}-${
                    final.value
                  }-${id}`;
                  // new
                  if (from === null && to !== null) {
                    return <CellNew key={key} final={final} />;
                  }
                  // move
                  if (from !== null && to === null) {
                    return <CellMove key={key} from={from} final={final} />;
                  }
                  // merge
                  if (from !== null && to !== null) {
                    return (
                      <CellMerge key={key} from={from} to={to} final={final} />
                    );
                  }
                  // stay
                  return <Cell key={key} {...final} />;
                });
              })}
            <DoneCover isDone={isDone} />
          </Board>
        </div>      
      </div>
    </div>
    </>
  );
};

export default Game;
