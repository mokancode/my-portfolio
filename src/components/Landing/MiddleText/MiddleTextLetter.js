import React, { Component } from 'react'
import classnames from 'classnames';

export class MiddleTextLetter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            shadowAnim: false
        };

        this.restartAnim = this.props.restartAnim;

        // refs
        this.letterRef = React.createRef();
    }

    componentDidMount() {
        const { backgroundGlow, letterIndex, visitedPages, shadow } = this.props;
        // if (visitedPages.indexOf("landing") !== -1) {
        var delay = letterIndex * 0.1;
        var delay2 = letterIndex * 0.2 + 2;
        this.letterRef.current.style.transitionDelay = `${delay}s`;
        // }

        // if (backgroundGlow) this.letterRef.current.style.animationDelay = `${delay2}s`;

        if (shadow) {
            var delay = letterIndex * this.generateRandomInterval(0.2, 0.1);
            this.letterRef.current.style.animationDelay = `${delay}s`;
        }
    }

    componentDidUpdate() {
        const { letterIndex, shadowAnim } = this.props;
        if (shadowAnim && !this.state.newIntervalsSet) {
            this.setState({ newIntervalsSet: true }, function () {
                var delay = letterIndex * this.generateRandomInterval(0.15, 0.1);
                this.letterRef.current.style.animationDelay = `${delay}s`;
            })
        }
    }

    generateRandomInterval(max, min) {
        return Math.random() * (max - min + 1) + min;
    }

    render() {

        const { letter, letterIndex, visitedPages, uncoverLogo, shadow, shadowAnim } = this.props;

        return (
            <p className={classnames("", {
                "hideParagraphOnFirstVisit": visitedPages.indexOf("landing") === -1
                , "revealParagraph": uncoverLogo && visitedPages.indexOf("landing") === -1
                , "revealParagraphVisited": uncoverLogo && visitedPages.indexOf("landing") !== -1
                , "playShadowAnim": shadow && shadowAnim
            })} ref={this.letterRef}
                onAnimationEnd={async function (e) {
                    if (shadow && shadowAnim && letterIndex === 3) {
                        // console.log("restart anim");
                        await this.props.restartAnim();
                        this.setState({ newIntervalsSet: false });
                    }

                }.bind(this)}
            >
                {letter}
            </p>
        )
    }
}

export default MiddleTextLetter;