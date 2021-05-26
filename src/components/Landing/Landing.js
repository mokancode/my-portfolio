import React, { Component } from "react";
import { Helmet } from "react-helmet";
import classnames from "classnames";
import MyNameText from "../MyNameText/MyNameText";
import Electricity from "../SVGs/Electricity/Electricity";
import "./Landing.scss";
import "./LandingMobile.css";
import { setPageVisited } from "../../actions/stylesActions";
import { connect } from "react-redux";
// import MiddleText from './MiddleText/MiddleText';
import Chandelier from "../Chandelier/Chandelier";
import SkillsSVG from "../SVGs/SkillsSVG/SkillsSVG";
import SkillLinesSVG from "../SVGs/SkillsSVG/skillLinesSVG";
import SkillsMERNSVG from "../SVGs/SkillsSVG/SkillsMERNSVG";
import CodeShatterGroup from "./CODE/CodeShatterGroup";
import WelcomeText from "../WelcomeText/WelcomeText";
import BracketSVG from "../SVGs/BracketsLottie/BracketSVG";

export class Landing extends Component {
  constructor(props) {
    super(props);

    this.state = {
      uncoverLogo: false,
      skillAnimFinished: false,
      codeShatterRevealEnded: false,
      tagSlashRevealed: null,
    };

    this.revealTagSlash = this.revealTagSlash.bind(this);
    this.showElectricityFunc = this.showElectricityFunc.bind(this);
    this.nameStrokeAnimFinished = this.nameStrokeAnimFinished.bind(this);
    this.skillAnimFinishedFunc = this.skillAnimFinishedFunc.bind(this);
    this.electricityAnimFinishedFunc = this.electricityAnimFinishedFunc.bind(this);
    this.bracketAnimFinishedFunc = this.bracketAnimFinishedFunc.bind(this);
    this.codeShatterRevealEnded = this.codeShatterRevealEnded.bind(this);

    // refs
    this.portfolioDiv = React.createRef();
  }

  componentDidMount() {
    document.title = "Code by Mike - Home";

    const { visitedPages } = this.props.styles;

    if (visitedPages.indexOf(String("landing").toLocaleLowerCase()) === -1) this.setState({ pageVisited: false });
    else if (visitedPages.indexOf(String("landing").toLocaleLowerCase()) !== -1) this.setState({ pageVisited: true });

    if (visitedPages.indexOf(String("landing").toLocaleLowerCase()) === -1) {
      setTimeout(
        function () {
          this.setState({ uncoverLogo: true });
        }.bind(this),
        2000
      );
    } else this.setState({ uncoverLogo: true });

    // }, 1000);

    // elbow/brackets/tag
    setTimeout(
      function () {
        this.setState({ anim8: true });
      }.bind(this),
      1000
    );
    // }, 6000);
    // }, 12000);

    // setTimeout(() => {
    //   this.setState({ revealMiddlePreText: true });
    // }, 27000);
  }

  componentDidUpdate() {
    if (!this.props.styles.documentHasFocus && !this.state.documentLostFocus) {
      // Document lost focus, terminate skills and bracket animations
      this.setState({ documentLostFocus: true });
      this.skillAnimFinishedFunc();
      this.bracketAnimFinishedFunc();
    }
  }

  componentWillUnmount() {
    var { visitedPages } = this.props.styles;
    if (visitedPages.indexOf(String("landing").toLocaleLowerCase()) === -1) {
      visitedPages.push("landing");
      this.props.setPageVisited(visitedPages);
    }
  }

  revealTagSlash(status) {
    if (status) {
      this.setState({ tagSlashRevealed: true });
    } else this.setState({ tagSlashRevealed: false });
  }

  nameStrokeAnimFinished() {
    // console.log('reveal');
    this.setState({ revealMiddlePreText: true });
  }

  showElectricityFunc() {
    this.setState({ continueElectricityAnim: true });
    // console.log("elec continue");
  }

  skillAnimFinishedFunc() {
    // console.log("skill finished func");
    setTimeout(
      function () {
        this.setState({ skillAnimFinished: true });
      }.bind(this),
      200
    );
  }

  electricityAnimFinishedFunc() {
    // console.log("elec finished func");
    this.setState({ electricityAnimFinished: true });
  }

  bracketAnimFinishedFunc() {
    // console.log("bracket finished func");
    setTimeout(
      function () {
        this.setState({ bracketAnimFinished: true });
      }.bind(this),
      200
    );
  }

  codeShatterRevealEnded() {
    this.setState({ codeShatterRevealEnded: true });
  }

