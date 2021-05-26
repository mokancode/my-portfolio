import React, { Component } from "react";
import styles from "./ResumeHeader.module.scss";
import classnames from "classnames";

class ResumeHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate() {
    if (this.props.show && !this.state.show) {
      setTimeout(
        function () {
          this.setState({ show: true });
        }.bind(this),
        1000
      );
    }
  }

  render() {
    const { text } = this.props;
    const { show, animate } = this.state;

    return (
      <div
        className={classnames(styles.resumeHeader, {
          [styles.show]: show,
          [styles.animate]: animate,
        })}
        onTransitionEnd={function () {
          if (!animate) this.setState({ animate: true });
        }.bind(this)}
      >
        <div className={styles.headerAndLines}>
          <div className={styles.line}></div>
          <h1>{text}</h1>
          <div className={styles.line}></div>
        </div>
        <div className={styles.headerUnderline}></div>
      </div>
    );
  }
}

export default ResumeHeader;
