import React, { Component } from 'react'
import classnames from 'classnames';
import './Electricity.css';
import Lottie from 'react-lottie';
import data from './electricity1.json';
import data2 from './electricity2.json';

export class Electricity extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.electricityAnimFinishedFunc = this.props.electricityAnimFinishedFunc;

        // refs
        this.electricityRef = React.createRef();
    }

    componentDidMount() {
        // console.log("electricity component loaded", this.electricityRef.current.anim.isLoaded);

    }

    componentDidUpdate() {
        const { itemIndex, uncoverLogo, showElectricity } = this.props;

        // console.log("itemIndex elec: ", itemIndex);

        // this.electricityRef.current.anim.setSpeed(0.01);
        //         this.electricityRef.current.anim.goToAndStop(2000, false);
        //         this.electricityRef.current.anim.playSegments([[0, 10], [10, 10000]], true);

        if (showElectricity && !this.state.showElectricity && this.electricityRef.current.anim.isLoaded) {
            if (itemIndex === 0 && !this.state.showElectricty) {
                // console.log("elec 0 start");
                this.setState({ showElectricity: true });
            }
            else if (itemIndex === 1 && !this.state.showElectricty) {
                // console.log("elec 1 start");
                setTimeout(function () {
                    this.setState({ showElectricity: true });
                }.bind(this), 2000);
            }
        }
    }

    componentWillUnmount() {
        // this.electricityRef.current.anim.destroy();
        // console.log("electricity unmounted")
    }

    render() {

        const { itemIndex } = this.props;
        const { showElectricity, displayElectricity, destroyElectricity } = this.state;

        var animationData = data;
        if (itemIndex === 1) animationData = data2;
        // else if (itemIndex === 2) animationData = data3;

        const defaultOptions = {
            loop: false,
            autoplay: false,
            animationData: animationData,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <div className={classnames("logoElectricityDiv", {
                "destroyElectricity": destroyElectricity
            })}>
                <Lottie
                    ref={this.electricityRef}
                    eventListeners={[
                        // {
                        //     eventName: "enterFrame",
                        //     callback:
                        //         async function () {
                        //             // console.log(this.elbowLottieRef.current.anim.currentFrame)
                        //             if (
                        //                 this.electricityRef.current.anim.currentFrame >= 1
                        //                 //     && this.props.uncoverLogo
                        //                 //     // && !notified && 
                        //                 //     // && this.state.displayElectricity 
                        //                 //     && itemIndex === 0
                        //             ) {
                        //                 //     // this.electricityRef.current.anim.pause();
                        //                 // pause = true;
                        //                 //     // // if (continueElectricityAnim) this.electricityRef.current.anim.play();

                        //                 //     // notified = true;
                        //                 //     // console.log("electricity notification");

                        //                 //     var num = parseInt(this.electricityRef.current.anim.currentFrame);
                        //                 //     console.log("elec frame", num);
                        //             }

                        //             // console.log("currentFrame: ", this.elbowLottieRef.current.anim.currentFrame);
                        //         }.bind(this)
                        // },
                        {
                            eventName: "complete",
                            callback: async function () {
                                if (this.electricityRef.current.anim.currentFrame > 0) {
                                    // console.log("electricity onComplete", itemIndex);

                                    if (itemIndex === 0) this.electricityAnimFinishedFunc();

                                    // this.electricityRef.current.anim.destroy();
                                    // this.setState({ destroyElectricity: true });
                                }
                            }.bind(this)
                        }
                    ]}

                    options={defaultOptions}
                    // direction={-1}
                    // height={400}
                    // width={400}
                    isStopped={!showElectricity}
                // isPaused={pause}
                />
            </div>
        )
    }
}

export default Electricity;