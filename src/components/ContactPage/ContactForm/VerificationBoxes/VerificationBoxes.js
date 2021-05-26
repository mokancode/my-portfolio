import React, { Component } from 'react';
import './VerificationBoxes.css';
import classnames from 'classnames';
import isEmpty from '../../../../is-empty';
import validator from 'validator';

class VerificationBoxes extends Component {
    // componentDidMount() {
    //     setTimeout(() => {
    //         const { emailText } = this.props;
    //         console.log("emailText", emailText);
    //         console.log("!isEmpty(emailText)", !isEmpty(emailText));
    //         // console.log("!validator.isEmail(emailText)", !validator.isEmail(emailText));
    //     }, 5000);
    // }

    render() {

        const { showVerificationBoxes, showBack, nameText, emailText, topicText, messageText } = this.props;

        return (
            <div className="verificationBoxes">
                <div className={classnames("verificationBox nameVerificationBox", {
                    "showVerificationBox": showVerificationBoxes && !showBack
                    , "verificationBoxVerified": !isEmpty(nameText)
                })}></div>
                <div className={classnames("verificationBox emailVerificationBox", {
                    "showVerificationBox": showVerificationBoxes && !showBack
                    , "verificationBoxVerified": !isEmpty(emailText) && validator.isEmail(String(emailText).trim())
                    , "verificationBoxError": !isEmpty(emailText) && !validator.isEmail(String(emailText).trim())
                })}></div>
                <div className={classnames("verificationBox subjectVerificationBox", {
                    "showVerificationBox": showVerificationBoxes && !showBack
                    , "verificationBoxVerified": !isEmpty(topicText)
                })}></div>
                <div className={classnames("verificationBox messageVerificationBox", {
                    "showVerificationBox": showVerificationBoxes && !showBack
                    , "verificationBoxVerified": !isEmpty(messageText)
                })}></div>
            </div>
        );
    }
}

export default VerificationBoxes;