import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { setCursorBtn } from '../../actions/stylesActions';
import isEmpty from '../../validation/is-empty';

class W_ImageSliderRadioItem extends Component {
    constructor(props) {
        super(props);

        this.state = {};

        this.setCurrentIndex = this.props.setCurrentIndex;

        // refs
        this.labelRef = React.createRef();
    }

    componentDidMount() {
        const { index } = this.props;
        const animationDelay = index * 20;
        this.setState({ animationDelay });

    }

    render() {

        const { index, imageItem, showImages, allWidthsSetState, currentIndex, hideRadioGroup } = this.props;
        const { animationDelay } = this.state;

        return (
            <div className={classnames("W_ImageSliderRadioItemContainer", {
                "W_ImageSliderRadioItemContainer_Hide": hideRadioGroup
            })} style={{ transitionDelay: `${animationDelay}ms` }}

                onClick={function (e) {
                    e.stopPropagation();
                    this.setCurrentIndex(index);
                }.bind(this)}

            // onMouseOver={function (e) {
            //     e.stopPropagation();
            //     if (!this.props.styles.isCursorOnBtn) {
            //         this.props.setCursorBtn(true);
            //     }
            // }.bind(this)}

            // onMouseLeave={function (e) {
            //     e.stopPropagation();
            //     if (this.props.styles.isCursorOnBtn) {
            //         this.props.setCursorBtn(false);
            //     }
            // }.bind(this)}
            >
                <input type="radio" name="W_ImageSlider_CurrentImageIndex" value={index}
                    // defaultChecked={index === 0}
                    checked={currentIndex === index}
                    onChange={function () {
                        this.setCurrentIndex(index);
                    }.bind(this)}
                ></input>
                <label ref={this.labelRef} className={classnames("W_ImageSliderRadioLabel", {

                })}
                    style={{ animationDelay: `${animationDelay}ms` }}
                    onAnimationEnd={function () {
                        var { x, y } = this.labelRef.current.getBoundingClientRect();
                    }.bind(this)}
                    onClick={function (e) {
                        var { x, y } = this.labelRef.current.getBoundingClientRect();
                        // console.log("label pos", x, y);
                    }.bind(this)}
                ></label>
                <div className={classnames("pageNameWrapper", {
                    "pageNameWrapperReveal": showImages && allWidthsSetState
                    , "pageNameWrapperShow": currentIndex === index
                })}>
                    <p>{imageItem.name}</p>
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

export default connect(mapStateToProps, { setCursorBtn })(W_ImageSliderRadioItem);
// export default W_ImageSliderRadioItem;