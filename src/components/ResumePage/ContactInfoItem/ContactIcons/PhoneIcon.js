import React, { Component } from 'react';
import classnames from 'classnames';
import './PhoneIcon.css';

class PhoneIcon extends Component {
    render() {

        const { show, showDelay } = this.props;

        return (
            <div className={classnames("phoneIcon", {
                "show": show
            })} style={{ transitionDelay: `${showDelay}ms` }}
            >
                <div className="notch"></div>
                <div className="navigationBar"></div>
            </div>
        );
    }
}

export default PhoneIcon;