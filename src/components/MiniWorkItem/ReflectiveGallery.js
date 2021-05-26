import React, { Component } from 'react';
import Logo from "./Logo/Logo";
import './MiniWorkItem.scss';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { showMirrorSlideshow } from '../../actions/stylesActions';

export class ReflectiveGallery extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    componentDidUpdate() {
        const { showWorkItem } = this.props;
        if (showWorkItem && !this.state.extendBar) {
            setTimeout(function () {
                this.setState({ extendBar: true });
            }.bind(this), 10);
        }
    }

    render() {

        const { loadText, extendBar, centerLogoTextShow } = this.state;
        const { descriptionOfWork, showWorkItem } = this.props;

        return (
            <div className={classnames("miniWorkItemDiv reflectiveGalleryDiv", {
                // "miniWorkItemDivShow": true
                "reflectiveGalleryDivBarExtend": extendBar
            })}

                onTransitionEnd={function () {
                    // console.log("reflective gallery transition end");
                    if (extendBar && !loadText) this.setState({ loadText: true });
                }.bind(this)}

                onClick={function () {
                    this.props.showMirrorSlideshow(true);
                }.bind(this)}

            // onMouseEnter={function () {
            //     if (!centerLogoTextShow) this.setState({ centerLogoTextShow: true });
            // }.bind(this)}
            // onMouseLeave={function () {
            //     if (centerLogoTextShow) this.setState({ centerLogoTextShow: false });
            // }.bind(this)}
            >
                <div className="miniWorkItemlogoDiv">
                    <Logo loadText={loadText} centerLogoTextShow={centerLogoTextShow} />
                </div>
                {/* {!isEmpty(descriptionOfWork) ? */}
                <p className="miniWorkDescription">{"A creative slideshow with a reflection effect"}</p>
                {/* : null} */}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        navbar: state.navbar,
        styles: state.styles,
    }
}

export default connect(mapStateToProps, { showMirrorSlideshow })(ReflectiveGallery);
// export default ReflectiveGallery;