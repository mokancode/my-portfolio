import React, { Component } from 'react';
import MirrorCarousel from './MirrorCarousel';
import classnames from 'classnames';
import ClosingButtonMasked from '../ClosingButtonMasked/ClosingButtonMasked';
import { showMirrorSlideshow, setWorkItemOpen, setMiscWorkItemOpen, setPullNavBtnContainerHidden, setMiscWIShadowRedux } from '../../actions/stylesActions';
import { connect } from 'react-redux';
import './MirrorCarouselController.scss';
import './MirrorCarouselMobile.css';
import LandscapeAlert from '../LandscapeAlert/LandscapeAlert';
import { useSwipeable, Swipeable } from 'react-swipeable';

class MirrorCarouselController extends Component {
    constructor(props) {
        super(props)
        this.state = {};

        this.resetMoveRight = this.resetMoveRight.bind(this);
        this.resetMoveLeft = this.resetMoveLeft.bind(this);
        this.enableButtons = this.enableButtons.bind(this);
        this.showButtons = this.showButtons.bind(this);
        this.setSlideshowClosed = this.setSlideshowClosed.bind(this);
        this.setLandscapeAcknowledged = this.setLandscapeAcknowledged.bind(this);

        // refs
        this.carouselControllerRef = React.createRef();
    }

    componentDidMount() {

        this.props.setMiscWorkItemOpen(true);
        this.props.setWorkItemOpen(true);

        window.addEventListener("keydown", function (e) {
            const { disableControls, btnsLoaded, closeCarousel } = this.state;
            if (e.keyCode === 37 && !disableControls && btnsLoaded) this.setState({ moveLeft: true, disableControls: true });
            else if (e.keyCode === 39 && !disableControls && btnsLoaded) this.setState({ moveRight: true, disableControls: true });
            else if (e.keyCode === 27 && !closeCarousel) this.setState({ closeCarousel: true });
            // console.log("e", e.keyCode);
        }.bind(this));

        setTimeout(function () {
            this.setState({ mirrorCarouselControllerShow: true });;
        }.bind(this), 100);

        if (window.innerWidth > window.innerHeight && !this.state.isLandscapeAcknowledged) this.setState({ isLandscapeAcknowledged: true });

        // window.addEventListener("resize", function (e) {
        //     const { isLandscapeAcknowledged } = this.state;
        //     if (window.innerWidth > window.innerHeight && !isLandscapeAcknowledged) this.setState({ isLandscapeAcknowledged: true });
        // }.bind(this));

        this.props.setPullNavBtnContainerHidden(true);
    }

    resetMoveRight() {
        this.setState({ moveRight: null });
    }
    resetMoveLeft() {
        this.setState({ moveLeft: null });
    }

    enableButtons() {
        this.setState({ disableControls: false });
    }

    showButtons() {
        this.setState({ loadBtnsClass: true });
    }

    setSlideshowClosed() {
        this.setState({ slideshowClosed: true });
    }

    setLandscapeAcknowledged() {
        this.setState({ isLandscapeAcknowledged: true });
    }

    componentWillUnmount() {
        this.props.setPullNavBtnContainerHidden(false);
        this.props.setMiscWorkItemOpen(false);
        this.props.setWorkItemOpen(false);
    }

