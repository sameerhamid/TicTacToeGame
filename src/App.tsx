import React, {useEffect, useState} from 'react';

import {
  FlatList,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Snackbar from 'react-native-snackbar';
import Icons from './components/Icons';

function App(): JSX.Element {
  const [isCross, setIsCross] = useState<boolean>(false);
  const [gameWinner, setGameWinner] = useState<string>('');
  const [gameState, setGameState] = useState(new Array(9).fill('empty', 0, 9));
  const [noOfWinsCross, setNoOfWinsCross] = useState(0);
  const [noOfWinsCircle, setNoOfWinsCircle] = useState(0);

  const reloadGame = () => {
    setGameState(new Array(9).fill('empty', 0, 9));
    setGameWinner('');
    setIsCross(false);
  };

  const checkIsWinner = () => {
    // checking winner of the game

    if (
      gameState[0] === gameState[1] &&
      gameState[1] === gameState[2] &&
      gameState[0] !== 'empty'
    ) {
      setGameWinner(`${gameState[0]} won the game!`);
    } else if (
      gameState[3] !== 'empty' &&
      gameState[3] === gameState[4] &&
      gameState[4] === gameState[5]
    ) {
      setGameWinner(`${gameState[3]} won the game!`);
    } else if (
      gameState[6] !== 'empty' &&
      gameState[6] === gameState[7] &&
      gameState[7] === gameState[8]
    ) {
      setGameWinner(`${gameState[6]} won the game!`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[4] &&
      gameState[4] === gameState[8]
    ) {
      setGameWinner(`${gameState[0]} won the game!`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[4] &&
      gameState[4] === gameState[6]
    ) {
      setGameWinner(`${gameState[2]} won the game!`);
    } else if (
      gameState[0] !== 'empty' &&
      gameState[0] === gameState[3] &&
      gameState[3] === gameState[6]
    ) {
      setGameWinner(`${gameState[0]} won the game!`);
    } else if (
      gameState[1] !== 'empty' &&
      gameState[1] === gameState[4] &&
      gameState[4] === gameState[7]
    ) {
      setGameWinner(`${gameState[1]} won the game!`);
    } else if (
      gameState[2] !== 'empty' &&
      gameState[2] === gameState[5] &&
      gameState[5] === gameState[8]
    ) {
      setGameWinner(`${gameState[2]} won the game!`);
    } else if (!gameState.includes('empty', 0)) {
      setGameWinner('Draw Game...');
    }
  };

  const onChangeItem = (itemNumber: number) => {
    if (gameWinner) {
      return Snackbar.show({
        text: gameWinner,
        backgroundColor: 'teal',
        textColor: 'white',
      });
    }

    if (gameState[itemNumber] === 'empty') {
      gameState[itemNumber] = isCross ? 'cross' : 'circle';
      setIsCross(!isCross);
    } else {
      return Snackbar.show({
        text: 'Position is already filled',
        backgroundColor: '#CB0F38',
        textColor: 'white',
      });
    }
    checkIsWinner();
  };

  const reset = () => {
    setGameState(new Array(9).fill('empty', 0, 9));
    setGameWinner('');
    setIsCross(false);
    setNoOfWinsCircle(0);
    setNoOfWinsCross(0);
  };

  useEffect(() => {
    console.log({gameWinner});

    if (gameWinner.includes('circle')) {
      setNoOfWinsCircle(prev => prev + 1);
    } else if (gameWinner.includes('cross')) {
      setNoOfWinsCross(prev => prev + 1);
    }
  }, [gameWinner]);

  return (
    <SafeAreaView>
      <StatusBar />
      <View style={styles.container}>
        {gameWinner ? (
          <View style={[styles.playerInfo, styles.winnerInfo]}>
            <Text style={styles.winnerText}>{gameWinner}</Text>
          </View>
        ) : (
          <View
            style={[
              styles.playerInfo,
              isCross ? styles.playerX : styles.playerO,
            ]}>
            <Text style={styles.gameTurnText}>
              Player {isCross ? 'X' : 'O'}'s Turn
            </Text>
          </View>
        )}

        {/* no of wins  */}
        <View style={styles.noOfWins}>
          <Text style={styles.noOfWinsTxt}>
            No of Wins by X : {noOfWinsCross}
          </Text>
          <Text style={styles.noOfWinsTxt}>
            No of Wins by O : {noOfWinsCircle}
          </Text>
        </View>

        {/* Game grid  */}

        <FlatList
          numColumns={3}
          data={gameState}
          style={styles.grid}
          renderItem={({item, index}) => (
            <Pressable
              key={index}
              style={styles.card}
              onPress={() => onChangeItem(index)}>
              <Icons name={item} />
            </Pressable>
          )}
        />
        <View style={styles.reloadBtnView}>
          <Pressable onPress={reloadGame}>
            <View style={styles.reloadBtn}>
              <Text style={styles.reloadBtnTxt}>
                {gameWinner ? 'Reload the Game' : 'Start New Game'}
              </Text>
            </View>
          </Pressable>
        </View>

        <View style={styles.resetBtnView}>
          <Pressable onPress={reset}>
            <View style={styles.resetBtn}>
              <Text style={styles.resetBtnTxt}>Reset</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    // height: '100%',
  },
  playerInfo: {
    marginTop: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    width: '100%',
  },
  winnerInfo: {
    backgroundColor: 'yellow',
  },
  winnerText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 22,
  },
  playerX: {
    backgroundColor: 'green',
  },
  playerO: {
    backgroundColor: 'orange',
  },
  gameTurnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
  grid: {
    marginTop: 80,
    backgroundColor: '#EEAC99',
    // justifyContent: 'center',
  },
  card: {
    borderColor: 'black',
    borderRadius: 1,
    borderWidth: 1,
    width: '33%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 90,
  },
  reloadBtnView: {
    backgroundColor: 'teal',
    marginTop: 28,
    borderRadius: 10,
    width: '100%',
  },
  reloadBtn: {
    paddingVertical: 14,
  },
  reloadBtnTxt: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  noOfWins: {
    marginTop: 18,
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#F71D70',
    borderRadius: 12,
  },
  noOfWinsTxt: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },

  resetBtnView: {
    backgroundColor: 'black',
    marginTop: 12,
    borderRadius: 10,
    width: '100%',
  },
  resetBtn: {
    paddingVertical: 14,
  },
  resetBtnTxt: {
    fontWeight: 'bold',
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
});

export default App;
