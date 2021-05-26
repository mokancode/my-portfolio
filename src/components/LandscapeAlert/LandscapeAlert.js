import React, { Component } from "react";
import classnames from "classnames";
import styles from "./LandscapeAlert.module.scss";

class LandscapeAlert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLandscape: false,
      landscapeAlertAcknowledged: false,
    };

    this.setLandscapeAcknowledged = this.props.setLandscapeAcknowledged;
  }

  componentDidMount() {
    if (window.innerWidth < window.innerHeight && this.state.isLandscape) this.setState({ isLandscape: false });
    else if (window.innerWidth > window.innerHeight && !this.state.isLandscape) this.setState({ isLandscape: true });

    window.addEventListener(
      "resize",
      function (e) {
        const { isLandscape } = this.state;
        if (window.innerWidth < window.innerHeight && isLandscape) this.setState({ isLandscape: false });
        else if (window.innerWidth > window.innerHeight && !isLandscape) this.setState({ isLandscape: true });
      }.bind(this)
    );
  }

  componentDidUpdate() {
    const { isLandscape, landscapeAlertReveal, landscapeAlertAcknowledged } = this.state;
    if (!isLandscape && !landscapeAlertReveal && !landscapeAlertAcknowledged)
      setTimeout(
        function () {
          this.setState({ landscapeAlertReveal: true }); // landscapeAlertReveal is technically the the dark background
        }.bind(this),
        500
      );

    if (isLandscape && landscapeAlertReveal && !landscapeAlertAcknowledged) this.setState({ landscapeAlertReveal: false });
  }

  render() {
    const { landscapeAlertAcknowledgedParent } = this.props;
    const { textReveal, phoneIconReveal, okButtonReveal, landscapeAlertReveal, landscapeAlertAcknowledged, isLandscape } = this.state;

    return (
      <div
        className={classnames(styles.landscapeAlertDiv, {
          [styles.landscapeAlertReveal]: landscapeAlertReveal && !landscapeAlertAcknowledged && !landscapeAlertAcknowledgedParent,
          [styles.landscapeAlertAcknowledged]: landscapeAlertAcknowledged,
        })}
        onTransitionEnd={function (e) {
          e.stopPropagation();
          const { textReveal } = this.state;
          if (landscapeAlertReveal && !textReveal) this.setState({ textReveal: true });
          if (isLandscape || landscapeAlertAcknowledged) this.setLandscapeAcknowledged();
        }.bind(this)}
      >
        <div
          className={classnames(styles.phoneIcon, {
            [styles.phoneIconReveal]: phoneIconReveal,
          })}
          onAnimationStart={function (e) {
            this.setState({ okButtonReveal: true });
          }.bind(this)}
        ></div>
        <p
          className={classnames("", {
            [styles.landscapeAlertTextReveal]: textReveal,
          })}
          onTransitionEnd={function (e) {
            e.stopPropagation();
            if (!phoneIconReveal) this.setState({ phoneIconReveal: true });
          }.bind(this)}
        >
          This slideshow is best experienced in landscape orientation
        </p>
        <div
          className={styles.okBtnWrapper}
          onClick={function (e) {
            this.setState({ landscapeAlertAcknowledged: true });
          }.bind(this)}
        >
          <button
            className={classnames("", {
              [styles.okButtonReveal]: okButtonReveal,
            })}
            onClick={function (e) {
              this.setState({ landscapeAlertAcknowledged: true });
            }.bind(this)}
          >
            OK
          </button>
        </div>
      </div>
    );
  }
}

export default LandscapeAlert;
