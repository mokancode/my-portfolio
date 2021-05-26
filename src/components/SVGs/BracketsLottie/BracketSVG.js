import React, { Component } from 'react'
import "./BracketSVG.scss";
import Lottie from 'react-lottie';
import data from './dataBrace.json';
import classnames from 'classnames';

// var initialStrokeAnimEnded = false;
export class BracketSVG extends Component {
    constructor(props) {
        super(props);

        this.state = {
            animate: null
            , animatedOnce: false
            , pause: null
            , timesPaused: 0
            , initialStrokeAnimEnded: false
            , restroke: false
            , unstroke: false
            , removeFillLottie: false
            , destroyElbow: false
        };

        this.revealTagSlash = this.props.revealTagSlash;
        this.nameStrokeAnimFinished = this.props.nameStrokeAnimFinished;
        // this.bracketAnimFinishedFunc = this.props.bracketAnimFinishedFunc;

        // refs
        this.elbowLottieRef = React.createRef();
    }

    componentDidMount() {
        // console.log("mount: ", this.elbowLottieRef.current.anim);
        // this.elbowLottieRef.current.anim.addEventListener('data_ready', () => { console.log('data ready') });
        // this.elbowLottieRef.current.anim.addEventListener('onEnterFrame', () => {
        //     console.log('enterFrame', this.elbowLottieRef.current.anim.currentFrame);
        // });

        // console.log("side: ", this.props.side);
        // setTimeout(() => {
        //     this.setState({ fillLottie: true });
        // }, 5000);
    }

    componentDidUpdate() {
        const { anim8, side } = this.props;
        // if (anim8 && this.state.animate === null && !this.state.animatedOnce) {
        //     this.setState({ animatedOnce: true });

        // this.setState({ animate: true });
        // this.elbowLottieRef.current.anim.goToAndStop(5000, false);

        // this.elbowLottieRef.current.anim.setSpeed(0.01);
        // this.elbowLottieRef.current.anim.playSegments([[0, 10], [10, 80]], true);

        // ver 2
        // setTimeout(() => {
        //     this.setState({ fillLottie: true });
        // }, 5000);

        // setTimeout(() => {
        //     this.setState({ animate: true }, function () {
        //         setTimeout(() => {
        //             this.setState({ pause: true }, function () {
        //                 this.revealTagSlash(true);
        //                 setTimeout(() => {
        //                     if (this.state.pause !== null) this.setState({ pause: false });
        //                     this.revealTagSlash(false);
        //                 }, 1300);
        //             }.bind(this));
        //         }, 2200);
        //     }.bind(this));
        // }, 5200);

        // setTimeout(() => {
        //     this.setState({ restroke: true }, function () {
        //         setTimeout(() => {
        //             this.setState({ removeFillLottie: true }, function () {
        //                 setTimeout(() => {
        //                     this.setState({ unstroke: true, restroke: false });
        //                 }, 500);
        //             }.bind(this));
        //         }, 500);
        //     }.bind(this));
        // }, 7000);

        // setTimeout(() => {
        //     this.setState({ destroyElbow: true });
        // }, 11000);
        // }

        // else if (!anim8 && this.state.animate) {
        //     this.setState({ fillLottie: false, animate: false });
        // }
    }

