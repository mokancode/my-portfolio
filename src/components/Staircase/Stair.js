import React, { Component } from 'react';
import classnames from 'classnames';
import GlitchText from '../GlitchText/GlitchText';
import generateRandomInterval from '../../utilities/generateRandomInteger';
import isEmpty from '../../is-empty';
import { connect } from 'react-redux';
import { setTouchRectangleRevealed } from '../../actions/stylesActions';

class Stair extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stairSide: "front"
        };
    }


    componentDidMount() {
        var dragLineHeights = [];
        for (var i = 0; i < 6; i++) {
            dragLineHeights.push(generateRandomInterval(30, 10));
        }
        this.setState({ dragLineHeights });

        setTimeout(function () {
            this.setState({ revealStairFirstVisit: true });
        }.bind(this), 1000);

    }

    componentWillUnmount() {
        this.props.setTouchRectangleRevealed(false);
    }

    render() {

        const { tableSide, stairSide, stairClass, showInnerContent, showText, dragLineHeights, revealStairFirstVisit, revealStairVisited, showDragLines } = this.state;
        const { leftText, frontText, topText, index } = this.props;

        return (
            <div className={classnames("staircaseScene", {
                "revealStairSceneFirstVisit": revealStairFirstVisit
                // , "revealSliderPanelNotFirstVisit": revealStairFirstVisit === false
            })}
                onTransitionEnd={function (e) {
                    // if ((revealStairFirstVisit || revealStairSceneVisited) && !revealStair) this.setState({ revealStair: true });
                }.bind(this)}
            >
                <div className={classnames("stair", {
                    "reveal": revealStairFirstVisit || revealStairVisited
                    , "show-front": stairSide === "front"
                    , [`stair${index}`]: index
                    , "showStairText": showText
                    // , "show-right": stairSide === "right"
                    // , "show-back": stairSide === "back"
                    // , "show-left": stairSide === "left"
                    // , "show-top": stairSide === "top"
                    // , "show-bottom": stairSide === "bottom"
                })}
                    onTransitionEnd={function (e) {
                        this.setState({ showText: true });
                    }.bind(this)}
                >
                    <div className="stair__face stair__face--front">
                        <p>{frontText}</p>
                        {index === "2" && !isEmpty(dragLineHeights) ? <div className={classnames("dragLines", {
                            "showDragLines": showDragLines
                        })}>
                            <div className="dragLine" style={{ height: `${dragLineHeights[0]}px` }}></div>
                            <div className="dragLine" style={{ height: `${dragLineHeights[1]}px` }}></div>
                            <div className="dragLine" style={{ height: `${dragLineHeights[2]}px` }}></div>
                            <div className="dragLine" style={{ height: `${dragLineHeights[3]}px` }}></div>
                            <div className="dragLine" style={{ height: `${dragLineHeights[4]}px` }}></div>
                            <div className="dragLine" style={{ height: `${dragLineHeights[5]}px` }}></div>
                        </div> : null}
                    </div>
                    <div className="stair__face stair__face--back">
                        {/* back */}
                    </div>
                    <div className="stair__face stair__face--right">
                        {/* right */}
                    </div>
                    <div className="stair__face stair__face--left">
                        <p>{leftText}</p>
                    </div>
                    <div className="stair__face stair__face--top">
                        <div className="stairTopTextWrapper"
                            onTransitionEnd={function (e) {
                                if (index === "2" && !this.props.styles.rectangleTouchTextIsRevealed) {
                                    this.props.setTouchRectangleRevealed(true);
                                    this.setState({ showDragLines: true });
                                }
                            }.bind(this)}
                        >
                            {index === "0" ?
                                <p>{topText}</p>
                                // <GlitchText text={topText} />
                                : <p>{topText}</p>
                            }
                        </div>

                    </div>
                    <div className="stair__face stair__face--bottom">
                        {/* bottom */}
                    </div>
                </div>
            </div >
        );
    }
}

function mapStateToProps(state) {
    return {
        navbar: state.navbar,
        styles: state.styles,
    }
}

export default connect(mapStateToProps, { setTouchRectangleRevealed })(Stair);
// export default Stair;