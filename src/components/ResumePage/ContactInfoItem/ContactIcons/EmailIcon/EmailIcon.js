import React, { Component } from 'react';
import './EmailIcon.css';
import classnames from 'classnames';

class EmailIcon extends Component {
    render() {

        const { show, showDelay } = this.props;

        return (
            <svg className={classnames("emailIconSVG", {
                "show": show
            })} x="0px" y="0px" viewBox="0 0 411 208" style={{ "enableBackground": "new 0 0 411 208", transitionDelay: `${showDelay}ms` }}
                preserveAspectRatio="none"
            >
                <g>
                    <path className="emailIconPath0" d="M8.24,204.5c-2.61,0-4.74-2.13-4.74-4.74V8.24c0-2.61,2.13-4.74,4.74-4.74h394.52c2.61,0,4.74,2.13,4.74,4.74
            v191.52c0,2.61-2.13,4.74-4.74,4.74H8.24z"/>
                    <path className="emailIconPath0" d="M402.76,7c0.68,0,1.24,0.56,1.24,1.24v191.52c0,0.68-0.56,1.24-1.24,1.24H8.24C7.56,201,7,200.44,7,199.76V8.24
            C7,7.56,7.56,7,8.24,7H402.76 M402.76,0H8.24C3.69,0,0,3.69,0,8.24v191.52c0,4.55,3.69,8.24,8.24,8.24h394.52
            c4.55,0,8.24-3.69,8.24-8.24V8.24C411,3.69,407.31,0,402.76,0L402.76,0z"/>
                </g>
                <polyline className="emailIconPath1" points="8.5,202.5 208.5,69.5 405.5,202.5 " />
                <polyline className="emailIconPath2" points="405.5,7.5 209.31,132.5 7.5,6.5 " />
            </svg>
        );
    }
}

export default EmailIcon;