import "./styles.css";
import React, { Component } from "react";
import Button from "./components/Button";
import "./styles.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: "",
      previous: [],
      nextIsReset: false
    };
  }
  reset = () => {
    this.setState({ current: "0",previous:[],nextIsReset:false });
  };

  calculate = (symbol) => {
    let{current,previous,nextIsReset} = this.state;
    if(previous.length > 0){
      current = eval(
      String( previous[previous.length - 1] + current));
      this.setState({current,previous:[], nextIsReset:true})
    }

  }


  addToCurrent = (symbol) => {
    console.log(symbol);
    if (["/", "+", "-", "*"].indexOf(symbol) > -1) {
      let { previous } = this.state;
      previous.push(this.state.current + symbol);
      this.setState({ previous, nextIsReset: true });
    } else {
      if ((this.state.current === "0" && symbol !== ".") || this.state.nextIsReset){
        this.setState({ current: symbol , nextIsReset:false });
      } else {
        this.setState({ current: this.state.current + symbol });
      }
    }
  };
  render() {
    // storing the buttons on the calculator
    const buttons = [
      { symbol: "C", cols: 3, action: this.reset },
      { symbol: "/", cols: 1, action: this.addToCurrent },
      { symbol: "7", cols: 1, action: this.addToCurrent },
      { symbol: "8", cols: 1, action: this.addToCurrent },
      { symbol: "9", cols: 1, action: this.addToCurrent },
      { symbol: "*", cols: 1, action: this.addToCurrent },
      { symbol: "4", cols: 1, action: this.addToCurrent },
      { symbol: "5", cols: 1, action: this.addToCurrent },
      { symbol: "6", cols: 1, action: this.addToCurrent },
      { symbol: "-", cols: 1, action: this.addToCurrent },
      { symbol: "1", cols: 1, action: this.addToCurrent },
      { symbol: "2", cols: 1, action: this.addToCurrent },
      { symbol: "3", cols: 1, action: this.addToCurrent },
      { symbol: "+", cols: 1, action: this.addToCurrent },
      { symbol: "0", cols: 2, action: this.addToCurrent },
      { symbol: ".", cols: 1, action: this.addToCurrent },
      { symbol: "/", cols: 1, action: this.addToCurrent },
      { symbol: "=", cols: 1, action: this.calculate }
    ];
    return (
      //storing the first number
      <div className="App">
        {this.state.previous > 0 ? (
          <div className=" Floaty-last">
            {this.state.previous[this.state.previous.length - 1]}
          </div>
        ) : null}
        {/* storing the first number--end */}
        {/* input field code */}
        <input className="result" type="text" value={this.state.current} />

        {/* input field code end */}

        {/*buttons and symbol  */}
        {buttons.map((btn, i) => {
          return (
            <Button
              key={i}
              symbol={btn.symbol}
              cols={btn.cols}
              action={(symbol) => btn.action(symbol)}
            />
          );
        })}
        {/* buttons and symbol end */}
      </div>
    );
  }
}
export default App;
