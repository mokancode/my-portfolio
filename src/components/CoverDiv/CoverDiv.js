import React, { Component } from 'react'
import './CoverDiv.css';
import classnames from 'classnames';

export class CoverDiv extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidMount() {
        setTimeout(function() {
            this.setState({ uncover: true });
        }.bind(this), 1000);

        setTimeout(function() {
            this.setState({ hideCover: true });
        }.bind(this), 5000);
    }

    render() {

        const {
            uncover,
            hideCover } = this.state;
        const { leftText1, rightText1 } = this.props;
        // const { uncover } = this.props;

        return (
            <div className={classnames("coverDiv", {
                "hideCover": hideCover
            })}>
                <div className={classnames("leftCover", {
                    "leftUncover": uncover
                })}>
                    {/* <p className="textCover leftTextCover1">{leftText1}</p> */}
                </div>
                <div className={classnames("rightCover", {
                    "rightUncover": uncover
                })}>
                    {/* <p className="textCover rightTextCover1">{rightText1}</p> */}
                </div>
            </div>
        )
    }
}

export default CoverDiv;