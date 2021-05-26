import React, { Component } from 'react';
import './ClosingButtonMasked.scss';
import classnames from 'classnames';

class ClosingButtonMasked extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showButton: false
        };
    }

    componentDidUpdate() {
        const { showButton } = this.props;
        if (showButton !== this.state.showButton) setTimeout(function() {
            this.setState({ showButton });
        }.bind(this), 10);
    }

    render() {

        const { showButton } = this.state;

        return (
            <div className={classnames("closingBtnMaskedWrapper", {
                "closingBtnMaskedWrapperShow": showButton
            })}>
                <div className="closingBtnCircle"
                    onTransitionEnd={function (e) {
                        e.stopPropagation();
                    }.bind(this)}
                ></div>
            </div>
        );
    }
}

export default ClosingButtonMasked;