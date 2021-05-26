import React, { Component } from "react";
import FrontWave from "./FrontWave";
import "./BackgroundWaves.scss";
import "./BackgroundWavesMobile.css";
import RearWavePNG from "./RearWavePNG";
import W_Container from "../../W_Slider/W_Container";
import classnames from "classnames";

class BackgroundWaves extends Component {
  render() {
    const { fadedBlockReady, showBackgroundWaves, pageVisited, showWorkItemsContainer } =
      this.props;

    return (
      <div
        className={classnames("backgroundWaves", {
          backgroundWavesShow: showBackgroundWaves,
          revealWavesFirstVisit: pageVisited === false,
          revealWavesVisited: pageVisited,
          freezeTransitionTime: showWorkItemsContainer,
        })}
        onTransitionEnd={async function () {
          // console.log("background transition end");
          if (!fadedBlockReady) {
            this.props.setPortfolioReady(true);
            await this.props.fadedBlockReadyHandler();
            this.props.showWorkItemsContainerHandler();
          }
        }.bind(this)}
      >
        {/* <button onClick={function (e) { this.setState({ dy: ++dy }) }.bind(this)}>dy +</button>
                <button onClick={function (e) { this.setState({ dy: --dy }) }.bind(this)}>dy -</button>

                <button onClick={function (e) { this.setState({ dx: ++dx }) }.bind(this)}>dx +</button>
                <button onClick={function (e) { this.setState({ dx: --dx }) }.bind(this)}>dx -</button> */}

        <FrontWave showWave={pageVisited} showShadow={showWorkItemsContainer} />
        {showWorkItemsContainer ? <W_Container /> : null}
        <RearWavePNG />
      </div>
    );
  }
}

export default BackgroundWaves;
