import React, { Component } from "react";
import classnames from "classnames";
// import WorkItemTitleLetter from './WorkItemTitleLetter';
import { connect } from "react-redux";
import { setWIImageLoaded } from "../../../../actions/stylesActions";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../../../is-empty";

class WorkItemTitleLetters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showTitle: false,
    };

    this.closeWorkItemFunc = this.props.closeWorkItemFunc;
  }

  componentDidMount() {
    const { title } = this.props;
    var uniqueIDs = [];
    for (var i = 0; i < title.length; i++) {
      uniqueIDs.push(uuidv4());
    }
    this.setState({ uniqueIDs });

    // const { title, showTitle } = this.props;
    // console.log("split: ", title.split(""));

    // if (showTitle && !this.state.showTitleState) this.setState({ showTitleState: true });
  }

  componentDidUpdate() {
    const { showTitle } = this.props;
    if (showTitle && !this.state.showTitle)
      // setTimeout(function () {
      this.setState({ showTitle: true }, function () {
        setTimeout(
          function () {
            this.setState({ assembleTitle: true });
          }.bind(this),
          50
        );
      });
    // }.bind(this), 800);
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //     // console.log("title props: ", nextProps);
  //     if (nextProps.showTitle !== prevState.showTitle) {
  //         console.log("title props comp: ", nextProps.showTitle, prevState.showTitle);
  //         return { showTitle: nextProps.showTitle }
  //     }
  //     return null;
  // }

  render() {
    const { title, firstLoad, hideTitle } = this.props;
    const { showTitle, assembleTitle, titleDisplayOff, uniqueIDs } = this.state;

    return (
      <div
        className={classnames("workItemTitle", {
          hideWorkItemTitle: titleDisplayOff,
        })}
      >
        {showTitle && !isEmpty(uniqueIDs)
          ? title.split("").map(
              function (letter, index) {
                if (letter === " ") return <span key={uniqueIDs[index]} className="workItemTitleSpace"></span>;
                return (
                  <p
                    key={uniqueIDs[index]}
                    style={{
                      transitionDelay: `${title.length > 7 ? 150 * index * 0.3 : 150 * index * 0.5}ms`,
                    }}
                    className={classnames("workItemTitleLetter", {
                      // "workItemTitleLetterNoAnim": firstLoad
                      workItemTitleLetterShow: assembleTitle,
                      workItemTitleLetterHide: hideTitle,
                    })}
                    onTransitionEnd={function () {
                      if (index === title.length - 1) this.props.setWIImageLoaded(true);

                      if (hideTitle && index === title.length - 1) {
                        this.closeWorkItemFunc(true, false);
                        this.setState({ titleDisplayOff: true });
                      }
                    }.bind(this)}
                  >
                    {letter}
                  </p>
                );
              }.bind(this)
            )
          : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.styles,
  };
}

export default connect(mapStateToProps, { setWIImageLoaded })(WorkItemTitleLetters);
// export default WorkItemTitleLetters;
