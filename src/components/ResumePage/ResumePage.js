import React, { Component } from "react";
import { Helmet } from "react-helmet";
import RotatingStrokeTextContainer from "../RotatingStrokeText/RotatingStrokeTextContainer";
import ContactInfoItem from "./ContactInfoItem/ContactInfoItem";
import "./ResumePage.scss";
import classnames from "classnames";
import ResumeLines from "../SVGs/ResumeLines/ResumeLines";
import ProjectsDiv from "./ProjectsDiv/ProjectsDiv";
import ResumeEducationDiv from "./ResumeEducationDiv/ResumeEducationDiv";
import ResumeSkillsDiv from "./ResumeSkillsDiv/ResumeSkillsDiv";
import PhoneIcon from "./ContactInfoItem/ContactIcons/PhoneIcon";
import LocationIcon from "./ContactInfoItem/ContactIcons/LocationIcon/LocationIcon";
import EmailIcon from "./ContactInfoItem/ContactIcons/EmailIcon/EmailIcon";
import PDFIcon from "./PDFIcon/PDFIcon";
import BasicTextIcon from "./ResumeSkillsDiv/ResumeSkillIcons/BasicTextIcon/BasicTextIcon";

class ResumePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      resumeLink: "/Resume-Moshe-Kandino.pdf",
    };

    this.notifyRotateAnimEnded = this.notifyRotateAnimEnded.bind(this);

    // refs
    this.resumeDivRef = React.createRef();
  }

  notifyRotateAnimEnded() {
    setTimeout(
      function () {
        this.setState({ showSecondColor: true });
      }.bind(this),
      200
    );
  }

  componentDidMount() {
    setTimeout(
      function () {
        this.setState({ showPage: true });
        // this.setState({ showComponents: true });
      }.bind(this),
      10
    );
  }

  render() {
    const { showPage, showSecondColor, showComponents, startAnim, showResume, raiseResume, resumeLink } = this.state;

    return (
      <div
        className={classnames("resumePage", {
          show: showPage,
        })}
        onTransitionEnd={function () {
          if (showPage && !showResume) this.setState({ showResume: true });
        }.bind(this)}
      >
        <Helmet>
          <title>MoKan Code - Resume</title>
          <meta name="description" content="Mike Kandino's Resume" />
        </Helmet>

        <div className="gradientLineContainerWrapper">
          <div className="gradientLineContainer">
            <div className="gradient"></div>
          </div>
        </div>
        <div className="gradientLineContainerWrapper">
          <div className="gradientLineContainer">
            <div className="gradient"></div>
          </div>
        </div>

        <div
          className={classnames("resumeDiv", {
            show: showResume,
            raise: raiseResume,
          })}
          ref={this.resumeDivRef}
          onTransitionEnd={function (e) {
            if (e.target === this.resumeDivRef.current) {
              if (showResume && !raiseResume) this.setState({ raiseResume: true });
              if (raiseResume && !showComponents) {
                console.log("show comp");
                this.setState({ showComponents: true });
              }
            }
          }.bind(this)}
        >
          <a
            className={classnames("", {
              show: showComponents,
            })}
            href={resumeLink}
          >
            <PDFIcon /> version
          </a>

          <ResumeLines show={showComponents} />

          <div className="nameAndContactInfo">
            <div
              className={classnames("nameAndExpertise", {
                showName: showComponents,
              })}
            >
              <h1>Moshe Kandino</h1>
              <div
                className={classnames("expertiseDiv", {
                  show: showComponents,
                  changeColor: showSecondColor,
                })}
                onTransitionEnd={function () {
                  setTimeout(
                    function () {
                      this.setState({ startAnim: true });
                    }.bind(this),
                    200
                  );
                }.bind(this)}
              >
                <h1>Full-stack Web</h1>
                <div
                  className={classnames("secondColorTextWrapper", {
                    show: showSecondColor,
                  })}
                >
                  <h1 className="secondColorText">Full-stack Web</h1>
                </div>
                <RotatingStrokeTextContainer
                  text="Developer"
                  notifyRotateAnimEnded={this.notifyRotateAnimEnded}
                  startAnim={startAnim}
                  showSecondColor={showSecondColor}
                />
              </div>
            </div>

            <ul className="contactInfoDiv">
              <ContactInfoItem
                type="email"
                text="mike.kandino@mokancode.com"
                icon={<EmailIcon show={showComponents} showDelay={500} />}
                itemIndex={0}
                show={showComponents}
              />
              <ContactInfoItem
                type="phone"
                text="347  445  0526"
                icon={<PhoneIcon show={showComponents} showDelay={1000} />}
                itemIndex={1}
                show={showComponents}
              />
              <ContactInfoItem
                type="location"
                text="New York City, NY"
                icon={<LocationIcon show={showComponents} showDelay={1500} />}
                itemIndex={2}
                show={showComponents}
              />
              <ContactInfoItem
                type="github"
                text="mokancode"
                link={"https://github.com/mokancode"}
                icon={"./images/github-logo.png"}
                itemIndex={2}
                show={showComponents}
                showDelay={1000}
              />
              <ContactInfoItem
                type="linkedin"
                link={"https://www.linkedin.com/in/mike-kandino-83a383147"}
                text="in/mike-kandino-83a383147"
                icon={<BasicTextIcon text="in" showDelay={2100} />}
                itemIndex={3}
                show={showComponents}
              />
            </ul>
          </div>

          <div className="resumeEducationAndSkills">
            <ResumeEducationDiv resumeRaised={showComponents} />
            <ResumeSkillsDiv resumeRaised={showComponents} />
          </div>

          <ProjectsDiv resumeRaised={showComponents} />
          {/* <LanguagesDiv/> */}
        </div>

        <div
          className={classnames("mobileResumeAlert", {
            show: showResume,
            raise: raiseResume,
            showComponents: showComponents,
          })}
          onTransitionEnd={function () {
            if (showResume && !raiseResume) this.setState({ raiseResume: true });
            if (raiseResume && !showComponents) this.setState({ showComponents: true });
          }.bind(this)}
        >
          <p>The mobile web version of my resume is in development.</p>
          <div className="linkWrapper">
            <p>Meanwhile you may download the</p>
            <a href={resumeLink}>
              <PDFIcon /> version
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default ResumePage;
