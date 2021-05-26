import React, { Component } from 'react';
import classnames from 'classnames';
import './MenuLine.css'
import Lottie from 'react-lottie';
import data from './line1.json';
import data2 from './line2.json';
import data3 from './line3.json';

export class MenuLine extends Component {
    constructor(props) {
        super(props);
        this.state = {
            play: false
        };

        this.removeLines = this.props.removeLines;
    }

    componentDidMount() {
        const { itemIndex } = this.props;
        var animData;
        if (itemIndex === 0) animData = JSON.parse(JSON.stringify(data));
        else if (itemIndex === 1) animData = JSON.parse(JSON.stringify(data2));
        else if (itemIndex === 2) animData = JSON.parse(JSON.stringify(data3));
        this.setState({ animData });
    }

    componentDidUpdate() {
        const { stop, itemIndex } = this.props;

        // console.log("itemIndex: ", itemIndex);


        if (!stop && !this.state.play) {
            var delay = itemIndex * 50;
            // var delay = itemIndex * 50;
            // setTimeout(() => {
            this.setState({ play: true }, function () {
                if (itemIndex === 2) {
                    setTimeout(function() {
                        this.removeLines();
                    }.bind(this), 1400);
                }
            }.bind(this));
            // }, delay);
        }
    }

    render() {

        const { pause, play, animData } = this.state;
        const { itemIndex, remove } = this.props;

        const defaultOptions = {
            loop: false,
            autoplay: false,
            animationData: animData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <div className={classnames("menuLineDiv", {
                "removeLine": remove
            })}>
                <Lottie options={defaultOptions}
                    // direction={-1}
                    // height={400}
                    // width={400}
                    isStopped={!play}
                    isPaused={pause}
                />

                <button onClick={function (e) {
                    this.setState(function (prevState) {
                        return {
                            pause: !prevState.pause
                        }
                    }.bind(this))
                }.bind(this)}>Pause {pause}</button>
            </div>

        )
    }
}

export default MenuLine;