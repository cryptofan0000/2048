import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core";

import { BoardCellProps, StylesProps } from "./types";
import { getSize } from "../Game/utils";

const useStyles = makeStyles<Theme, StylesProps>(theme => {
  const size = getSize()
  return createStyles({
    root: ({ x, y }) => {
      const width = "(100% - " + (size + 1) + "* 10px) / " + size;
      return {
        position: "absolute",
        top: `calc(${width}  * ${y} + 10px * ${y + 1})`,
        left: `calc(${width} * ${x} + 10px * ${x + 1})`,

        width: `calc(${width})`,
        height: `calc(${width})`,

        backgroundColor: "#dcb",
        borderRadius: 7
      };
    }
  });
});

const BoardCell: React.FC<BoardCellProps> = ({ x, y }) => {
  const classes = useStyles({ x, y });

  return <div className={classes.root} />;
};

export default BoardCell;
