import React, { Component } from "react";
import ResumeHeader from "../ResumeHeader/ResumeHeader";
import "./ResumeSkillsDiv.scss";
import classnames from "classnames";
import BasicTextIcon from "./ResumeSkillIcons/BasicTextIcon/BasicTextIcon";
import AdobeIcon from "./ResumeSkillIcons/AdobeIcon/AdobeIcon";
import ResumeSkillsCategoryContainer from "./ResumeSkillsCategoryContainer";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../../is-empty";

class ResumeSkillsDiv extends Component {
  constructor(props) {
    super(props);
    this.state = {
      skillsList: [
        {
          category: "Front-end",
          skills: [
            {
              name: "Javascript",
              img: <BasicTextIcon text="JS" />,
            },
            {
              name: "HTML",
              img: "/images/ResumeSkillsIcons/HTML.png",
            },
            {
              name: "CSS",
              img: "/images/ResumeSkillsIcons/CSS.png",
            },
            {
              name: "Sass",
              img: "/images/ResumeSkillsIcons/Sass.png",
            },
            {
              name: "React",
              img: "/images/ResumeSkillsIcons/React.png",
            },
            {
              pointerName: "Next.js",
              img: "/images/ResumeSkillsIcons/Nextjs-logo.png",
            },
            {
              name: "Redux",
              img: "/images/ResumeSkillsIcons/Redux.png",
            },
            {
              name: "SVG",
              img: "/images/ResumeSkillsIcons/SVG.png",
            },
            {
              name: "Lottie",
              img: "/images/ResumeSkillsIcons/Lottie2.png",
            },
          ],
        },
        {
          category: "Back-end",
          skills: [
            {
              name: "MongoDB / NoSQL",
              img: "/images/ResumeSkillsIcons/MongoDB.png",
            },
            {
              name: "Express.js",
              img: <BasicTextIcon text="ex" />,
            },
            {
              name: "Node.js",
              img: "/images/ResumeSkillsIcons/NodeJS.png",
            },
            {
              name: "Postgres / SQL",
              img: "/images/ResumeSkillsIcons/Postgres.png",
            },
          ],
        },
        {
          category: "Adobe",
          skills: [
            {
              name: "Photoshop",
              img: <AdobeIcon text="Ps" />,
            },
            {
              name: "Illustrator",
              img: <AdobeIcon text="Ai" />,
            },
            {
              name: "After Effects",
              img: <AdobeIcon text="Ae" />,
            },
          ],
        },
      ],
    };
  }

  componentDidMount() {
    var { skillsList } = this.state;
    var uniqueIDs = [];
    for (var i = 0; i < skillsList.length; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });

    for (var i = 0; i < skillsList.length; i++) {
      skillsList[i].delay = i * 400 + 3500;
    }
    this.setState({ skillsList });
  }

  componentDidUpdate() {
    if (this.props.resumeRaised && !this.state.show)
      setTimeout(
        function () {
          this.setState({ show: true });
        }.bind(this),
        10
      );
  }

  render() {
    const { skillsList, show, uniqueIDs } = this.state;

    return (
      <div
        className={classnames("resumeSkillsDiv", {
          show: show,
        })}
      >
        <ResumeHeader text="Skills" show={show} />
        <div className="skillsContainer">
          {!isEmpty(uniqueIDs) &&
            skillsList.map(function (categoryItem, categoryIndex) {
              return (
                <ResumeSkillsCategoryContainer
                  key={uniqueIDs[categoryIndex]}
                  categoryItem={categoryItem}
                  categoryIndex={categoryIndex}
                  skillsList={skillsList}
                  show={show}
                />
              );
            })}
        </div>
      </div>
    );
  }
}

export default ResumeSkillsDiv;
