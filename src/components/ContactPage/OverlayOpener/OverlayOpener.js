import React, { Component } from "react";
// import './OverlayOpener.css';
// import './OverlayOpenerMobile.css';
import "./TrianglesBackground.css";
// import './OverlayOpener_New.css';
import classnames from "classnames";
import { v4 as uuidv4 } from "uuid";
import isEmpty from "../../../is-empty";

class OverlayOpener extends Component {
  constructor(props) {
    super(props);
    this.state = {
      close: false,
      degrees: 90,
    };
  }

  componentDidMount() {
    var topIDs = [];
    var bottomIDs = [];

    for (var i = 0; i < 5; i++) {
      topIDs.push(uuidv4());
    }
    for (var i = 0; i < 5; i++) {
      bottomIDs.push(uuidv4());
    }

    this.setState({ topIDs, bottomIDs });

    const { pageVisited } = this.props;
    // console.log("pageVisited", pageVisited);
    if (!pageVisited)
      setTimeout(
        function () {
          this.setState({ reveal: true });
        }.bind(this),
        10
      );
  }

  componentDidUpdate() {
    // const { pageVisited } = this.props;
    // const { reveal } = this.state;
    // if (!pageVisited && !reveal) this.setState({ reveal: true });
  }

  render() {
    const { close, reveal, topIDs, bottomIDs } = this.state;

    if (isEmpty(topIDs) || isEmpty(bottomIDs)) return null;

    return (
      <div
        className={classnames("overlayOpenerContainer", {
          overlayOpenerContainerClose: close,
          firstVisitRevealOverlayOpener: reveal,
        })}
        // onClick={function (e) {
        //     console.log('click');
        //     this.setState(function (prevState) {
        //         return {
        //             close: !prevState.close
        //         }
        //     }.bind(this));
        // }.bind(this)}
      >
        {/* <button onClick={function (e) { this.setState({ degrees: this.state.degrees + 30 }) }.bind(this)}>+</button> */}
        {/* <button onClick={function (e) { this.setState({ degrees: this.state.degrees - 30 }) }.bind(this)}>-</button> */}

        {new Array(5).fill(undefined).map(
          function (topTriangle, index) {
            return (
              <div key={topIDs[index]} className={`triangleSVGWrapper topTriangleSVGWrapper topTriangleSVGWrapper${index + 1}`}>
                <svg className={`triangleSVG topTriangle topTriangle${index + 1}`} viewBox="0 0 100 100">
                  <linearGradient id={`topTriangleGradient${index + 1}`} gradientTransform={`rotate(${this.state.degrees})`}>
                    <stop stopColor="var(--color-stop-1)" offset="0%" />
                    <stop stopColor="var(--color-stop-2)" offset="50%" />
                    <stop stopColor="var(--color-stop-3)" offset="100%" />
                  </linearGradient>
                  <polygon points="0 0, 100 100, 100 0" fill={`url(#topTriangleGradient${index + 1}`} />
                </svg>
              </div>
            );
          }.bind(this)
        )}

        {new Array(5).fill(undefined).map(function (bottomTriangle, index) {
          return (
            <div key={bottomIDs[index]} className={`triangleSVGWrapper bottomTriangleSVGWrapper bottomTriangleSVGWrapper${index + 1}`}>
              <svg className={`triangleSVG bottomTriangle bottomTriangle${index + 1}`} viewBox="0 0 100 100">
                <linearGradient id={`bottomTriangleGradient${index + 1}`} gradientTransform="rotate(90)">
                  <stop stopColor="var(--color-stop-1)" offset="0%" />
                  <stop stopColor="var(--color-stop-2)" offset="50%" />
                  <stop stopColor="var(--color-stop-3)" offset="100%" />
                </linearGradient>
                <polygon points="0 0, 100 100, 0 100" fill={`url(#bottomTriangleGradient${index + 1}`} />
              </svg>
            </div>
          );
        })}

        {/* <div className="triangleSVGWrapper bottomTriangleSVGWrapper bottomTriangleSVGWrapper1">
                    <svg className="triangleSVG bottomTriangle bottomTriangle1" viewBox="0 0 100 100">
                        <polygon points="0 0, 100 100, 0 100" />
                    </svg>
                </div>
                <div className="triangleSVGWrapper bottomTriangleSVGWrapper bottomTriangleSVGWrapper2">
                    <svg className="triangleSVG bottomTriangle bottomTriangle2" viewBox="0 0 100 100">
                        <polygon points="0 0, 100 100, 0 100" />
                    </svg>
                </div>
                <div className="triangleSVGWrapper bottomTriangleSVGWrapper bottomTriangleSVGWrapper3">
                    <svg className="triangleSVG bottomTriangle bottomTriangle3" viewBox="0 0 100 100">
                        <polygon points="0 0, 100 100, 0 100" />
                    </svg>
                </div>
                <div className="triangleSVGWrapper bottomTriangleSVGWrapper bottomTriangleSVGWrapper4">
                    <svg className="triangleSVG bottomTriangle bottomTriangle4" viewBox="0 0 100 100">
                        <polygon points="0 0, 100 100, 0 100" />
                    </svg>
                </div>
                <div className="triangleSVGWrapper bottomTriangleSVGWrapper bottomTriangleSVGWrapper5">
                    <svg className="triangleSVG bottomTriangle bottomTriangle5" viewBox="0 0 100 100">
                        <polygon points="0 0, 100 100, 0 100" />
                    </svg>
                </div>
                 */}
        <div className="triangleSVGWrapper topTriangleSVGWrapper topTriangleSVGWrapper1">
          <svg className="triangleSVG topTriangle topTriangle1" viewBox="0 0 100 100">
            <linearGradient id="topTriangleGradient1" gradientTransform="rotate(90)">
              <stop stopColor="var(--color-stop-1)" offset="0%" />
              <stop stopColor="var(--color-stop-2)" offset="50%" />
              <stop stopColor="var(--color-stop-3)" offset="100%" />
            </linearGradient>
            <polygon points="0 0, 100 100, 100 0" fill="url(#topTriangleGradient1" />
          </svg>
        </div>
        {/* <div className="triangleSVGWrapper topTriangleSVGWrapper topTriangleSVGWrapper2">
                    <linearGradient id="topTriangleGradient2" gradientTransform="rotate(90)">
                        <stop stopColor="var(--color-stop-1)" offset="0%" />
                        <stop stopColor="var(--color-stop-2)" offset="50%" />
                        <stop stopColor="var(--color-stop-3)" offset="100%" />
                    </linearGradient>
                    <svg className="triangleSVG topTriangle topTriangle2" viewBox="0 0 100 100">
                        <polygon points="0 0, 100 100, 100 0" />
                    </svg>
                </div>
                <div className="triangleSVGWrapper topTriangleSVGWrapper topTriangleSVGWrapper3">
                    <svg className="triangleSVG topTriangle topTriangle3" viewBox="0 0 100 100">
                        <polygon points="0 0, 100 100, 100 0" />
                    </svg>
                </div>

                <div className="triangleSVGWrapper topTriangleSVGWrapper topTriangleSVGWrapper4">
                    <svg className="triangleSVG topTriangle topTriangle4" viewBox="0 0 100 100">
                        <polygon points="0 0, 100 100, 100 0" />
                    </svg>
                </div>

                <div className="triangleSVGWrapper topTriangleSVGWrapper topTriangleSVGWrapper5">
                    <svg className="triangleSVG topTriangle topTriangle5" viewBox="0 0 100 100">
                        <polygon points="0 0, 100 100, 100 0" />
                    </svg>
                </div> */}
      </div>
    );
  }
}

export default OverlayOpener;
