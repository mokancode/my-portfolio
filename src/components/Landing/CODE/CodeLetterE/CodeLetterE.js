import React, { Component } from 'react';
import CodeLetterE_Left from './CodeLetterE_Left';
import classnames from 'classnames';
import './CodeLetterE.css';
import CodeLetterE_TopRight from './CodeLetterE_TopRight';
import CodeLetterE_Right from './CodeLetterE_Right';
import CodeLetterE_Body from './CodeLetterE_Body';
import CodeLetterE_BottomRight from './CodeLetterE_BottomRight';
import CodeLetterE_Shadow from './CodeLetterE_Shadow';

class CodeLetterE extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.notifyRevealEnded = this.props.notifyRevealEnded;
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
            <div className={classnames("codeShatterLetter codeLetterE", {
                "animateLetterE": animate
            })}>
                <CodeLetterE_Left animate={animate} reveal={reveal} />
                <CodeLetterE_TopRight animate={animate} reveal={reveal} />
                <CodeLetterE_Right animate={animate} reveal={reveal} />
                <CodeLetterE_Body animate={animate} reveal={reveal} notifyRevealEnded={this.notifyRevealEnded} />
                <CodeLetterE_BottomRight animate={animate} reveal={reveal} />

                {/* <CodeLetterE_Shadow animate={animate} reveal={reveal} /> */}
            </div>
        );
    }
}

export default CodeLetterE;