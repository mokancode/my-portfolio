import React, { Component } from "react";
import classnames from "classnames";
import { connect } from "react-redux";

class W_RadioItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.setSliderPage = this.props.setSliderPage;

    // refs
    this.radioItemRef = React.createRef();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.notifyBeginPageChange !== prevState.notifyBeginPageChange) {
      return {
        notifyBeginPageChange: nextProps.notifyBeginPageChange,
      };
    }
    return null;
  }

  componentDidMount() {
    const { index } = this.props;
    const delay = index * 50;
    setTimeout(
      function () {
        this.setState({ showRadioItem: true });
      }.bind(this),
      delay
    );
  }

  componentDidUpdate() {}

  render() {
    const { showRadioGroup, index, item, currentPage, closeRadioGroup, isMiscPage } = this.props;
    const { notifyBeginPageChange, showRadioItem } = this.state;

    return (
      <div
        className={classnames("radioBtnContainer", {
          showRadioBtnContainer: showRadioGroup && showRadioItem && !closeRadioGroup,
          isMiscPage: isMiscPage,
        })}
        onTransitionEnd={function (e) {
          e.stopPropagation();
        }}
      >
        <label>
          <input
            type="radio"
            name="page"
            value={index}
            // defaultChecked={index === 0}
            checked={currentPage === index}
            ref={this.radioItemRef}
            // disabled={notifyBeginPageChange}
            onChange={function () {
              if (!this.props.styles.isFingerPointerMotionBlurDismissed) return;
              this.setSliderPage(index);
            }.bind(this)}
          ></input>
          <div className="customRadioBtn"></div>
        </label>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    styles: state.styles,
  };
}

export default connect(mapStateToProps, {})(W_RadioItem);
// export default W_RadioItem;
