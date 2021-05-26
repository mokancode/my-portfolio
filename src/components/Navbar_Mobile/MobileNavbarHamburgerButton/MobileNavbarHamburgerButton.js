import React, { Component } from "react";
import "./MobileNavbarHamburgerButton.scss";
import "./MobileNavbarHamburgerButtonLandscape.scss";
import classnames from "classnames";
import { connect } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../../is-empty";

class MobileNavbarHamburgerButton extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.openNavbarMobileFunc = this.props.openNavbarMobileFunc;
  }

  componentDidMount() {
    var uniqueIDs = [];
    for (var i = 0; i < 3; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });

    setTimeout(
      function () {
        this.setState({ revealLines: true });
      }.bind(this),
      500
    );

    const { isLandscape } = this.state;
    if (window.innerHeight < window.innerWidth && !isLandscape) this.setState({ isLandscape: true });
    else if (window.innerHeight > window.innerWidth && isLandscape) this.setState({ isLandscape: false });
    window.addEventListener(
      "resize",
      function () {
        const { navbarMobileOpenState } = this.props;
        const { isLandscape } = this.state;

        // landscape
        if (window.innerHeight < window.innerWidth && !isLandscape) {
          if (!navbarMobileOpenState) {
            this.setState(
              {
                revealLines: false,
                revealEnded: false,
                transformLandscapeLinesToArrow: false,
                shrinkCentralLine: false,
                openForCentralLine: false,
                hamburgerIsReady: false,
                // openNav: false
              },
              function (e) {
                setTimeout(
                  function () {
                    this.setState({ revealLines: true });
                  }.bind(this),
                  10
                );
              }.bind(this)
            );
          } else this.setState({ transformLandscapeLinesToArrow: true });
          this.setState({ isLandscape: true });
        }

        // portrait
        else if (window.innerHeight > window.innerWidth && isLandscape) {
          if (!navbarMobileOpenState) {
            this.setState(
              {
                revealLines: false,
                revealEnded: false,
                transformLandscapeLinesToArrow: false,
                shrinkCentralLine: false,
                openForCentralLine: false,
                hamburgerIsReady: false,
                // openNav: false,
                pullBackLandscape: false,
              },
              function (e) {
                setTimeout(
                  function () {
                    this.setState({ revealLines: true });
                  }.bind(this),
                  10
                );
              }.bind(this)
            );
          }

          this.setState({
            isLandscape: false,
            pullBackLandscape: false,
            revealLines: false,
            revealEnded: false,
            openForCentralLine: true,
            shrinkCentralLine: true,
          });
        }
      }.bind(this)
    );
  }

  componentDidUpdate() {
    const { openForCentralLine, shrinkCentralLine } = this.state;
    if (!openForCentralLine && shrinkCentralLine) this.setState({ shrinkCentralLine: false });

    // else if (!navbarMobileOpenState && navbarIsOpen) this.setState({ navbarIsOpen: false });
  }
  render() {
    const { navbarMobileOpenState } = this.props;
    const {
      openForCentralLine,
      shrinkCentralLine,
      revealLines,
      revealEnded,
      openNav,
      transformLandscapeLinesToArrow,
      isLandscape,
      pullBackLandscape,
      navbarIsOpen,
      hamburgerIsReady,
      uniqueIDs,
    } = this.state;

    if (isEmpty(uniqueIDs)) return null;

    return (
      <div
        className={classnames("mobileNavbarHamburgerButton", {
          revealLines: revealLines && !revealEnded,
          revealEnded: revealEnded,
          openForCentralLine: openForCentralLine,
          pullDown: shrinkCentralLine || pullBackLandscape,
          openNav: navbarMobileOpenState,
          // openNav ||
          transformLandscapeLinesToArrow: transformLandscapeLinesToArrow,
          isLandscape: isLandscape,
          hide: this.props.styles.pullNavBtnContainerHidden,
          // , "navbarIsOpen": navbarIsOpen
          hamburgerIsReady: hamburgerIsReady,
        })}
        onClick={function (e) {
          // this.setState(function (prevState) {
          //     return {
          //         openNav: !prevState.openNav
          //     }
          // }.bind(this))
          this.openNavbarMobileFunc();
        }.bind(this)}
      >
        {/* <button className="openForCentralLineBtn"
                    onClick={function (e) {
                        this.setState(function (prevState) {
                            return {
                                openForCentralLine: !prevState.openForCentralLine
                            }
                        }.bind(this))
                    }.bind(this)}
                >{openForCentralLine ? "close" : "open"}</button>

                <button className="revealBtn"
                    onClick={function (e) {
                        this.setState(function (prevState) {
                            return {
                                revealLines: !prevState.revealLines
                            }
                        }.bind(this))
                    }.bind(this)}
                >{revealLines ? "hide" : "reveal"}</button>

                <button className="openNavBtn"
                    onClick={function (e) {
                        this.setState(function (prevState) {
                            return {
                                openNav: !prevState.openNav
                            }
                        }.bind(this))
                    }.bind(this)}
                >{openNav ? "close nav" : "open nav"}</button> */}

        {isLandscape ? (
          <div className="landscapeLinesWrapper">
            {new Array(3).fill(undefined).map(
              function (item, idx) {
                return (
                  <div
                    className={classnames("landscapeLines", {
                      // "pullDown": shrinkCentralLine
                    })}
                    key={uniqueIDs[idx]}
                  >
                    <div
                      className="landscapeLine leftLine"
                      onTransitionEnd={function (e) {
                        if (revealLines && !revealEnded && idx === 1)
                          this.setState({ revealEnded: true, transformLandscapeLinesToArrow: true });
                        if (revealLines && revealEnded && idx === 0 && transformLandscapeLinesToArrow && !pullBackLandscape)
                          this.setState({ pullBackLandscape: true });
                        if (shrinkCentralLine || pullBackLandscape) this.setState({ hamburgerIsReady: true });

                        // if (navbarMobileOpenState && !navbarIsOpen) this.setState({ navbarIsOpen: true });
                      }.bind(this)}
                    ></div>
                    <div className="landscapeLine rightLine"></div>
                  </div>
                );
              }.bind(this)
            )}
          </div>
        ) : (
          <div className="portraitWrapper">
            <div className="sideLinesWrapper">
              {new Array(3).fill(undefined).map(
                function (item, idx) {
                  return (
                    <div
                      className={classnames("sideLines", {
                        pullDown: shrinkCentralLine,
                      })}
                      key={uniqueIDs[idx] + "_sideLines"}
                    >
                      <div
                        className="sideLine leftLine"
                        onTransitionEnd={function (e) {
                          if (revealLines && !revealEnded && idx === 1) this.setState({ revealEnded: true, openForCentralLine: true });
                          // if (revealLines && revealEnded && idx === 0 && openForCentralLine) console.log("done");

                          // if (navbarMobileOpenState && !navbarIsOpen) this.setState({ navbarIsOpen: true });

                          if (shrinkCentralLine || pullBackLandscape) this.setState({ hamburgerIsReady: true });
                        }.bind(this)}
                      ></div>
                      <div className="sideLine rightLine"></div>
                    </div>
                  );
                }.bind(this)
              )}
            </div>

            <div
              className={classnames("centralLine", {
                shrink: shrinkCentralLine,
              })}
              onTransitionEnd={function (e) {
                if (openForCentralLine && !shrinkCentralLine) this.setState({ shrinkCentralLine: true });
              }.bind(this)}
            ></div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.styles,
  };
}

export default connect(mapStateToProps, {})(MobileNavbarHamburgerButton);
// export default MobileNavbarHamburgerButton;
