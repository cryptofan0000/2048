import React, { useState } from 'react'
import makeStyles from "@material-ui/core/styles/makeStyles"
import createStyles from "@material-ui/core/styles/createStyles"
import { Theme } from "@material-ui/core"
import MuiButton from "@material-ui/core/Button"
import image3 from './image/3.png'
import image4 from './image/4.png'
import image5 from './image/5.png'
import { setSize, getSize } from "../Game/utils"

import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai'

const useStyles = makeStyles<Theme>(theme => {
  const unit = theme.spacing();
  return createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
      minHeight: "100vh",

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
    containedHis: {
      margin: unit * 2,
      marginLeft: "auto",
      backgroundColor: "#f5835f",
      fontSize: 20,
      "&:hover": {
        backgroundColor: "#fb8c00"
      }
    },
    containedLog: {
      margin: unit * 2,
      marginLeft: "auto",
      backgroundColor: "#8f7a65",
      fontSize: 20,
      "&:hover": {
        backgroundColor: "#dcb"
      }
    },
    lobbyImage: {
    	width: "250px",
    	height: "250px"
    },
    labelArea: {
    	fontSize: "25px"
    },
    gameMode: {
    	width: "180px",
    	float: "left",
    	textAlign: "center"
    },
    startGameBTN: {
    	border: "none",
	    width: "100%",
	    backgroundColor: "#f5835f",
	    fontSize: "20px",
	    padding: "7px",
	    color: "#fff",
	    borderRadius: "5px",
	    "&:hover": {
	    	backgroundColor: "#fb8c00"
	    }
    },
    highScoreBTN: {
    	border: "none",
	    width: "100%",
	    backgroundColor: "#8f7a65",
	    fontSize: "20px",
	    padding: "7px",
	    color: "#fff",
	    borderRadius: "5px",
	    "&:hover": {
	    	backgroundColor: "#dcb"
	    }
    },
    gameLobbyButton: {
      marginTop: "20px",
      width: "80%",
      textAlign: "center"
    },
    subarea: {
    	float: "left"
    }
  })
})

const Lobby = (props) => {
	const classes = useStyles({})
	const [gameState, setGameState] = useState(getSize())

	const incStateHandler = () => {
		if(gameState < 5) {
			setGameState(gameState + 1)
			setSize(gameState + 1)
		}
	}

	const decStateHandler = () => {
		if(gameState > 3) {
			setGameState(gameState - 1)
			setSize(gameState - 1)
		}
	}

	const startGameHandler = async () => {
		props.onStartGame(1)
	}

	return (
		<>
			<div className={classes.root}>
				<div>
					<div>
						{(gameState === 3 &&
							<img src={image3} alt="www" className={classes.lobbyImage} />
						)}
						{(gameState === 4 &&
							<img src={image4} alt="www" className={classes.lobbyImage} />
						)}
						{(gameState === 5 &&
							<img src={image5} alt="www" className={classes.lobbyImage} />
						)}
					</div>

					<div className={classes.labelArea}>
						<div className={classes.subarea}>
							<a onClick={decStateHandler}><AiOutlineLeft /></a>
						</div>
						<div className={classes.gameMode}>
						{(gameState === 3 &&
							<span>Tiny(3 x 3)</span>
						)}
						{(gameState === 4 &&
							<span>Classic(4 x 4)</span>
						)}
						{(gameState === 5 &&
							<span>Big(5 x 5)</span>
						)}
						</div>
						<div className={classes.subarea}>
							<a onClick={incStateHandler}><AiOutlineRight /></a>
						</div>
					</div>

					<div className={classes.gameLobbyButton}>
				    <button onClick={startGameHandler} className={classes.startGameBTN}>
				      Start Game
				    </button>
					</div>

					<div className={classes.gameLobbyButton}>
				    <button className={classes.highScoreBTN}>
				      High Scores
				    </button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Lobby;