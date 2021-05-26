import React, { Component } from 'react';
import './AdobeIcon.css';

class AdobeIcon extends Component {
    render() {

        const { text } = this.props;

        return (
            <div className="adobeIcon" name={text}>
                <p>{text}</p>
            </div>
        );
    }
}

export default AdobeIcon;