import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core";

import { CellMoveProps } from "./types";

import Cell from "./Cell";
import { getSize } from "../Game/utils";

let game_size

const useStyles = ({ from, final }: Omit<CellMoveProps, "hideAfterMove">) => {
  return makeStyles<Theme>(theme => {
  const width = "(100% - " + (game_size + 1) + " * 10px) / " + game_size;
    return createStyles({
      "@keyframes move": {
        from: {
          top: `calc(${width}  * ${from.y} + 10px * ${from.y + 1})`,
          left: `calc(${width} * ${from.x} + 10px * ${from.x + 1})`
        },
        to: {
          top: `calc(${width}  * ${final.y} + 10px * ${final.y + 1})`,
          left: `calc(${width} * ${final.x} + 10px * ${final.x + 1})`
        }
      },
      "@keyframes zoomOut": {
        from: { transform: "scale(1)" },
        to: { transform: "scale(0)" }
      },
      move: {
        animationFillMode: "forwards",
        animationTimingFunction: "cubic-bezier(0.25, 0, 0.5, 1)",
        animationName: "$move",
        animationDelay: "0s",
        animationDuration: "0.1s"
      },
      moveAndHide: {
        animationFillMode: "forwards",
        animationTimingFunction: "cubic-bezier(0.25, 0, 0.5, 1)",
        animationName: "$move, $zoomOut",
        animationDelay: "0s, 0.1s",
        animationDuration: "0.1s, 0.1s"
      }
    });
  });
};

const CellMove: React.FC<CellMoveProps> = ({
  from,
  final,
  hideAfterMove = false
}) => {
  game_size = getSize()
  const classes = useStyles({ from, final })({});

  return (
    <Cell
      className={hideAfterMove ? classes.moveAndHide : classes.move}
      x={final.x}
      y={final.y}
      value={final.value}
    />
  );
};

export default CellMove;
