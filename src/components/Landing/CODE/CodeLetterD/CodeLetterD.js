import React, { Component } from 'react';

import classnames from 'classnames';
import './CodeLetterD.css';
import CodeLetterD_Left from './CodeLetterD_Left';
import CodeLetterD_Top from './CodeLetterD_Top';
import CodeLetterD_TopRight from './CodeLetterD_TopRight';
import CodeLetterD_BottomRight from './CodeLetterD_BottomRight';
import CodeLetterD_Bottom from './CodeLetterD_Bottom';

class CodeLetterD extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate() {
        const { reveal, letterIndex } = this.props;
        if (reveal && !this.state.reveal) {
            var delay = 200 * letterIndex;
            setTimeout(function () {
                this.setState({ reveal: true });
            }.bind(this), delay);
        }
        else if (!reveal && this.state.reveal) {
            this.setState({ reveal: false });
        }
    }

    render() {

        const { animate } = this.props;
        const { reveal } = this.state;
        return (
            <div className={classnames("codeShatterLetter codeLetterD", {
                "animateLetterD": animate
                , "codeLetterD_Reveal": reveal
            })}>
                <CodeLetterD_Left animate={animate} reveal={reveal} />
                <CodeLetterD_Top animate={animate} reveal={reveal} />
                <CodeLetterD_TopRight animate={animate} reveal={reveal} />
                <CodeLetterD_BottomRight animate={animate} reveal={reveal} />
                <CodeLetterD_Bottom animate={animate} reveal={reveal} />
            </div>
        );
    }
}

export default CodeLetterD;