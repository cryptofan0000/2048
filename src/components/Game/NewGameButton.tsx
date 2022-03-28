import * as React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import createStyles from "@material-ui/core/styles/createStyles";
import { Theme } from "@material-ui/core";

import { HiOutlineRefresh } from 'react-icons/hi';

const useStyles = makeStyles<Theme>(theme => {
  return createStyles({
    NewGameBTN: {
      width: "50px",
      height: "50px",
      border: "none",
      fontSize: "40px",
      backgroundColor: "#bcaaa4",
      borderRadius: "5px",
      color: "#fff",
      paddingTop: "4px",

      [theme.breakpoints.down("xs")]: {
        width: "30px",
        height: "30px",
        fontSize: "20px",
      }
    }
  });
});

interface NewGameButtonProps {
  onNewGame: () => void;
}
const NewGameButton: React.FC<NewGameButtonProps> = ({ onNewGame }) => {
  const classes = useStyles({});

  return (
    <button onClick={onNewGame} className={classes.NewGameBTN}>
      <HiOutlineRefresh />
    </button>
  );
};

export default React.memo(NewGameButton);
