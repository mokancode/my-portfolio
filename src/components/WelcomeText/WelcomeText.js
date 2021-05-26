import React, { Component } from "react";
import styles from "./WelcomeText.module.scss";
import classnames from "classnames";
import ShineGroup from "../Shine/ShineGroup";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../is-empty";

class WelcomeText extends Component {
  constructor(props) {
    super(props);
    this.state = {
      line: "Full-stack web development",
    };
  }

  componentDidMount() {
    const { line } = this.state;
    var uniqueIDs = [];
    for (var i = 0; i < line.length; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });

    setTimeout(
      function () {
        this.setState({ reveal: true });
      }.bind(this),
      2000
    );
  }

  render() {
    const { line, reveal, shineReady, uniqueIDs } = this.state;

    return (
      <div
        className={classnames(styles.welcomeText, {
          [styles.welcomeTextReveal]: reveal,
        })}
      >
        <div className={styles.lineDiv}>
          <ShineGroup amount={10} maxWidth={7} readyToLoad={shineReady} />
          {!isEmpty(uniqueIDs) &&
            line.split("").map(
              function (letter, index) {
                return (
                  <svg key={uniqueIDs[index]} className={styles.lineSVG} letter={letter}>
                    <linearGradient id={styles.welcomeTextGradient} gradientTransform="rotate(90)">
                      <stop
                        offset="10%"
                        // stopColor={color1} />
                        stopColor="var(--color-stop-1)"
                      />
                      <stop
                        offset="90%"
                        // stopColor={color2} />
                        stopColor="var(--color-stop-2)"
                      />
                    </linearGradient>

                    <linearGradient id={styles.welcomeTextGradientWhite} gradientTransform="rotate(70)">
                      <stop
                        offset="50%"
                        // stopColor={color1} />
                        stopColor="var(--color-stop-1)"
                      />
                      <stop
                        offset="150%"
                        // stopColor={color2} />
                        stopColor="var(--color-stop-2)"
                      />
                    </linearGradient>

                    <text
                      x="0"
                      y="15"
                      stroke={`url(#${
                        index === 11 || index === 12 || index === 13 ? styles.welcomeTextGradientWhite : styles.welcomeTextGradient
                      })`}
                      className={styles.lineLetterPath}
                      style={{ transitionDelay: `${index * 80}ms`, animationDelay: `${index * 150}ms` }}
                      onTransitionEnd={function () {
                        if (index === 13) this.setState({ shineReady: true });
                      }.bind(this)}
                    >
                      {letter}
                    </text>
                  </svg>
                );
              }.bind(this)
            )}
        </div>
      </div>
    );
  }
}

export default WelcomeText;
