import React, { Component } from 'react';
import './BasicTextIcon.css';

class BasicTextIcon extends Component {
    render() {

        const { text, showDelay } = this.props;

        return (
            <div className="basicTextIcon" name={text} style={{ transitionDelay: `${showDelay ? showDelay : 0}ms` }}>
                <p>{text}</p>
            </div>
        );
    }
}

export default BasicTextIcon;