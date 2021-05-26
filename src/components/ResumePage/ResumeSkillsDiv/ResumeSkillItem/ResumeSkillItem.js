import React, { Component } from "react";
import "./ResumeSkillItem.css";
import classnames from "classnames";
import isEmpty from "../../../../is-empty";

class ResumeSkillItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { index } = this.props;
    const delay = index * 100;
    this.setState({ delay });
  }

  render() {
    const { name, pointerName, icon, show, extraDelay, index, categoryIndex } = this.props;
    const { delay, showBulletPointGlow } = this.state;

    // var { extraDelay } = this.props;
    // extraDelay = !isEmpty(extraDelay) ? extraDelay : 0;

    return (
      <div
        className={classnames("resumeSkillItem", {
          show: show,
        })}
      >
        <div className="iconWrapper" name={name || pointerName} style={{ transitionDelay: `${delay + extraDelay}ms` }}>
          {typeof icon === "object" ? icon : typeof icon === "string" ? <img src={icon} alt={name}></img> : null}
        </div>
        {name && <p style={{ transitionDelay: `${delay + extraDelay + 1000}ms` }}>{name}</p>}
        <div
          className={classnames("bulletPoint", {
            showGlow: showBulletPointGlow,
          })}
          style={{
            transitionDelay: `${delay + extraDelay + 1400}ms`,
            animationDelay: `${delay}ms`,
          }}
          onTransitionEnd={function () {
            if (!showBulletPointGlow) this.setState({ showBulletPointGlow: true });
          }.bind(this)}
        ></div>
      </div>
    );
  }
}

export default ResumeSkillItem;
