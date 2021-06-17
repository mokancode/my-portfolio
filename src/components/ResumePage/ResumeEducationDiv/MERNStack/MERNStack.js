import React, { Component } from "react";
import styles from "./MERNStack.module.scss";

class MERNStack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      abbreviaton: [
        { letter: "M", word: "Mongo" },
        { letter: "E", word: "Express" },
        { letter: "R", word: "React" },
        { letter: "N", word: "Node" },
      ],
    };
  }

  render() {
    const { abbreviaton, show } = this.state;

    return (
      <div onmouseneter className={[styles.container, show ? styles.show : undefined].join(" ")}>
        <p className={styles.text} onMouseEnter={() => this.setState({ show: true })} onMouseLeave={() => this.setState({ show: false })}>
          MERN
        </p>

        <div className={styles.lettersWrapper}>
          {abbreviaton.map((item) => {
            return (
              <div className={styles.letterWrapper}>
                <p>{item.letter}</p>
                <div className={styles.lineWrapper}>
                  <div className={styles.line}></div>
                </div>
                <p className={styles.word}>{item.word}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default MERNStack;
