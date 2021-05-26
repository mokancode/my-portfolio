import React, { Component } from 'react';
import './PerformanceCube.scss';
import './PerformanceCubeMobile.css';
import classnames from 'classnames';
import W_Slider from '../W_Slider/W_Slider';
import Particles from 'react-particles-js';
import { connect } from 'react-redux';
import { setW_ContainerInPositionShowing } from '../../actions/stylesActions';
import W_RadioGroup from '../W_Slider/W_RadioGroup';
import MiscGroup from '../SVGs/MiscellaneousText/MiscGroup';

class PerformanceCube extends Component {
    constructor(props) {
        super(props)
        this.state = {
            leave: false,
            enter: false,
            showParticles: true
        }

        this.revealSliderWorkItemsFunc = this.props.revealSliderWorkItemsFunc;
        this.returnSliderOffsetFunc = this.props.returnSliderOffsetFunc;
        this.return_W_Item_Pos = this.props.return_W_Item_Pos;
        this.setSliderPage = this.props.setSliderPage;

        // refs
        this.leftSliderBtn = React.createRef();
        this.rightSliderBtn = React.createRef();
    }

    componentDidMount() {
        window.addEventListener("resize", function () {
            this.setState({ showParticles: false }, function () {
                this.setState({ showParticles: true });
            }.bind(this));
        }.bind(this));

        setTimeout(function () {
            this.setState({ revealCube: true });
        }.bind(this), 10);

        window.addEventListener("keydown", function (e) {
            const { isWorkItemOpen, isFingerPointerMotionBlurDismissed } = this.props.styles;
            const { W_Item_Full_WrapperShadow } = this.state;

            var { currentPage } = this.props;
            if (e.keyCode === 37 && !W_Item_Full_WrapperShadow && !isWorkItemOpen && isFingerPointerMotionBlurDismissed) {
                // console.log("left click");
                // this.leftSliderBtn.current.click();
                this.setSliderPage(--currentPage);
            }
            else if (e.keyCode === 39 && !W_Item_Full_WrapperShadow && !isWorkItemOpen && isFingerPointerMotionBlurDismissed) {
                // console.log("right click");
                // this.rightSliderBtn.current.click();
                this.setSliderPage(++currentPage);
            }

        }.bind(this))
    }

    componentWillUnmount() {
        this.props.setW_ContainerInPositionShowing(false);
    }

    render() {

        const { selected_W_Item, paginatedWorkItems, numberOfPages, miniWorkItemsStartingPageIndex } = this.props;
        const { w_Item_Full_WrapperShadowRedux } = this.props.styles;
        const { cubeInPosition, showParticles, cubeLeave, revealCube } = this.state;
        var { currentPage } = this.props;

        return (
            <div className={classnames("performanceCubeWrapper", {
                "performanceCubeWrapperOpacity": revealCube && !cubeLeave
                , "performanceCubeWrapperLeave": cubeLeave
            })}>

                <button className="W_SliderButton prev" ref={this.leftSliderBtn} onClick={function (e) { this.setSliderPage(--currentPage); }.bind(this)}></button>
                <button className="W_SliderButton next" ref={this.rightSliderBtn} onClick={function (e) { this.setSliderPage(++currentPage); }.bind(this)}></button>

                <MiscGroup animate={currentPage >= miniWorkItemsStartingPageIndex} />

                {/* <div className="buttons">
                    <button onClick={() => {
                        this.setState((prevState) => {
                            return {
                                cubeLeave: !prevState.cubeLeave
                            }
                        })
                    }}>{cubeLeave ? "Return" : "Leave"}</button>

                    <button onClick={() => {
                        this.setState((prevState) => {
                            return {
                                returnEnter: !prevState.returnEnter
                            }
                        })
                    }}>{this.state.returnEnter ? "Enter" : "Return"}</button>

                    <button onClick={() => {
                        this.setState((prevState) => {
                            return {
                                showParticles: !prevState.showParticles
                            }
                        })
                    }}>{this.state.showParticles ? "Hide particles" : "Show particles"}</button>
                </div> */}

                <div className={classnames("performanceCube", {
                    "cubeLeave": cubeLeave,
                    "cubeEnter": revealCube && !this.state.returnEnter
                })}
                    onTransitionEnd={function (e) {
                        if (revealCube) {
                            // console.log("performance cube in position");
                            this.props.setW_ContainerInPositionShowing(true);
                            this.revealSliderWorkItemsFunc();
                            this.setState({ cubeInPosition: true });
                            this.props.setMyWorksTextReady(true);
                        }

                    }.bind(this)}
                >
                    <div className="peformanceCubeSidesContainer">
                        <div className="cubeTopWrapper">
                            <div className="cubeSide cubeTop" onTransitionEnd={function (e) { e.stopPropagation() }}></div>
                        </div>

                        <div className="cubeSide cubeFront" onTransitionEnd={function (e) { e.stopPropagation() }}>
                            {this.props.revealSliderWorkItems ?
                                <W_Slider
                                    returnSliderOffsetFunc={this.returnSliderOffsetFunc}
                                    return_W_Item_Pos={this.return_W_Item_Pos}
                                    selected_W_Item={selected_W_Item}
                                    currentPage={currentPage}
                                    paginatedWorkItems={paginatedWorkItems}
                                    setSliderPage={this.setSliderPage}
                                /> : null}

                            {showParticles && !w_Item_Full_WrapperShadowRedux && cubeInPosition ?
                                <div className={
                                    classnames("particlesDiv", {
                                    })
                                } >
                                    <Particles
                                        style={{
                                            minHeight: '100vh',
                                            minWidth: '100vw'
                                        }}
                                        params={{
                                            "particles": {
                                                "number": {
                                                    "value": 200,
                                                    "density": {
                                                        "enable": false,
                                                        "value_area": 1500
                                                    }
                                                },
                                                "line_linked": {
                                                    "enable": false,
                                                    "opacity": 0.02
                                                },
                                                "move": {
                                                    "direction": "right",
                                                    "speed": 0
                                                },
                                                "size": {
                                                    "value": 1
                                                },
                                                "opacity": {
                                                    "anim": {
                                                        "enable": true,
                                                        "speed": 1,
                                                        "opacity_min": 0.05
                                                    }
                                                }
                                            },
                                            "interactivity": {
                                                "events": {
                                                    "onclick": {
                                                        "enable": false,
                                                        "mode": "push"
                                                    }
                                                },
                                                "modes": {
                                                    "push": {
                                                        "particles_nb": 1
                                                    }
                                                }
                                            },
                                            "retina_detect": false
                                        }} />
                                </div>
                                : null}

                        </div>

                        <div className="cubeLeftWrapper">
                            <div className="cubeSide cubeLeft" onTransitionEnd={function (e) { e.stopPropagation() }}></div>
                        </div>

                        <div className="cubeSide cubeBottom" onTransitionEnd={function (e) { e.stopPropagation() }}></div>

                        <div className="cubeRightWrapper">
                            <div className="cubeSide cubeRight" onTransitionEnd={function (e) { e.stopPropagation() }}></div>
                        </div>

                    </div>

                    {numberOfPages > 1 ?
                        <W_RadioGroup
                            numberOfPages={numberOfPages}
                            setSliderPage={this.setSliderPage}
                            currentPage={currentPage}
                            closeRadioGroup={cubeLeave}
                            showRadioGroup={cubeInPosition}
                            miniWorkItemsStartingPageIndex={miniWorkItemsStartingPageIndex}
                        /> : null}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        styles: state.styles
    }
}

export default connect(mapStateToProps, { setW_ContainerInPositionShowing })(PerformanceCube);
// export default PerformanceCube;