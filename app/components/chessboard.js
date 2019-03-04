import React from 'react';
import { View, Text, StyleSheet,  AppRegistry } from 'react-native';
import FileService from '../store/fileservice';
import { Board, Constants, helper } from 'react-native-chess';
import { Chess } from 'chess.js';

export default class Chessboard extends React.Component {

  constructor() {
    super();
    this.game = new Chess();
      }

  componentDidMount() {
    FileService.getSubject().subscribe(value => {
      console.log("Subscription in Chessss comp, show me your FEN's", value);
      if (this.game.load(value.fen)) {
        this.forceUpdate();
        console.log('fen loaded successfully');
    } else {
        console.log('could not load fen string');
    }
   })

  }

  render() {
        return (
          <View style={styles.chessContainer}>
            <View style={styles.chessBoardContainer}>
              <Board
                ref={'Board'}
                game={this.game} />
            </View>
          </View>
           )
  }
}

const styles = StyleSheet.create({

  chessContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',

  },
  chessBoardContainer: {
    flex: 1,
  }

})