  render() {
    const { uncoverLogo, tagSlashRevealed, skillAnimFinished, electricityAnimFinished, bracketAnimFinished, codeShatterRevealEnded } =
      this.state;
    var { continueElectricityAnim, pageVisited } = this.state;
    const { visitedPages } = this.props.styles;

    return (
      <div
        className={classnames("routeDiv landingDiv", {
          landingDivRadialGradient: skillAnimFinished || pageVisited,
        })}
      >
        <Helmet>
          <title>MoKan Code - Home</title>
          <meta name="description" content="Welcome to Mike Kandino's portfolio" />
        </Helmet>

        {/* <h1 style={{ color: "white", position: "absolute", top: "100px", left: "100px" }}>{`bracketAnimFinished ${bracketAnimFinished}`}</h1>
            <h1 style={{ color: "white", position: "absolute", top: "130px", left: "100px" }}>{`skillAnimFinished ${skillAnimFinished}`}</h1> */}

        {/* <div className="Tilt-inner"> */}
        <div className="logoTextDivWrapper">
          <div
            className={classnames("logoTextDiv", {
              logoTextDivExpandLines: uncoverLogo,
              logoTextDivRotate: uncoverLogo,
            })}
          >
            {/* <MiddleText visitedPages={visitedPages} uncoverLogo={
                            pageVisited ?
                                true : uncoverLogo && skillAnimFinished} /> */}

            {skillAnimFinished || pageVisited ? (
              // true
              <CodeShatterGroup
                codeShatterRevealEnded={this.codeShatterRevealEnded}
                reveal={
                  skillAnimFinished ? 0 : pageVisited ? 1 : null
                  // 1
                }
              />
            ) : null}

            {uncoverLogo && codeShatterRevealEnded ? (
              // {true ?
              <MyNameText
                uncoverLogo={pageVisited ? true : uncoverLogo && skillAnimFinished}
                visitedPages={visitedPages}
                // revealText={revealMiddlePreText}
                showElectricityFunc={this.showElectricityFunc}
              />
            ) : null}

            {uncoverLogo && codeShatterRevealEnded ? (
              // {true ?
              <WelcomeText />
            ) : null}

            {skillAnimFinished || pageVisited ? null : (
              <div className="skillsSVGWrapper">
                <SkillsSVG uncoverLogo={uncoverLogo} skillAnimFinishedFunc={this.skillAnimFinishedFunc} />
                <SkillLinesSVG uncoverLogo={uncoverLogo} />
                <SkillsMERNSVG uncoverLogo={uncoverLogo} />
              </div>
            )}

            {bracketAnimFinished || skillAnimFinished || pageVisited ? null : (
              <div className="bracketSVGDiv">
                <BracketSVG
                  side={"left"}
                  anim8={this.state.anim8}
                  revealTagSlash={this.revealTagSlash}
                  nameStrokeAnimFinished={this.nameStrokeAnimFinished}
                  itemIndex={0}
                  // bracketAnimFinishedFunc={this.bracketAnimFinishedFunc}
                />
                <BracketSVG
                  side={"right"}
                  anim8={this.state.anim8}
                  revealTagSlash={this.revealTagSlash}
                  nameStrokeAnimFinished={this.nameStrokeAnimFinished}
                />
                <div className="tagSlashWrapper">
                  <div
                    className={classnames("tagSlash", {
                      tagSlashRevealed: tagSlashRevealed,
                    })}
                    onTransitionEnd={function (e) {
                      if (tagSlashRevealed === false) this.setState({ bracketAnimFinished: true });
                    }.bind(this)}
                  ></div>
                </div>
              </div>
            )}
          </div>

          {/* {electricityAnimFinished ? null :
                        <div className="electricitiesWrapper">
                            <Electricity itemIndex={0} showElectricity={

                                pageVisited ?
                                    uncoverLogo && continueElectricityAnim
                                    : uncoverLogo && continueElectricityAnim && skillAnimFinished

                                // uncoverLogo && skillAnimFinished && continueElectricityAnim

                            } electricityAnimFinishedFunc={this.electricityAnimFinishedFunc} />
                            <Electricity itemIndex={1} showElectricity={

                                pageVisited ?
                                    true : uncoverLogo && skillAnimFinished

                                // uncoverLogo && skillAnimFinished
                            } />
                        </div>
                    } */}

          {bracketAnimFinished || pageVisited ? <Chandelier reveal={skillAnimFinished || pageVisited} pageVisited={pageVisited} /> : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = function (state) {
  return {
    styles: state.styles,
  };
};

export default connect(mapStateToProps, { setPageVisited })(Landing);
