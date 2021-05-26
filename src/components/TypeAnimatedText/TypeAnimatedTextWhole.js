import React, { Component } from 'react';
import classnames from 'classnames';
import { connect } from 'react-redux';
import { setTypeAnimatedTextAnimState } from '../../actions/stylesActions';

class TypeAnimatedTextWhole extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.hideDiv = this.props.hideDiv;
        this.setHideTextDiv = this.props.setHideTextDiv;
        this.closeWorkItemFunc = this.props.closeWorkItemFunc;
        this.textFinishedLoading = this.props.textFinishedLoading;
    }

    componentWillUnmount() {
        this.props.setTypeAnimatedTextAnimState(null);
    }

    render() {

        const { text, animateText, closeWorkItem } = this.props;
        const { hideDiv } = this.state;

        return (
            <div className={classnames("typeWriterWord typeWriterTextWhole", {
                // "hideTypeWriterWord": closeWorkItem
            })}
                onTransitionEnd={function () {

                    // closing sequence
                    if (closeWorkItem && !hideDiv) {
                        this.setState({ hideDiv: true });
                        this.hideDiv(); // 2 parent compoenents above. Hides DescriptionOfWork.js
                        this.setHideTextDiv(); // 1 parent component above. Hides TypeAnimatedText.js
                        this.closeWorkItemFunc(false, true);
                        // console.log("closing whole");
                    }

                    // opening sequence
                    else if (animateText && !this.state.textFinishedLoading) {
                        this.setState({ textFinishedLoading: true });
                        this.props.setTypeAnimatedTextAnimState(true);
                    }
                }.bind(this)}
            >
                <span className={classnames("typeWriterLetter", {
                    "typeWriterLetterAnimate": animateText
                })}>{text}</span>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        styles: state.styles
    }
}

export default connect(mapStateToProps, { setTypeAnimatedTextAnimState })(TypeAnimatedTextWhole);
// export default TypeAnimatedTextWhole;