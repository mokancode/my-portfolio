import React, { Component } from 'react';
import MobileSlideshowRadioGroup from './MobileSlideshowRadioGroup';
import './MobileSlideshowContainer.scss';
import MobileSlideshowGallery from './MobileSlideshowGallery';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { setWImageSliderClosed } from '../../actions/stylesActions';
import isEmpty from '../../is-empty';

class MobileSlideshowContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            currentIndex: 0
        };

        this.setCurrentIndex = this.setCurrentIndex.bind(this)
        this.removeShadow = this.props.removeShadow;
    }

    componentDidMount() {
        window.addEventListener("keydown", function (e) {
            const { hideControls } = this.state;
            if (e.keyCode === 37) {
                // console.log("keycode 37");
                var { currentIndex } = this.state;
                this.setCurrentIndex(--currentIndex);
                if (!hideControls) this.setState({ hideControls: true });
            }
            else if (e.keyCode === 39) {
                // console.log("keycode 39");
                var { currentIndex } = this.state;
                this.setCurrentIndex(++currentIndex);
                if (!hideControls) this.setState({ hideControls: true });
            }

        }.bind(this))

        setTimeout(function (e) {
            this.setState({ showContainer: true });
        }.bind(this), 50);

        window.localStorage.setItem("portfolioMobileSlideshowControlsInstructions", JSON.stringify(false));

        if (!isEmpty(window.localStorage.getItem("portfolioMobileSlideshowControlsInstructions"))) {
            this.setState({ hideControls: JSON.parse(window.localStorage.getItem("portfolioMobileSlideshowControlsInstructions")) });
        }
    }

    componentDidUpdate() {
        const { closeWorkItem } = this.props;
        const { containerIsShowing, closeImageSlider } = this.state;
        if (closeWorkItem && !containerIsShowing && !closeImageSlider) {
            this.setState({ closeImageSlider: true });
            // this.props.setWImageSliderClosed(true);
        }
    }

    setCurrentIndex(currentIndex) {
        const { mobileImages } = this.props;
        // console.log("currentindex", currentIndex);
        if (currentIndex < 0) currentIndex = mobileImages.length - 1;
        if (currentIndex > mobileImages.length - 1) currentIndex = 0;
        this.setState({ currentIndex });
    }

    render() {

        var { currentIndex, showContainer, containerIsShowing, hideControls } = this.state;
        const { mobileImages, closeWorkItem, isMiscWorkItem, workItemLinkExists } = this.props;

        return (
            <div className={classnames("mobileSlideshowContainer", {
                "showMobileSlideshowContainer": showContainer
                , "hideMobileSlideshowContainer": closeWorkItem
                , "mobileSlideshowContainer_Misc": isMiscWorkItem
                , "workItemLinkExists": workItemLinkExists
            })}
                onTransitionEnd={function (e) {
                    // if (closeWorkItem && !this.props.styles.W_ImageSliderClosed) {
                    if (closeWorkItem) {
                        // console.log("container closing");
                        this.props.setWImageSliderClosed(true);
                        if (isMiscWorkItem) this.removeShadow();
                    }
                    if (showContainer && !containerIsShowing) {
                        e.stopPropagation();
                        this.setState({ containerIsShowing: true });
                    }
                }.bind(this)}
            >
                {!isEmpty(mobileImages) ?
                    <div className="mobileSlideshowContentAndButtonsWrapper">
                        <MobileSlideshowGallery mobileImages={mobileImages} currentIndex={currentIndex} />
                        <MobileSlideshowRadioGroup mobileImages={mobileImages} currentIndex={currentIndex} setCurrentIndex={this.setCurrentIndex} />
                        <div className={classnames("mobileSlideshow_onScreenControls", {
                            "hideMobileSlideshow_onScreenControls": hideControls
                        })}>
                            <div className="mobileSlideshow_onScreenControls_ButtonsWrapper">
                                <button
                                    onClick={function (e) {
                                        e.stopPropagation();
                                        if (!hideControls) {
                                            window.localStorage.setItem("portfolioMobileSlideshowControlsInstructions", JSON.stringify(true));
                                            this.setState({ hideControls: true })
                                        }

                                        else if (hideControls) this.setCurrentIndex(--currentIndex);
                                    }.bind(this)}
                                    className={classnames("mobileSlideshow_onScreenControls_LeftButton", {
                                        "hideMobileSlideshow_onScreenControls": hideControls
                                    })}>Tap for left</button>
                                <button
                                    onClick={function (e) {
                                        e.stopPropagation();
                                        if (!hideControls) {
                                            window.localStorage.setItem("portfolioMobileSlideshowControlsInstructions", JSON.stringify(true));
                                            this.setState({ hideControls: true })
                                        }
                                        else if (hideControls) this.setCurrentIndex(++currentIndex);
                                    }.bind(this)}
                                    className={classnames("mobileSlideshow_onScreenControls_RightButton", {
                                        "hideMobileSlideshow_onScreenControls": hideControls
                                    })}>Tap for right</button>
                            </div>
                            <button className="mobileSlideshow_onScreenControls_Exit"
                                onClick={function (e) {
                                    if (!hideControls) {
                                        e.stopPropagation();
                                        this.setState({ hideControls: true })
                                    }
                                }.bind(this)}>
                                Tap to exit
                    </button>
                        </div>
                    </div>
                    : null}
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        styles: state.styles
    }
}

export default connect(mapStateToProps, { setWImageSliderClosed })(MobileSlideshowContainer);
// export default MobileSlideshowContainer;