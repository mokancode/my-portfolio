import React, { Component } from 'react';
import RotatingStrokeText from './RotatingStrokeText';
import './RotatingStrokeText.css';
import classnames from 'classnames';

class RotatingStrokeTextContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {}

        this.notifyRotateAnimEnded = this.props.notifyRotateAnimEnded;
    }

    render() {

        const { text, startAnim, showSecondColor } = this.props;

        return (

            <div className={classnames("rotatingStrokeTextContainer", {
                "startAnim": startAnim
            })}>
                <div className="mainTextWrapper">
                    <h1>{text}</h1>
                    <div className={classnames("secondColorTextWrapper", {
                        "show": showSecondColor
                    })}>
                        <h1 className="secondColorText">Developer</h1>
                    </div>
                </div>
                <div className="rotatingStrokeTextWrapper topRight">
                    <RotatingStrokeText text={text} animType={1} />
                    <RotatingStrokeText text={text} animType={2} />
                    <RotatingStrokeText text={text} animType={3} notifyRotateAnimEnded={this.notifyRotateAnimEnded} />
                </div>

                <div className="rotatingStrokeTextWrapper topLeft">
                    <RotatingStrokeText text={text} animType={1} />
                    <RotatingStrokeText text={text} animType={2} />
                    <RotatingStrokeText text={text} animType={3} />
                </div>

                <div className="rotatingStrokeTextWrapper bottomLeft">
                    <RotatingStrokeText text={text} animType={1} />
                    <RotatingStrokeText text={text} animType={2} />
                    <RotatingStrokeText text={text} animType={3} />
                </div>

                <div className="rotatingStrokeTextWrapper bottomRight">
                    <RotatingStrokeText text={text} animType={1} />
                    <RotatingStrokeText text={text} animType={2} />
                    <RotatingStrokeText text={text} animType={3} />
                </div>
            </div>
        );
    }
}

export default RotatingStrokeTextContainer;