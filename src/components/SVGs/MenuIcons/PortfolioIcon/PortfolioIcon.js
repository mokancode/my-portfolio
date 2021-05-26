import React, { Component } from 'react'
import Lottie from 'react-lottie';
import classnames from 'classnames';
import './PortfolioIcon.css';
import data from './data.json';

export class PortfolioIcon extends Component {
    constructor(props) {
        super(props);

        this.state = {
            lastTimeoutId: null
            , direction: 1
            // , stop: true
        };

        // refs
        this.portfolioLottieRef = React.createRef();
    }

    componentDidMount() {
        const animData = JSON.parse(JSON.stringify(data));
        this.setState({ animData });
        // console.log("animData 1: ", animData);
        // console.log("animData 2: ", animData);
        if (this.props.showIcon) console.log("portfolio icon show mount")
    }

    componentDidUpdate() {

        // if (this.props.showIcon) console.log("portfolio icon show")
        // const showIconProps = this.props.showIcon;
        // if (!showIcon && showIconProps) {
        //     showIcon = showIconProps;
        //     console.log("portfolio showIcon 1: ", showIcon);
        // } else if (showIcon && !showIconProps) {
        //     showIcon = showIconProps;
        //     console.log("portfolio showIcon 2: ", showIcon);
        // }

        // const { showIcon } = this.props;
        // const { displayIcon } = this.state;
        // if (showicon && !displayIcon) this.setState({ displayIcon: true });
        // else if (!showicon && displayIcon) this.setState({ displayIcon: false });
    }

    // componentWillUnmount() {
    //     this.portfolioLottieRef.anim.stop();
    // }

    render() {

        const { direction, stop, hideIcon, animData } = this.state;
        const { showIcon } = this.props;

        const defaultOptions = {
            loop: false,
            autoplay: false,
            animationData: animData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <div className={classnames("portfolioIconDivWrapper", {
                "portfolioIconHide": hideIcon
            })}
            // onMouseEnter={function (e) {
            //     this.setState({
            //         direction: 1
            //         // , stop: false 
            //     })
            // }.bind(this)}
            // onMouseLeave={function (e) {
            //     this.setState({ direction: -1 })
            // }.bind(this)}
            >
                <div className={classnames("portfolioIconDiv", {

                })}>
                    <Lottie
                        ref={this.portfolioLottieRef}
                        eventListeners={[
                            {
                                eventName: "enterFrame",
                                callback: async function () {
                                    // console.log("portfolio lottie frame: ", this.portfolioLottieRef.current.anim.currentFrame);
                                    if (this.portfolioLottieRef.current.anim.currentFrame === 0) this.setState({ hideIcon: true });
                                    else this.setState({ hideIcon: false });
                                }.bind(this)
                            },
                            // {
                            //     eventName: "complete",
                            //     callback: async function () {
                            //         if (this.portfolioLottieRef.current.anim.currentFrame > 0)
                            //             console.log("portfolio onComplete");
                            //     }.bind(this)
                            // }

                        ]}


                        options={defaultOptions}
                        // direction={direction}
                        direction={showIcon ? 1 : -1}
                        // height={400}
                        // width={400}
                        isStopped={false}
                        // isPaused={pause}
                        // isPaused={this.state.isPaused}
                        isClickToPauseDisabled={true}
                    />
                </div>
            </div>
        )
    }
}

export default PortfolioIcon;