import * as React from "react";
import cx from "classnames";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core";

import { CellProps } from "./types";
import { getSize } from "../Game/utils";

const colors = {
  "color-2": "#766",
  "color-4": "#766",
  "color-8": "#ffe",
  "color-16": "#ffe",
  "color-32": "#ffe",
  "color-64": "#ffe",
  "color-128": "#ffe",
  "color-256": "#ffe",
  "color-512": "#ffe",
  "color-1024": "#fff",
  "color-2048": "#fff",
  "color-4096": "#fff",
  "color-8192": "#fff"
};

const bgcolors = {
  "color-2": "#eee",
  "color-4": "#eec",
  "color-8": "#fb8",
  "color-16": "#f96",
  "color-32": "#f75",
  "color-64": "#f53",
  "color-128": "#ec7",
  "color-256": "#ec6",
  "color-512": "#ec5",
  "color-1024": "#ec3",
  "color-2048": "#ec2",
  "color-4096": "#ec1",
  "color-8192": "#ec0"
};

const fontsize = {
  "color-2": 70,
  "color-4": 70,
  "color-8": 70,
  "color-16": 65,
  "color-32": 65,
  "color-64": 65,
  "color-128": 60,
  "color-256": 60,
  "color-512": 60,
  "color-1024": 50,
  "color-2048": 50,
  "color-4096": 50,
  "color-8192": 50
};

let game_size;

const useStyles = makeStyles<Theme, Omit<CellProps, "className">>(theme => {
  const width = "(100% - " + (game_size + 1) + " * 10px) / " + game_size;
  return createStyles({
    root: ({ x, y, value }) => {
      return {
        position: "absolute",
        top: `calc(${width}  * ${y} + 10px * ${y + 1})`,
        left: `calc(${width} * ${x} + 10px * ${x + 1})`,

        width: `calc(${width})`,
        height: `calc(${width})`,

        backgroundColor: bgcolors[`color-${value}`],
        color: colors[`color-${value}`],
        borderRadius: 7,
        fontFamily: "system-ui",

        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: fontsize[`color-${value}`],
        fontWeight: "bold",

        "& > *": {
          userSelect: "none"
        },

        [theme.breakpoints.down("xs")]: {
          fontSize: fontsize[`color-${value}`] / 3
        }
      };
    }
  });
});

// new:   from === null && to !== null
// move:  from !== null && to === null
// merge: from !== null && to !== null
// stay:  from === null && to === null
const Cell: React.FC<CellProps> = ({ className = "", x, y, value }) => {
  game_size = getSize()
  const classes = useStyles({ x, y, value });

  return (
    <div className={cx(classes.root, className)}>
      <h5>{value}</h5>
    </div>
  );
};

export default Cell;
