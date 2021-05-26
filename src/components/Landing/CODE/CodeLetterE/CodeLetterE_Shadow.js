import React, { Component } from 'react';
import CodeLetterE_Left from './CodeLetterE_Left';
import classnames from 'classnames';
import './CodeLetterE.css';
import CodeLetterE_TopRight from './CodeLetterE_TopRight';
import CodeLetterE_Right from './CodeLetterE_Right';
import CodeLetterE_Body from './CodeLetterE_Body';
import CodeLetterE_BottomRight from './CodeLetterE_BottomRight';

class CodeLetterE_Shadow extends Component {
    render() {

        const { animate } = this.props;

        return (
            <div className={classnames("codeLetterE codeLetterE_Shadow", {
                // "animateLetterE": animate
            })}>
                <CodeLetterE_Left />
                <CodeLetterE_TopRight />
                <CodeLetterE_Right />
                <CodeLetterE_Body />
                <CodeLetterE_BottomRight />
            </div>
        );
    }
}

export default CodeLetterE_Shadow;