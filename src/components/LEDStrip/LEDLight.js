import React, { Component } from 'react';

class LEDLight extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.notifyLEDStripsAreOff = this.props.notifyLEDStripsAreOff;
        this.notifyLEDSsLoaded = this.props.notifyLEDSsLoaded;
    }

    componentDidMount() {
        const { idx, numberOfLEDs } = this.props;
        var delay = Math.abs((numberOfLEDs / 2) - idx) * 100;
        this.setState({ delay });
    }

    render() {

        const { instructionDismissed, idx } = this.props;
        const { delay } = this.state;

        return (
            <div className="LEDLight" style={{ transitionDelay: `${delay}ms` }}
                onTransitionEnd={function (e) {
                    if (idx === 0 && !instructionDismissed) {
                        // console.log("led loaded");
                        this.props.notifyLEDSsLoaded();
                    }

                    if (idx === 0 && instructionDismissed) {
                        // console.log("notify led");
                        this.notifyLEDStripsAreOff();
                    }
                }.bind(this)}
            ></div>
        );
    }
}

export default LEDLight;