import React, { Component } from "react";
import "./ContactForm.scss";
import "./ContactFormMobile.css";
import classnames from "classnames";
import TextTrackerLetter from "./TextTracker/TextTrackerLetter";
import generateRandomInterval from "../../../utilities/generateRandomInteger";
import isEmpty from "../../../is-empty";
import Validator from "validator";
import emailjs from "emailjs-com";
import { init } from "emailjs-com";
import FormSubmittedDiv from "./FormSubmittedDiv/FormSubmittedDiv";
import { setPullNavBtnContainerHidden } from "../../../actions/stylesActions";
import { connect } from "react-redux";
import FormVerificationIcon from "./FormVerificationIcon/FormVerificationIcon";
import VerificationBoxes from "./VerificationBoxes/VerificationBoxes";
import API_Keys from "../../../api_keys.json";
import { v4 as uuidv4 } from "uuid";
init(API_Keys.emailjsInitUser);

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    // this.moveFlare = this.moveFlare.bind(this);
    this.setRepeaterExplosionMotionGraphicAnimated = this.setRepeaterExplosionMotionGraphicAnimated.bind(this);
    this.confirmDoneStatus = this.confirmDoneStatus.bind(this);

    this.scrollToForm = this.props.scrollToForm;
    this.onSubmitScrollToForm = this.props.onSubmitScrollToForm;

    // refs
    // this.borderFlareRef = React.createRef();
    // this.contactFormBorderRef = React.createRef();
    this.nameContainerRef = React.createRef();
    this.topicContainerRef = React.createRef();
    this.emailContainerRef = React.createRef();
    this.messageContainerRef = React.createRef();
    // this.submitBtnFlareRef = React.createRef();
  }

  componentDidMount() {
    // window.addEventListener("mousemove", e => { this.moveFlare(e); }, true);

    var letterCoordinates = [],
      uniqueIDs = [uuidv4(), uuidv4(), uuidv4()]; // 3 for sideLines
    var letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_@-.".split("");

    for (var i = 0; i < letters.length; i++) {
      letterCoordinates.push({
        letter: letters[i],
        x1: generateRandomInterval(0, 170),
        y1: generateRandomInterval(0, 100),
        z1: generateRandomInterval(20, 150),

        // x2: generateRandomInterval(0, 100),
        // y2: generateRandomInterval(0, 100),
        // z2: generateRandomInterval(30, 100),

        // x3: generateRandomInterval(0, 100),
        // y3: generateRandomInterval(0, 100),
        // z3: generateRandomInterval(30, 100)
      });
      uniqueIDs.push(uuidv4()); // add uniqueID for each letter coordinates
    }

    const sideLines = new Array(3).fill(undefined).map(
      function (line, idx) {
        return (
          <div
            key={uniqueIDs.pop()}
            className="sideLines"
            style={{
              animationDelay: `${idx * 0.6}s`,
            }}
          >
            <div className="sideLine"></div>
            <div className="sideLine"></div>
          </div>
        );
      }.bind(this)
    );

    this.setState({ letterCoordinates, uniqueIDs, sideLines });

    // this.nameContainerRef.current.value = "aa@aa.aa";
    // this.topicContainerRef.current.value = "aa@aa.aa";
    // this.emailContainerRef.current.value = "aa@aa.aa";
    // this.messageContainerRef.current.value = "aa@aa.aa";

    // this.setState({
    //     nameText: "aa@aa.aa",
    //     topicText: "aa@aa.aa",
    //     emailText: "aa@aa.aa",
    //     messageText: "aa@aa.aa",
    //     // formIsOk: true,
    //     // showBack: true
    // })

    setTimeout(
      function () {
        this.setState({ showForm: true });
      }.bind(this),
      10
    );
  }

  // moveFlare(e) {
  //     // console.log("mousemove", e.clientX, e.clientY);
  //     try {
  //         var { x, y } = this.contactFormBorderRef.current.getBoundingClientRect();
  //         this.borderFlareRef.current.style.transform = `translateX(${Math.abs(x - e.clientX)}px) translateY(${Math.abs(y - e.clientY)}px)`;
  //         // this.submitBtnFlareRef.current.style.transform = `translateX(${e.clientX}px) translateY(${e.clientY}px)`;
  //     } catch (err) { }

  // }

  componentDidUpdate() {
    const { stopRotation, repeaterExplosionMotionGraphicAnimated, showBack, formIsOk } = this.state;
    // if (stopRotation && repeaterExplosionMotionGraphicAnimated && !showBack && formIsOk) this.setState({ showBack: true });

    if (repeaterExplosionMotionGraphicAnimated && !showBack && formIsOk)
      this.setState(
        { showBack: true },
        function (e) {
          setTimeout(
            function () {
              this.setState({ hideCurvedInputPic: true });
            }.bind(this),
            700
          );
        }.bind(this)
      );
  }

  handleSubmit() {
    const { nameText, emailText, topicText, messageText } = this.state;

    this.onSubmitScrollToForm();

    this.setState(
      {
        errors: {},
        formSubmitted: true,
        formIsOk: false,
      },
      function (e) {
        // do some field validation
        var errors = {};
        if (isEmpty(nameText)) errors.name = true;

        if (isEmpty(emailText)) errors.email = true;
        else if (!Validator.isEmail(emailText)) errors.email = "Invalid email";

        if (isEmpty(topicText)) errors.topic = true;
        if (isEmpty(messageText)) errors.message = true;

        const { confirmDoneAlert, confirmDoneTick } = this.state;
        if (confirmDoneAlert && isEmpty(errors)) this.setState({ confirmDoneAlert: false, repeaterExplosionMotionGraphicAnimated: false });
        else if (confirmDoneTick && !isEmpty(errors))
          this.setState({ confirmDoneTick: false, repeaterExplosionMotionGraphicAnimated: false });

        if (!isEmpty(errors)) this.setState({ errors });
        else {
          this.setState({ formIsOk: true });

          var templateParams = {
            from_name: nameText,
            reply_to: emailText,
            subject: topicText,
            message: messageText,
          };

          emailjs.send(API_Keys.emailjsServiceID, API_Keys.emailjsTemplateID, templateParams).then(
            function (response) {
              console.log("SUCCESS!", response.status, response.text, response);
            },
            function (err) {
              console.log("FAILED...", err);
            }
          );
        }
      }.bind(this)
    );
  }

  setRepeaterExplosionMotionGraphicAnimated(status) {
    this.setState({ repeaterExplosionMotionGraphicAnimated: status });
  }

  confirmDoneStatus(tick, alert) {
    if (tick) this.setState({ confirmDoneTick: true, confirmDoneAlert: false });
    if (alert) this.setState({ confirmDoneAlert: true, confirmDoneTick: false });
  }

  render() {
    const {
      currentFocus,
      nameText,
      topicText,
      emailText,
      messageText,
      letterCoordinates,
      lastLetter,
      lastLetterID,
      isCursorNotAtEndOfInput,
      formSubmitted,
      formIsOk,
      repeaterExplosionMotionGraphicAnimated,
      confirmDoneTick,
      confirmDoneAlert,
      hideCurvedInputPic,
      showVerificationBoxes,
      showForm,
      showBack,
      notifyStopFormRotation,
      stopRotation,
      formPulled,
      setPullBtnDisplayNone,
      sideLines,
      uniqueIDs,
    } = this.state;

    var { errors } = this.state;

    const { showPullUpBtn, formPulledByScroll } = this.props;

    return (
      <div id="contactFormContainerWrapper" className="contactFormContainerWrapper">
        {/* <button className="fillFormBtn"
                    onClick={function () {
                        this.nameContainerRef.current.value = "aa@aa.aa";
                        this.topicContainerRef.current.value = "aa@aa.aa";
                        this.emailContainerRef.current.value = "aa@aa.aa";
                        this.messageContainerRef.current.value = "aa@aa.aa";

                        this.setState({
                            nameText: "aa@aa.aa",
                            topicText: "aa@aa.aa",
                            emailText: "aa@aa.aa",
                            messageText: "aa@aa.aa",
                            // formIsOk: true,
                            // showBack: true
                        })
                    }.bind(this)}
                >Fill form</button> */}

        <div
          className={classnames("contactFormContainer", {
            contactFormContainerFormOK: formIsOk,
          })}
        >
          <div
            className={classnames("formAndBorderWrapper", {
              showForm: showForm,
              //  &&
              // this.props.styles.rectangleTouchTextIsRevealed
              stopRotationAnim: stopRotation,
              showBack: showBack,
            })}
            // onAnimationIteration={function (e) {
            //     const { formIsOk } = this.state;
            //     if (formIsOk) this.setState({ stopRotation: true });
            // }.bind(this)}
            onTransitionEnd={function (e) {
              // if (this.props.styles.rectangleTouchTextIsRevealed && !showVerificationBoxes) this.setState({ showVerificationBoxes: true });
              if (!showVerificationBoxes) this.setState({ showVerificationBoxes: true });
            }.bind(this)}
          >
            <FormSubmittedDiv showDiv={repeaterExplosionMotionGraphicAnimated} />

            {/* <div className="contactFormBorder" ref={this.contactFormBorderRef}>
                            <div className="borderFlare
                            " ref={this.borderFlareRef}></div>
                        </div> */}
            <div id="contactFormWrapper" className="contactFormWrapper">
              <div
                className={classnames("pullUpBtnWrapper", {
                  pullUpBtnWrapperShow: showPullUpBtn,
                  pullUpBtnWrapperHide: formPulled || formPulledByScroll,
                  pullUpBtnWrapperDisplayNone: setPullBtnDisplayNone,
                })}
                onClick={function (e) {
                  if (!formPulled) {
                    this.setState({ formPulled: true });
                    this.scrollToForm();
                  }
                }.bind(this)}
                onTransitionEnd={function (e) {
                  if (formPulled || (formPulledByScroll && !setPullBtnDisplayNone)) this.setState({ setPullBtnDisplayNone: true });
                }.bind(this)}
              >
                {sideLines}
              </div>

              {/* <CurvedInputContainerSVG /> */}

              <div className="curvedInputPicWrapper">
                {/* <div className="curvedInputPicInnerWrapper"> */}
                <img
                  className={classnames("curvedInputPic", {
                    hideCurvedInputPic: hideCurvedInputPic,
                  })}
                  src="./images/CurvedInput.png"
                  alt="CurvedInput"
                />
                {/* </div> */}
              </div>

              {/* <div className="boxBehind"></div> */}
              <form
                className="contactFormElements"
                // action=""
                onSubmit={function (e) {
                  this.handleSubmit();
                }.bind(this)}
              >
                <div
                  className={classnames("inputContainer nameInputContainer", {
                    inputContainerFocused: currentFocus === "name" || !isEmpty(nameText),
                  })}
                  onFocus={function (e) {
                    this.props.setPullNavBtnContainerHidden(true);
                    this.setState({ currentFocus: "name" });
                  }.bind(this)}
                  onBlur={function (e) {
                    this.props.setPullNavBtnContainerHidden(false);
                    this.setState({ currentFocus: "" });
                  }.bind(this)}
                  onClick={function (e) {
                    // console.log("click on name input container");
                    // this.nameContainerRef.current.childNodes[1].focus();
                    this.nameContainerRef.current.focus();
                  }.bind(this)}
                >
                  <button className="focusButton"></button>
                  <p
                    className="contactInputParagraph"
                    onClick={function (e) {
                      // console.log("click on name p");
                      // this.nameContainerRef.current.childNodes[1].focus();
                      this.nameContainerRef.current.focus();
                    }.bind(this)}
                  >
                    Name
                  </p>
                  <input
                    ref={this.nameContainerRef}
                    maxLength={40}
                    autoComplete={"none"}
                    className={classnames("contactInput", {
                      contactInputError: errors.name,
                    })}
                    name="name"
                    onChange={function (e) {
                      // console.log("input name: ", e.target.name);
                      if (!isEmpty(errors[e.target.name]) && !isEmpty(e.target.value)) {
                        // console.log("input name: ", e.target.name);
                        errors[e.target.name] = "";
                        this.setState({ errors });
                      }
                      // console.log("e", e.selectionStart);
                      // console.log("e2", e.target.selectionStart === e.target.value.length);
                      this.setState({ nameText: e.target.value });
                      this.setState({ lastLetter: e.target.value.charAt(e.target.value.length - 1), lastLetterID: uuidv4() });
                      if (e.target.selectionStart !== e.target.value.length) this.setState({ isCursorNotAtEndOfInput: true });
                      else if (e.target.selectionStart === e.target.value.length && isCursorNotAtEndOfInput)
                        this.setState({ isCursorNotAtEndOfInput: false });
                    }.bind(this)}
                  ></input>
                </div>

                <div
                  className={classnames("inputContainer emailInputContainer", {
                    inputContainerFocused: currentFocus === "email" || !isEmpty(emailText),
                  })}
                  onFocus={function (e) {
                    this.props.setPullNavBtnContainerHidden(true);
                    this.setState({ currentFocus: "email" });
                  }.bind(this)}
                  onBlur={function (e) {
                    this.props.setPullNavBtnContainerHidden(false);
                    this.setState({ currentFocus: "" });
                  }.bind(this)}
                  onClick={function (e) {
                    // console.log("click on email");
                    // this.emailContainerRef.current.childNodes[1].focus();
                    this.emailContainerRef.current.focus();
                  }.bind(this)}
                >
                  <p className="contactInputParagraph">Email</p>
                  <input
                    // autoComplete={"none"}
                    ref={this.emailContainerRef}
                    className={classnames("contactInput", {
                      contactInputError: errors.email,
                    })}
                    name="email"
                    // type="email"
                    maxLength={320}
                    onChange={function (e) {
                      // console.log("input name: ", e.target.name);
                      if (!isEmpty(errors[e.target.name])) {
                        errors[e.target.name] = "";
                        this.setState({ errors });
                      }
                      this.setState({ emailText: e.target.value });
                      this.setState({ lastLetter: e.target.value.charAt(e.target.value.length - 1), lastLetterID: uuidv4() });

                      if (e.target.selectionStart !== e.target.value.length) this.setState({ isCursorNotAtEndOfInput: true });
                      else if (e.target.selectionStart === e.target.value.length && isCursorNotAtEndOfInput)
                        this.setState({ isCursorNotAtEndOfInput: false });
                    }.bind(this)}
                  ></input>
                  {!isEmpty(errors.email) && !Validator.isBoolean(String(errors.email)) ? (
                    // && Validator.isAlphanumeric(errors.email)
                    <p className="errorMessage">{errors.email}</p>
                  ) : null}
                </div>

                <div
                  className={classnames("inputContainer topicInputContainer", {
                    inputContainerFocused: currentFocus === "topic" || !isEmpty(topicText),
                  })}
                  onFocus={function (e) {
                    this.props.setPullNavBtnContainerHidden(true);
                    this.setState({ currentFocus: "topic" });
                  }.bind(this)}
                  onBlur={function (e) {
                    this.props.setPullNavBtnContainerHidden(false);
                    this.setState({ currentFocus: "" });
                  }.bind(this)}
                  onClick={function (e) {
                    // console.log("click on topic");
                    // this.topicContainerRef.current.childNodes[1].focus();
                    this.topicContainerRef.current.focus();
                  }.bind(this)}
                >
                  <p className="contactInputParagraph">Subject</p>
                  <input
                    ref={this.topicContainerRef}
                    maxLength={70}
                    autoComplete={"none"}
                    className={classnames("contactInput", {
                      contactInputError: errors.topic,
                    })}
                    name="topic"
                    onChange={function (e) {
                      // console.log("input name: ", e.target.name);
                      if (!isEmpty(errors[e.target.name])) {
                        errors[e.target.name] = "";
                        this.setState({ errors });
                      }
                      this.setState({ topicText: e.target.value });
                      this.setState({ lastLetter: e.target.value.charAt(e.target.value.length - 1), lastLetterID: uuidv4() });
                      if (e.target.selectionStart !== e.target.value.length) this.setState({ isCursorNotAtEndOfInput: true });
                      else if (e.target.selectionStart === e.target.value.length && isCursorNotAtEndOfInput)
                        this.setState({ isCursorNotAtEndOfInput: false });
                      // setTimeout(function() {
                      //     // console.log("email text: ", this.emailContainerRef.current.value);
                      // }.bind(this), 1000);
                    }.bind(this)}
                  ></input>
                </div>

                <div
                  className={classnames("inputContainer messageInputContainer", {
                    inputContainerFocused: currentFocus === "message" || !isEmpty(messageText),
                  })}
                  // ref={this.messageContainerRef}
                  onFocus={function (e) {
                    this.props.setPullNavBtnContainerHidden(true);
                    this.setState({ currentFocus: "message" });
                  }.bind(this)}
                  onBlur={function (e) {
                    this.props.setPullNavBtnContainerHidden(false);
                    this.setState({ currentFocus: "" });
                  }.bind(this)}
                  onClick={function (e) {
                    // console.log("click on msg");
                    // this.messageContainerRef.current.childNodes[1].focus();
                    this.messageContainerRef.current.focus();
                  }.bind(this)}
                >
                  <p className="contactInputParagraph">Message</p>
                  <textarea
                    className={classnames("contactInput", {
                      contactInputError: errors.message,
                    })}
                    name="message"
                    ref={this.messageContainerRef}
                    maxLength={500}
                    placeholder="Hi Mike"
                    onChange={function (e) {
                      if (!isEmpty(errors[e.target.name]) && !isEmpty(e.target.value)) {
                        // console.log("input name: ", e.target.name);
                        errors[e.target.name] = "";
                        this.setState({ errors });
                      }

                      this.setState({ messageText: e.target.value });
                      this.setState({ lastLetter: e.target.value.charAt(e.target.value.length - 1), lastLetterID: uuidv4() });
                      if (e.target.selectionStart !== e.target.value.length) {
                        // console.log("not at end");
                        this.setState({ isCursorNotAtEndOfInput: true });
                      } else if (e.target.selectionStart === e.target.value.length && isCursorNotAtEndOfInput) {
                        // console.log("at end");
                        this.setState({ isCursorNotAtEndOfInput: false });
                      }
                    }.bind(this)}
                  ></textarea>
                  {errors.messageLength ? <p className="messageLengthError">Max 500 characters</p> : null}
                </div>
              </form>

              <div className="submitButtonWrapper">
                {/* <div className="btnFlareWrapper">
        <div className="btnFlare" ref={this.submitBtnFlareRef}></div>
    </div> */}

                {/* <svg className="submitBtnSVG" x="0px" y="0px" viewBox="0 0 226 227" style={{ "enableBackground": "new 0 0 226 227" }} preserveAspectRatio="none">
                                <linearGradient
                                    id={`contactFormSubmitBtnGradient`}
                                    gradientTransform="rotate(80)"
                                >
                                    <stop
                                        offset="10%"
                                        stopColor="var(--color-stop-1)" />
                                    <stop
                                        offset="90%"
                                        stopColor="var(--color-stop-2)" />
                                </linearGradient>
                                <g>
                                    <path className="contactFormSubmitBtnPath0" d="M196.98,12H32.02C20.96,12,12,20.96,12,32.02v164.96C12,208.04,20.96,217,32.02,217h164.96
	c11.06,0,20.02-8.96,20.02-20.02V32.02C217,20.96,208.04,12,196.98,12z M210.5,185.46c0,11.62-9.42,21.04-21.04,21.04H39.54
	c-11.62,0-21.04-9.42-21.04-21.04V43.54c0-11.62,9.42-21.04,21.04-21.04h149.91c11.62,0,21.04,9.42,21.04,21.04V185.46z"/>
                                </g>
                            </svg> */}

                <button
                  type="submit"
                  className={classnames("", {
                    hideFormButton: formIsOk && repeaterExplosionMotionGraphicAnimated,
                  })}
                  disabled={formIsOk}
                  onClick={function (e) {
                    this.handleSubmit();
                  }.bind(this)}
                >
                  Submit
                </button>
              </div>
            </div>

            {!isEmpty(letterCoordinates) && !isEmpty(uniqueIDs)
              ? letterCoordinates.map(
                  function (letterItem, index) {
                    return (
                      <TextTrackerLetter
                        key={uniqueIDs[index]}
                        letterItem={letterItem}
                        lastLetter={lastLetter}
                        lastLetterID={lastLetterID}
                        index={index}
                        isCursorNotAtEndOfInput={isCursorNotAtEndOfInput}
                      />
                    );
                  }.bind(this)
                )
              : null}

            <VerificationBoxes
              showVerificationBoxes={showVerificationBoxes}
              showBack={showBack}
              nameText={nameText}
              emailText={emailText}
              topicText={topicText}
              messageText={messageText}
            />

            <FormVerificationIcon
              formSubmitted={formSubmitted}
              formIsOk={formIsOk}
              errors={errors}
              showBack={showBack}
              repeaterExplosionMotionGraphicAnimated={repeaterExplosionMotionGraphicAnimated}
              confirmDoneStatus={this.confirmDoneStatus}
              setRepeaterExplosionMotionGraphicAnimated={this.setRepeaterExplosionMotionGraphicAnimated}
            />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    navbar: state.navbar,
    styles: state.styles,
  };
}

export default connect(mapStateToProps, { setPullNavBtnContainerHidden })(ContactForm);
// export default ContactForm;
