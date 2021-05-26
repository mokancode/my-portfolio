import React, { Component } from 'react'
import Lottie from 'react-lottie';
import data from './data.json';
import classnames from 'classnames';
import './ResumeLines.css';

export class ResumeLines extends Component {
    constructor(props) {
        super(props);

        this.state = {
            start: false
            , isMounted: false
        };


        // refs
        this.resumeLinesRef = React.createRef();
    }

    componentDidMount() {
        // setTimeout(function () {
        //     this.setState({ start: true });
        // }.bind(this), 1000);
    }

    componentDidUpdate() {
        if (!this.state.start && this.props.show) setTimeout(function () {
            this.setState({ start: true });
        }.bind(this), 500);
    }

    componentWillUnmount() {
    }

    render() {

        const { start, destroy } = this.state;

        const defaultOptions = {
            loop: false,
            autoplay: false,
            animationData: data,
            rendererSettings: {
                preserveAspectRatio: 'none'
            }
        };

        return (
            <div className={classnames("resumeLinesSVG", {
                "startAnim": start
                // "destroy": destroy
            })}>
                <Lottie options={defaultOptions}
                    ref={this.resumeLinesRef}
                    eventListeners={[
                        // {
                        //     eventName: "enterFrame",
                        //     callback: async function () {
                        //     }.bind(this)
                        // },
                        {
                            eventName: "complete",
                            callback: async function () {
                                // if (!isMounted) return;
                                if (this.resumeLinesRef.current.anim.currentFrame > 0) {
                                    // console.log('resume lines complete', this.resumeLinesRef.current.anim.currentFrame);
                                    // this.resumeLinesRef.current.anim.stop();
                                }
                            }.bind(this)
                        }
                    ]}

                    // direction={-1}
                    // height={400}
                    // width={400}
                    isStopped={!start}
                    isPaused={false}
                    isClickToPauseDisabled={true}
                />
            </div>
        )
    }
}

export default ResumeLines;