    render() {

        const { mirrorCarouselControllerShow, mirrorCarouselControllerLoaded, disableControls, currentIndex, moveRight, moveLeft
            , loadBtnsClass, closeCarousel, slideshowClosed, isLandscapeAcknowledged } = this.state;

        return (


            <div ref={this.carouselControllerRef} className={classnames("mirrorCarouselController", {
                "mirrorCarouselControllerShow": mirrorCarouselControllerShow && !slideshowClosed
            })}
                onTransitionEnd={function (e) {
                    if (mirrorCarouselControllerShow && !mirrorCarouselControllerLoaded) {
                        this.setState({ mirrorCarouselControllerLoaded: true });
                        this.props.setMiscWIShadowRedux(true);
                        // console.log("ctrl loaded");
                    }
                    if (slideshowClosed && this.carouselControllerRef.current === e.target) {
                        this.props.showMirrorSlideshow(false);
                        this.props.setMiscWIShadowRedux(false);
                        // console.log("ctrl opacity off");
                    }
                }.bind(this)}
            >
                <Swipeable
                    className="mirrorCarouselControllerInnerWrapper"
                    // ref={this.tempRef}
                    onSwiped={function (eventData) {
                        // console.log("swipe", eventData);
                        if (eventData.dir === "Left") {
                            if (disableControls) return;
                            this.setState({ moveRight: true })
                            if (!disableControls) this.setState({ disableControls: true });
                        }
                        else if (eventData.dir === "Right") {
                            if (disableControls) return;
                            this.setState({ moveLeft: true })
                            if (!disableControls) this.setState({ disableControls: true });
                        }
                    }.bind(this)}
                >
                    <LandscapeAlert setLandscapeAcknowledged={this.setLandscapeAcknowledged} landscapeAlertAcknowledgedParent={isLandscapeAcknowledged} />

                    <div className="mirrorCarouselCloseBtn" onClick={function () {
                        if (!closeCarousel) this.setState({ closeCarousel: true });
                    }.bind(this)}>
                        <ClosingButtonMasked showButton={mirrorCarouselControllerLoaded && !closeCarousel && isLandscapeAcknowledged} />
                    </div>

                    <div className="mirrorCarouselAndControlsWrapper">
                        <div className="slideshowBtnAndReflectionDiv"
                            disabled={disableControls}
                            onClick={function (e) {
                                if (disableControls) return;
                                this.setState({ moveLeft: true })
                                if (!disableControls) this.setState({ disableControls: true });
                            }.bind(this)}>
                            <button className={classnames("slideshowBtn slideshowPrevImgButton", {
                                "slideshowBtnShow": loadBtnsClass && !closeCarousel
                            })}
                                onTransitionEnd={function (e) {
                                    e.stopPropagation();
                                    if (loadBtnsClass && !this.state.btnsLoaded) this.setState({ btnsLoaded: true });
                                }.bind(this)}
                            >{"<"}</button>
                            <button className={classnames("slideshowBtnReflection", {
                                "slideshowBtnReflectionShow": loadBtnsClass && !closeCarousel
                            })}
                                onTransitionEnd={function (e) {
                                    e.stopPropagation();
                                }.bind(this)}
                            >{"<"}</button>
                        </div>

                        <div className="mirrorCarouselContainer">
                            <MirrorCarousel startingIndex={0} moveRight={moveRight} moveLeft={moveLeft} resetMoveRight={this.resetMoveRight} resetMoveLeft={this.resetMoveLeft}
                                disableControls={disableControls} enableButtons={this.enableButtons} mirrorCarouselControllerLoaded={mirrorCarouselControllerLoaded && isLandscapeAcknowledged}
                                closeCarousel={closeCarousel} slideshowClosed={slideshowClosed} setSlideshowClosed={this.setSlideshowClosed}
                            />
                            <MirrorCarousel startingIndex={1} moveRight={moveRight} moveLeft={moveLeft} resetMoveRight={this.resetMoveRight} resetMoveLeft={this.resetMoveLeft}
                                disableControls={disableControls} enableButtons={this.enableButtons} mirrorCarouselControllerLoaded={mirrorCarouselControllerLoaded && isLandscapeAcknowledged}
                                closeCarousel={closeCarousel} slideshowClosed={slideshowClosed} setSlideshowClosed={this.setSlideshowClosed}
                            />
                            <MirrorCarousel startingIndex={2} moveRight={moveRight} moveLeft={moveLeft} resetMoveRight={this.resetMoveRight} resetMoveLeft={this.resetMoveLeft}
                                disableControls={disableControls} enableButtons={this.enableButtons} mirrorCarouselControllerLoaded={mirrorCarouselControllerLoaded && isLandscapeAcknowledged}
                                closeCarousel={closeCarousel} slideshowClosed={slideshowClosed} setSlideshowClosed={this.setSlideshowClosed}
                                showButtons={this.showButtons} loadBtnsClass={loadBtnsClass}
                            />
                            <MirrorCarousel startingIndex={3} moveRight={moveRight} moveLeft={moveLeft} resetMoveRight={this.resetMoveRight} resetMoveLeft={this.resetMoveLeft}
                                disableControls={disableControls} enableButtons={this.enableButtons} mirrorCarouselControllerLoaded={mirrorCarouselControllerLoaded && isLandscapeAcknowledged}
                                closeCarousel={closeCarousel} slideshowClosed={slideshowClosed} setSlideshowClosed={this.setSlideshowClosed}
                            />
                            <MirrorCarousel startingIndex={4} moveRight={moveRight} moveLeft={moveLeft} resetMoveRight={this.resetMoveRight} resetMoveLeft={this.resetMoveLeft}
                                disableControls={disableControls} enableButtons={this.enableButtons} mirrorCarouselControllerLoaded={mirrorCarouselControllerLoaded && isLandscapeAcknowledged}
                                closeCarousel={closeCarousel} slideshowClosed={slideshowClosed} setSlideshowClosed={this.setSlideshowClosed}
                            />
                        </div>

                        <div className="slideshowBtnAndReflectionDiv"
                            disabled={disableControls}
                            onClick={function (e) {
                                if (disableControls) return;
                                this.setState({ moveRight: true })
                                if (!disableControls) this.setState({ disableControls: true });
                            }.bind(this)}>
                            <button className={classnames("slideshowBtn slideshowNextImgButton", {
                                "slideshowBtnShow": loadBtnsClass && !closeCarousel
                            })}
                                onTransitionEnd={function (e) {
                                    e.stopPropagation();
                                }.bind(this)}
                            > {">"}</button>
                            <button className={classnames("slideshowBtnReflection", {
                                "slideshowBtnReflectionShow": loadBtnsClass && !closeCarousel
                            })}
                                onTransitionEnd={function (e) {
                                    e.stopPropagation();
                                }.bind(this)}
                            >{">"}</button>
                        </div>
                    </div>
                </Swipeable>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        navbar: state.navbar,
        styles: state.styles,
    }
}

export default connect(mapStateToProps, { showMirrorSlideshow, setWorkItemOpen, setMiscWorkItemOpen, setPullNavBtnContainerHidden, setMiscWIShadowRedux })(MirrorCarouselController);
// export default MirrorCarouselController;