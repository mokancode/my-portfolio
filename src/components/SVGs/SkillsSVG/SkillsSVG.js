import React, { Component } from 'react'
import "./SkillsSVG.css";
import Lottie from 'react-lottie';
import data from './skillWords.json';
import classnames from 'classnames';

// var initialStrokeAnimEnded = false;
export class SkillsSVG extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: false
            , isMounted: false
        };


        this.skillAnimFinishedFunc = this.props.skillAnimFinishedFunc;

        // refs
        this.skillsLottieRef = React.createRef();
    }

    componentDidMount() {
        // this.skillsLottieRef.current.anim.setSpeed(1);
        this.setState({ isMounted: true });
    }

    componentDidUpdate() {
        const { uncoverLogo } = this.props;
        const { start } = this.state;

        if (uncoverLogo && !start) {
            setTimeout(function() {
                this.setState({ start: true });
            }.bind(this), 2000);
        }
    }

    componentWillUnmount() {
        // this.skillsLottieRef.current.anim.removeEventListener('enterFrame');
        this.setState({ isMounted: false });
    }

    render() {

        const { start, destroy, isMounted } = this.state;

        const defaultOptions = {
            loop: false,
            autoplay: false,
            animationData: data,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <div className={classnames("skillsSVGDivWrapper skillsWordsSVG", {
                "skillsSVGDestroy": destroy
            })}>
                {/* {isMounted ? */}
                <Lottie options={defaultOptions}
                    ref={this.skillsLottieRef}
                    eventListeners={[
                        // {
                        //     eventName: "enterFrame",
                        //     callback: async function () {
                        //         // if (!isMounted) return;
                        //     }.bind(this)
                        // },
                        {
                            eventName: "complete",
                            callback: async function () {
                                // if (!isMounted) return;
                                if (this.skillsLottieRef.current.anim.currentFrame > 0) {
                                    // console.log('skill complete', this.skillsLottieRef.current.anim.currentFrame);
                                    this.skillAnimFinishedFunc();

                                    // this.skillsLottieRef.current.anim.stop();
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
                {/* : null} */}
            </div>
        )
    }
}

export default SkillsSVG;