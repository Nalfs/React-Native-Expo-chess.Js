import { BehaviorSubject } from 'rxjs';
import { FileSystem } from "expo";

const defaultState = {
    //myData: null,
    fen: 'rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2'
};

const subject = new BehaviorSubject(defaultState);

class FileService {
    constructor() {

        // this.updateValue({})
      }


    getSubject() {
        return subject;
      }

    // updateValue(payload) {
    //         // const val = subject.value;
    //         // const state = Object.assign({}, val, payload);
    //         // subject.next(state)
    //     subject.next(payload)
    //     console.log('this is updated value',subject.value )
    //   }

    predictImage(value) {
      console.log('my state predicting')

      const myHeader = {
        headers: new Headers({
          'Accept': 'application/json',
          //'Content-Type': 'application/json',
          //'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Type': 'text/plain',
        }),
        //body: JSON.stringify(value),
        body: value,
        method: 'POST'
      };
      console.log('post image')

      fetch('http://192.168.10.115:3000/api/processData', myHeader)
      .then(this.checkStatus)
      .then(res => res.json())
      .then(res => {
          console.log('POST sent');
          subject.next({
            fen: res.fen
          });
        })
        .catch((error) => {
          console.log(error);
          console.log('Error message: ' + error.message);
          console.log('Response: ', error.response);
        });
    }


        checkStatus(response) {
            if (response.status >= 200 && response.status < 300) {
                return response
              } else {
                var error = new Error(response.statusText)
                error.response = response
                throw error
              }
        }


}

export default new FileService();