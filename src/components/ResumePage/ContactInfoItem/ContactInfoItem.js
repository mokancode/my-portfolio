import React, { Component } from "react";
import ProgressiveAppearText from "../../ProgressiveAppearText/ProgressiveAppearText";
import "./ContactInfoItem.css";
import classnames from "classnames";
import isEmpty from "../../../is-empty";

class ContactInfoItem extends Component {
  render() {
    const { text, icon, itemIndex, show, showDelay, type, link } = this.props;

    return (
      <li
        className={classnames("contactInfoItem", {
          show: show,
        })}
        type={type}
      >
        <ProgressiveAppearText text={text} itemIndex={itemIndex} show={show} />
        <div className="iconWrapper">
          {typeof icon === "string" ? <img style={{ transitionDelay: `${showDelay}ms` }} src={icon} alt={`${type}_${text}`}></img> : icon}
        </div>
        {!isEmpty(link) ? <a href={link} target="_blank"></a> : null}
      </li>
    );
  }
}

export default ContactInfoItem;