    render() {

        const { anim8, side, itemIndex } = this.props;
        const { removeFillLottie, unstroke, restroke, pause, pushElbowForSlash, animate, fillLottie, destroyElbow, bracketRestrokeAnim } = this.state;
        var { timesPaused, initialStrokeAnimEnded, bracketRemoveAnim } = this.state;
        const defaultOptions = {
            loop: false,
            autoplay: false,
            animationData: data,
            rendererSettings: {
                preserveAspectRatio: 'xMidYMid slice'
            }
        };

        return (
            <div className={classnames("lottieDivWrapper", {
                "lottieDivWrapperTagSlash": pushElbowForSlash
            })}>
                <div className={classnames("lottieDiv", {
                    "lottieDivAnimated": anim8
                    , "bracketFirstAnimateEnded": initialStrokeAnimEnded
                    , "bracketRemoveAnim": bracketRemoveAnim
                    , "bracketRestrokeAnim": bracketRestrokeAnim
                    , "lottieDivFill": fillLottie
                    , "lottieDivDisableTransition": animate
                    , "lottieDivRestroke": restroke
                    , "lottieDivUnstroke": unstroke
                    , "lottieDivRemoveFill": removeFillLottie
                    , "destroyElbow": destroyElbow
                })}
                    onAnimationEnd={function (e) {

                        if (!initialStrokeAnimEnded && !fillLottie) {
                            // await this.setState({
                            //     anim8: false
                            //     , fillLottie: true
                            //     // , animate: true
                            // }, function () {

                            this.setState({ initialStrokeAnimEnded: true }, function () {

                            }.bind(this));

                            this.setState({ fillLottie: true }, function () {
                                setTimeout(function () {
                                    this.setState({ bracketRemoveAnim: true }, function () {
                                        this.setState({ bracketRemoveAnim: false }, function () {
                                            setTimeout(function () {
                                                this.setState({ bracketRestrokeAnim: true });
                                            }.bind(this), 10);
                                        }.bind(this));
                                    }.bind(this));
                                }.bind(this), 1000);
                            }.bind(this));

                            // console.log("finished stroke");

                            // }.bind(this));

                            return;
                        }

                        if (fillLottie && initialStrokeAnimEnded) {
                            // console.log("finished fill, now animating svg")
                            // await this.setState({ fillLottie: false });

                            // setTimeout(() => {
                            this.setState({ animate: true });
                            // }, 500);

                            // this.elbowLottieRef.current.anim.playSegments([[0, 1], [2, 90]], true);
                            // this.elbowLottieRef.current.anim.play();

                            initialStrokeAnimEnded = 2;
                        }
                    }.bind(this)}
                >
                    <Lottie options={defaultOptions}
                        ref={this.elbowLottieRef}
                        eventListeners={[
                            {
                                eventName: "enterFrame",
                                callback: async function () {
                                    // console.log(this.elbowLottieRef.current.anim.currentFrame)
                                    if (this.elbowLottieRef.current.anim.currentFrame >= 80 && timesPaused === 0) {
                                        timesPaused++;
                                        this.setState({ timesPaused });
                                        this.elbowLottieRef.current.anim.pause();

                                        setTimeout(function () {
                                            // this.elbowLottieRef.current.anim.playSegments([90, 135], true);
                                            this.elbowLottieRef.current.anim.play();
                                        }.bind(this), 900);


                                        // console.log('paused', this.elbowLottieRef.current.anim.currentFrame);
                                    }

                                    if (this.elbowLottieRef.current.anim.currentFrame >= 130 && timesPaused === 1) {
                                        timesPaused++;
                                        this.setState({ timesPaused });
                                        // console.log('paused', this.elbowLottieRef.current.anim.currentFrame);
                                        this.elbowLottieRef.current.anim.pause();
                                        this.setState({ pause: true });
                                        setTimeout(function () {
                                            this.setState({
                                                pushElbowForSlash: true
                                                , removeFillLottie: true
                                            }, function () {
                                                setTimeout(function () {
                                                    this.setState({ unstroke: true });
                                                }.bind(this), 1000);
                                            });
                                            this.revealTagSlash(true);
                                            setTimeout(function () {
                                                this.revealTagSlash(false);
                                                setTimeout(function () {
                                                    this.setState({ pushElbowForSlash: false }, function () {
                                                        // this.nameStrokeAnimFinished();
                                                        this.elbowLottieRef.current.anim.play();
                                                    }.bind(this));
                                                }.bind(this), 500);
                                            }.bind(this), 1400);
                                            // this.setState({ pause: false });
                                        }.bind(this), 1000);
                                    }

                                    // console.log("currentFrame: ", this.elbowLottieRef.current.anim.currentFrame);
                                }.bind(this)
                            },
                            {
                                eventName: "complete",
                                callback: async function () {
                                    // console.log('elbow complete', this.elbowLottieRef.current.anim.currentFrame);
                                    if (this.elbowLottieRef.current.anim.currentFrame > 0 && itemIndex === 0) {
                                        // console.log("bracket anim finished")
                                        // this.bracketAnimFinishedFunc();
                                        
                                        // this.elbowLottieRef.current.destroy();
                                        // this.setState({ destroyElbow: true });
                                    }
                                }.bind(this)
                            }
                        ]}

                        // direction={-1}
                        // height={400}
                        // width={400}
                        isStopped={!animate}
                        // isStopped={!anim8}
                        isPaused={pause}
                    // isPaused={this.state.isPaused}
                    />
                </div>
            </div >
        )
    }
}

export default BracketSVG;