import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core";

import BoardCell from "../BoardCell";
import useGame from "../Game/useGame";
import { getSize } from "../Game/utils";

const useStyles = makeStyles<Theme>(theme => {
  const l = getSize() * 110 + 10
  return createStyles({
    root: {
      position: "relative",
      width: l + "px",
      maxWidth: 640,
      height: l + "px",
      maxHeight: 640,
      
      [theme.breakpoints.down("xs")]: {
        width: "65vw",
        height: "65vw"
      },

      backgroundColor: "#baa",
      borderRadius: 7
    }
  });
});

interface MouseEventHandler {
  (event: React.MouseEvent<HTMLDivElement, MouseEvent>): void;
}
interface TouchEventHandler {
  (event: React.TouchEvent<HTMLDivElement>): void;
}

interface BoardProps {
  onMouseDown?: null | MouseEventHandler;
  onMouseUp?: null | MouseEventHandler;
  onMouseLeave?: null | MouseEventHandler;
  onTouchStart?: null | TouchEventHandler;
  onTouchEnd?: null | TouchEventHandler;
}

const Board: React.FC<BoardProps> = ({ children, ...slideHandlers }) => {
  const classes = useStyles({});
  const game_size = getSize()
  const cells: any[][] = Array(game_size).fill(Array(game_size).fill(null));

  return (
    <div className={classes.root} {...slideHandlers} tabIndex={0} id="boardroot">
      {cells.map((row, x) => {
        return row.map((cell, y) => {
          return <BoardCell key={`board-cell-${x}-${y}`} x={x} y={y} />;
        });
      })}
      {children}
    </div>
  );
};

export default Board;
