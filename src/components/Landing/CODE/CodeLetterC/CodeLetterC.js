import React, { Component } from 'react';
import './CodeLetterC.css';
import CodeLetterC_TopLeft from './CodeLetterC_TopLeft';
import CodeLetterCBody from './CodeLetterCBody';
import CodeLetterC_BottomRight from './CodeLetterC_BottomRight';
import CodeLetterC_TopRight from './CodeLetterC_TopRight';
import classnames from 'classnames';

class CodeLetterC extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidUpdate() {
        const { reveal } = this.props;
        if (reveal && !this.state.reveal) this.setState({ reveal: true });
        else if (!reveal && this.state.reveal) this.setState({ reveal: false });
    }

    render() {

        const { animate } = this.props;
        const { reveal } = this.state;

        return (
            <div className={classnames("codeShatterLetter codeLetterC", {
                "animateLetterC": animate
                , "codeLetterC_Reveal": reveal
            })}>
                <CodeLetterCBody animate={animate} reveal={reveal} />
                <CodeLetterC_TopLeft animate={animate} reveal={reveal} />
                <CodeLetterC_BottomRight animate={animate} reveal={reveal} />
                <CodeLetterC_TopRight animate={animate} reveal={reveal} />
            </div>
        );
    }
}

export default CodeLetterC;