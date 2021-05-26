import React, { Component } from "react";
import styles from "./NavBlockRemotePullBtn.module.scss";
import classnames from "classnames";

class NavBlockRemotePullBtn extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.pullNavbarFunc = this.props.pullNavbarFunc;
    this.notifyInitiatePullNav = this.props.notifyInitiatePullNav;
    this.returnNavBlockRemotePullBtn = this.props.returnNavBlockRemotePullBtn;

    // refs
    this.expandingPullTriggerRef = React.createRef();
  }

  componentDidMount() {
    // setTimeout(function () {
    //     this.setState({ pullOutBtn: true })
    // }.bind(this), 10);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.pullNavbar === false && prevState.pullNavOut === true) {
      return {
        pullNavOut: false,
      };
    }

    return null;
  }

  render() {
    const { getInPosition, pullOutBtn, pullNavbar } = this.props;
    const { getInPositionState, pullNavOut, initiatePullNav } = this.state;

    return (
      <div
        className={classnames(styles.navigationPullBtnOuterWrapper, {
          [styles.getInPosition]: getInPosition || getInPositionState,
          [styles.pullNavbar]: pullNavbar,
        })}
        ref={this.props.refProp}
        onMouseMove={function (e) {
          // console.log("mouse enter");
          if (!initiatePullNav) {
            this.setState({ initiatePullNav: true });
            this.notifyInitiatePullNav(true);
            if (e.clientY < 80) this.returnNavBlockRemotePullBtn(80);
            else if (window.innerHeight - e.clientY <= 250) this.returnNavBlockRemotePullBtn(window.innerHeight - 250);
            else this.returnNavBlockRemotePullBtn(e.clientY + 70);
            // console.log("mouse", e.clientY);
          }
        }.bind(this)}
        onMouseLeave={function (e) {
          if (initiatePullNav) {
            this.setState({ initiatePullNav: false });
            this.notifyInitiatePullNav(false);
          }
        }.bind(this)}
      >
        <div
          className={classnames(styles.navigationPullBtnWrapper, {
            [styles.getInPosition]: getInPosition || getInPositionState,
            [styles.pullOutBtn]: pullOutBtn,
          })}
          onTransitionEnd={function () {
            if (!getInPositionState) this.setState({ getInPositionState: true });
          }.bind(this)}
        >
          <div className={styles.navigationPullBtn}>
            <div className={[styles.gradient, styles.horizontalGradient].join(" ")}></div>
            <div className={[styles.gradient, styles.verticalGradient].join(" ")}></div>

            <p>
              N<span className={styles.avigation}>avigation</span>
            </p>
            <div className={styles.verticalText}>
              <p>a</p>
              <p>v</p>
            </div>

            <div className={styles.navigationPullBtnElements}>
              <div className={[styles.neonBar, styles.rightNeonBar].join(" ")}></div>
              <div className={[styles.neonBar, styles.bottomNeonBar].join(" ")}></div>

              <div className={styles.topBar}></div>
              <div className={styles.leftBar}></div>
              <div className={styles.rightBar}></div>
            </div>
          </div>

          <div
            className={classnames(styles.expandingPullTrigger, {
              [styles.expandingPullTriggerPullOut]: initiatePullNav,
            })}
            ref={this.expandingPullTriggerRef}
            onTransitionEnd={function (e) {
              // console.log(window.getComputedStyle(this.expandingPullTriggerRef.current))

              if (!pullNavOut && initiatePullNav) {
                // console.log("pullnav out")
                this.setState({ pullNavOut: true });
                this.pullNavbarFunc();
              }

              // else if (pullNavOut) {
              //     console.log("pullnav in")
              //     this.setState({ pullNavOut: false });
              // }
            }.bind(this)}
          ></div>
        </div>
      </div>
    );
  }
}

export default NavBlockRemotePullBtn;
