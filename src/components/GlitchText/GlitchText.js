import React, { Component } from 'react';
import './GlitchText.css';

class GlitchText extends Component {
    render() {

        const { text } = this.props;

        return (
            <div className="glitchTextWrapper">
                <div className="glitchTextInnerWrapper upperTextWrapper">
                    <p className="glitchUpperText">{text}</p>
                </div>
                <div className="glitchTextInnerWrapper lowerTextWrapper">
                    <p className="glitchLowerText">{text}</p>
                </div>
            </div>
        );
    }
}

export default GlitchText;