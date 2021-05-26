import React, { Component } from 'react'
import Lottie from 'react-lottie';
import data from './skillLines.json';
import classnames from 'classnames';

// var initialStrokeAnimEnded = false;
export class SkillLinesSVG extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: false
            , isMounted: false
        };

        // refs
        this.skillsLottieRef = React.createRef();
    }

    componentDidMount() {
        // this.skillsLottieRef.current.anim.setSpeed(1);
    }

    componentWillUnmount() {
        this.setState({ isMounted: false });
    }

    componentDidUpdate() {
        const { uncoverLogo } = this.props;
        const { start } = this.state;

        if (uncoverLogo && !start) {
            // console.log("skill update");
            setTimeout(function () {
                this.setState({ start: true });
            }.bind(this), 2000);
        }
    }

    render() {

        const { start, isMounted } = this.state;

        const defaultOptions = {
            loop: false,
            autoplay: false,
            animationData: data,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <div className={classnames("skillsSVGDivWrapper skillLinesSVGDivWrapper", {
            })}>
                <Lottie options={defaultOptions}
                    ref={this.skillsLottieRef}
                    eventListeners={[
                        {
                            eventName: "enterFrame",
                            callback: async function () {
                                if (!isMounted) return;
                            }.bind(this)
                        },
                        {
                            eventName: "complete",
                            callback: async function () {
                                if (!isMounted) return;

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

export default SkillLinesSVG;