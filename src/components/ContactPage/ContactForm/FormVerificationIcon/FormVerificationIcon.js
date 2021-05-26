import React, { Component } from 'react';
import classnames from 'classnames';
import './FormVerificationIcon.css';
import isEmpty from '../../../../is-empty';
import RepeaterExplosionMotionGraphic from '../../../RepeaterExplosionMotionGraphic/RepeaterExplosionMotionGraphic';

class FormVerificationIcon extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        this.setRepeaterExplosionMotionGraphicAnimated = this.props.setRepeaterExplosionMotionGraphicAnimated;
        this.confirmDoneStatus = this.props.confirmDoneStatus;
    }

    render() {

        const { formSubmitted, formIsOk, errors, showBack, repeaterExplosionMotionGraphicAnimated } = this.props;
        const { confirmSVGCircleAnimated, confirmDoneCircleAnimated, confirmDoneTick, confirmDoneAlert } = this.state;

        return (
            <div className={classnames("confirmDone", {
                "confirmDoneAnimateSVG": formSubmitted
                , "confirmDoneTick": formIsOk && confirmSVGCircleAnimated
                , "confirmDoneX": !isEmpty(errors) && confirmSVGCircleAnimated
                , "confirmDoneRotateAnimEnded": confirmDoneCircleAnimated
                , "confirmDoneHide": showBack
            })}
                onTransitionEnd={function (e) {
                    e.stopPropagation();
                    if ((formIsOk && confirmSVGCircleAnimated)) {
                        this.confirmDoneStatus(true, false);
                        this.setState({ confirmDoneTick: true });
                    }
                    else if (!isEmpty(errors) && confirmSVGCircleAnimated) {
                        this.confirmDoneStatus(false, true);
                        this.setState({ confirmDoneAlert: true });
                    }
                    //     console.log("transition end symobl is showing", confirmDone symbol is showing);
                }.bind(this)}
                onAnimationEnd={function (e) {
                    // console.log("anim end confirm");
                    if (formSubmitted) this.setState({ confirmDoneCircleAnimated: true });
                }.bind(this)}
            >
                <RepeaterExplosionMotionGraphic
                    animate={formSubmitted && confirmSVGCircleAnimated && (confirmDoneTick || confirmDoneAlert) && !repeaterExplosionMotionGraphicAnimated}
                    setRepeaterExplosionMotionGraphicAnimated={this.setRepeaterExplosionMotionGraphicAnimated}
                />
                <svg height="100" width="100" onAnimationEnd={function (e) {
                    e.stopPropagation();
                    this.setState({ confirmSVGCircleAnimated: true })
                }.bind(this)}>
                    <circle cx="50" cy="50" r="40" />
                </svg>
            </div>
        );
    }
}

export default FormVerificationIcon;