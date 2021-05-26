import React, { Component } from 'react';
import './Staircase.scss';
import './StaircasePageTransitions.css';
import './StaircaseMobile.css';
import Stair from './Stair';
import classnames from 'classnames';

class Staircase extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stairSide: "front"
        };
    }

    render() {

        const { tableSide, stairSide, stairClass, showInnerContent } = this.state;

        return (
            <div className="staircaseDiv">
                <Stair topText="Greetings! :D" index={"0"} />
                <Stair frontText="Let's" index={"1"} />
                <Stair
                    leftText="get"
                    frontText="in"
                    topText="touch"
                    index={"2"}
                />
            </div>
        );
    }
}

export default Staircase;