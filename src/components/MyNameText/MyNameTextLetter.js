import React, { Component } from 'react'
import classnames from 'classnames';

export class MyNameTextLetter extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.showElectricityFunc = this.props.showElectricityFunc;

    }

    componentDidMount() {
        // if (this.props.uncoverLetter && !this.state.uncoverLetter) {

        // Calculate interval between 100ms-1000ms
        var delay = (this.generateRandomInterval(20, 1) * 100);

        // 50% chance to add 50ms, calculate that chance.
        if (this.generateRandomInterval(2, 1) === 1) {
            delay += 50;
        }
        // console.log("delay: ", delay);
        setTimeout(function () {
            this.setState({ uncoverLetter: true })
        }.bind(this), delay);
        // }
    }

    componentDidUpdate() {

    }

    generateRandomInterval(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    render() {

        const { uncoverLetter } = this.state;
        const { letterIndex, letter, visitedPages, electrifyK } = this.props;

        return (
            <p className={classnames("", {
                "revealParagraph": uncoverLetter
                , "myNameTextFirstReveal": uncoverLetter && visitedPages.indexOf(String("landing").toLocaleLowerCase()) === -1
                , "myNameTextVisitedReveal": uncoverLetter & visitedPages.indexOf(String("landing").toLocaleLowerCase()) !== -1
                , "electrifyK": electrifyK
            })}
                onTransitionEnd={function (e) {
                    if (electrifyK === true && letterIndex === 2) {
                        // console.log("name electricity transition?");
                        this.showElectricityFunc();
                    }
                }.bind(this)}
            >{letter}</p>
        )
    }
}

export default MyNameTextLetter;