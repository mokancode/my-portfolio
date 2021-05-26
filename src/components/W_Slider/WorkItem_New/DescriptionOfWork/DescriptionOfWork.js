import React, { Component } from 'react';
import TypeAnimatedText from '../../../TypeAnimatedText/TypeAnimatedText';
import classnames from 'classnames';
import './DescriptionOfWork.scss';

class DescriptionOfWork extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.hideDiv = this.hideDiv.bind(this)
        this.closeWorkItemFunc = this.props.closeWorkItemFunc;
    }

    componentDidMount() {
        const { animateText } = this.props;
        if (animateText && !this.state.animateText) {
            setTimeout(function () {
                this.setState({ animateText: true });
            }.bind(this), 50);
        }
    }

    hideDiv() {
        this.setState({ hideDiv: true });
    }

    render() {

        const { complexity, descriptionOfWork, closeWorkItem, isMobileMode, browserName } = this.props;
        const { hideDiv, animateText } = this.state;

        return (
            <div className={classnames("descriptionOfWorkWrapper", {
                // "blurDescriptionOfWorkWrapper": closeWorkItem
                "hideDescriptionOfWorkWrapper": hideDiv
            })}
                onTransitionEnd={function () {
                    // this.setState({ hideDiv: true });
                }.bind(this)}
            >
                <div className="descriptionOfWorkParagraphWrapper">
                    {/* <p className="descriptionOfWork">{`${descriptionOfWork}`}</p> */}
                    <TypeAnimatedText
                        text={descriptionOfWork}
                        animateText={animateText}
                        closeWorkItem={closeWorkItem}
                        hideDiv={this.hideDiv}
                        closeWorkItemFunc={this.closeWorkItemFunc}
                        isMobileMode={isMobileMode}
                        browserName={browserName}
                    />
                    <span className={classnames("descriptionQuotes", {
                        "descriptionQuotesReveal": animateText && !closeWorkItem
                    })}></span>
                </div>
            </div>
        );
    }
}

export default DescriptionOfWork;