import React, { Component } from 'react'
import classnames from 'classnames';
import "./LogoLetter.scss";

export class LogoLetter extends Component {
    constructor(props) {
        super(props)

        this.state = {
            showLetter: false
            , moveFirstLeft: false
        };

        this.firstLetterInPositionFunc = this.props.firstLetterInPositionFunc;
    }

    componentDidMount() {
    }

    componentDidUpdate() {
        const { loadText, firstLetterInPosition, word } = this.props;
        const { showLetter, moveFirstLeft } = this.state;

        if (loadText && !showLetter) {
            const { letter, letterType, letterIndex } = this.props;

            var delayLeft = letterIndex * 80;
            var delayCenter = letterIndex * 80;

            var delayRight = (word.length - letterIndex) * 80;

            // first show first letters immediately
            if (letterIndex === 0) {
                setTimeout(function () {
                    this.setState({ showLetter: true }, function () {
                    });
                }.bind(this), 10);
            }

            // console.log("letterType", letterType, firstLetterInPosition);
            if (firstLetterInPosition && letterType === "left") {
                setTimeout(function () {
                    this.setState({ showLetter: true });
                }.bind(this), delayLeft);
            }
            else if (firstLetterInPosition && letterType === "center") {
                setTimeout(function () {
                    this.setState({ showLetter: true });
                }.bind(this), delayCenter);
            }
            else if (firstLetterInPosition && letterType === "right") {
                setTimeout(function () {
                    this.setState({ showLetter: true });
                }.bind(this), delayRight);
            }
        }
    }

    render() {

        const { letter, letterIndex, letterType } = this.props;
        const { showLetter, moveFirstLeft, showLetterFromBottom, showLetterFromAbove } = this.state;
        return (
            <li className={classnames("reflectiveSliderLogoLetter", {
                "showLetter": showLetter
                , "letterFromBottom": letterIndex !== 0 && letterIndex % 2 === 0
                , "letterFromAbove": letterIndex !== 0 && letterIndex % 2 !== 0
                , "moveFirstLeft": moveFirstLeft
            })}
                onTransitionEnd={function () {
                    if (letterIndex === 0 && !moveFirstLeft) {
                        // setTimeout(function () {
                        this.setState({ moveFirstLeft: true })
                        // }.bind(this), 0);
                    }

                    if (moveFirstLeft && letterType !== "center") {
                        this.firstLetterInPositionFunc();
                    }

                }.bind(this)}
            >
                <h1
                    style={{ transitionDelay: `${letterIndex * 30}ms` }}
                >{letter}</h1>
            </li>
        )
    }
}

export default LogoLetter;