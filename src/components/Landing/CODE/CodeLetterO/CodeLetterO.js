import React, { Component } from 'react';
import CodeLetterO_Left from './CodeLetterO_Left';
import CodeLetterO_RightInner from './CodeLetterO_RightInner';
import CodeLetterO_Bottom from './CodeLetterO_Bottom';
import CodeLetterO_Top from './CodeLetterO_Top';

import classnames from 'classnames';
import './CodeLetterO.css';

class CodeLetterO extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate() {
        const { reveal, letterIndex } = this.props;
        if (reveal && !this.state.reveal) {
            var delay = 200 * letterIndex;
            var delay2 = 200 * letterIndex + 4000;
            setTimeout(function () {
                this.setState({ reveal: true });
            }.bind(this), delay);
        }
        else if (!reveal && this.state.reveal) {
            setTimeout(function () {
                this.setState({ reveal: false });
            }.bind(this), delay2);
        }
    }

    render() {

        const { animate } = this.props;
        const { reveal } = this.state;

        return (
            <div className={classnames("codeShatterLetter codeLetterO", {
                "animateLetterO": animate
            })}>
                <CodeLetterO_Left animate={animate} reveal={reveal} />
                <CodeLetterO_RightInner animate={animate} reveal={reveal} />
                <CodeLetterO_Bottom animate={animate} reveal={reveal} />
                <CodeLetterO_Top animate={animate} reveal={reveal} />
            </div>
        );
    }
}

export default CodeLetterO;