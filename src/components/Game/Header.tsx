import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core";

import MuiTypography from "@material-ui/core/Typography";
import MuiGrid from "@material-ui/core/Grid";
import MuiLink from "@material-ui/core/Link";

const useStyles = makeStyles<Theme>(theme => {
  return createStyles({
    root: {
      display: "flex",
      justify: "space-between",
      alignItems: "center",
      flexWrap: "wrap"
    },
    header: {
      marginBottom: theme.spacing(2)
    },
    block: {
      minWidth: 64,
      padding: 8,
      backgroundColor: "#bcaaa4",
      borderRadius: 4,

      display: "flex",
      flexDirection: "column",
      justify: "center",
      alignItems: "center",

      "& > span": {
        color: "#efebe9"
      },
      "& > h6": {
        color: "white"
      },

      [theme.breakpoints.down("xs")]: {
        padding: 3,
        "& > span": {
          fontSize: "10px"
        },
        "& > h6": {
          fontSize: "12px"
        },
      }
    },
    headerGrid: {
      display: "flex",
      justify: "space-between",
      flexWrap: "wrap",
      alignItems: "center",
      width: "100%",
      marginBottom: "10px"
    },
    logo: {
      [theme.breakpoints.down("xs")]: {
        fontSize: "20px"
      }
    }
  });
});

interface HeaderProps {
  step: number;
  score: number;
  bestScore: number;
}
const Header: React.FC<HeaderProps> = ({ step, score, bestScore }) => {
  const classes = useStyles({});

  const Block = React.memo(
    ({ title, value }: { title: string; value: number }) => {
      return (
        <div className={classes.block}>
          <MuiTypography variant="caption">{title}</MuiTypography>
          <MuiTypography variant="h6">{value}</MuiTypography>
        </div>
      );
    }
  );

  return (
    <div className={classes.headerGrid}>
      <MuiGrid container justify="flex-start" spacing={2} wrap="nowrap">
        <MuiGrid item>
          <MuiTypography className={classes.logo} variant="h3">
            2048
          </MuiTypography>
        </MuiGrid>
        <MuiGrid container justify="flex-end" spacing={2} wrap="nowrap">
          <MuiGrid item>
            <Block title="SCORE" value={score} />
          </MuiGrid>
          <MuiGrid item>
            <Block title="HIGH SCORE" value={bestScore} />
          </MuiGrid>
        </MuiGrid>
      </MuiGrid>
    </div>
  );
};

export default React.memo(Header);
