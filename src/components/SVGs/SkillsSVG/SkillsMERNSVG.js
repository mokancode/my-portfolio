import React, { Component } from 'react'
import Lottie from 'react-lottie';
import data from './skillMERN.json';
import classnames from 'classnames';

// var initialStrokeAnimEnded = false;
export class SkillsMERNSVG extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: false
        };

        // refs
        this.skillsLottieRef = React.createRef();
    }

    componentDidMount() {
        // this.skillsLottieRef.current.anim.setSpeed(1);
    }

    componentDidUpdate() {
        const { uncoverLogo } = this.props;
        const { start } = this.state;

        if (uncoverLogo && !start) {
            setTimeout(function () {
                this.setState({ start: true });
            }.bind(this), 2000);
        }
    }

    render() {

        const { start } = this.state;

        const defaultOptions = {
            loop: false,
            autoplay: false,
            animationData: data,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <div className={classnames("skillsSVGDivWrapper skillsMERNSVGDivWrapper", {
            })}>
                <Lottie options={defaultOptions}
                    ref={this.skillsLottieRef}
                    eventListeners={[
                        {
                            eventName: "enterFrame",
                            callback: async function () {
                            }.bind(this)
                        },
                        {
                            eventName: "complete",
                            callback: async function () {
                                if (this.skillsLottieRef.current.anim.currentFrame > 0) {
                                    // console.log('skill complete', this.skillsLottieRef.current.anim.currentFrame);
                                    // this.skillsLottieRef.current.destroy();
                                    // this.setState({ destroy: true });
                                }
                            }.bind(this)
                        }
                    ]}

                    // direction={-1}
                    // height={400}
                    // width={400}
                    isStopped={!start}
                    // isStopped={!anim8}
                    isPaused={false}
                    isClickToPauseDisabled={true}
                />
            </div>
        )
    }
}

export default SkillsMERNSVG;