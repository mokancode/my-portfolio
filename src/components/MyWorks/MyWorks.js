// Group
import React, { Component } from 'react'
// import anime from 'animejs';
import classnames from 'classnames';
import './MyWorks.css';
import './MyWorksMobile.css';
import './WorksText.css';
import WorksText from './WorksText';

export class MyWorks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            animation: {}
            , withinRange: false
        };

        this.finishedMyWorksTextAnim = this.props.finishedMyWorksTextAnim;

        // refs
        this.myWorksText = React.createRef();
    }

    componentDidMount() {
        // var path = anime.path('.myWorksPath');

        // var animation = anime({
        //     // targets: '.motion-path-demo .el',
        //     targets: this.myWorksText.current,
        //     translateX: path('x'),
        //     translateY: path('y'),
        //     rotate: path('angle'),
        //     easing: 'easeInOutSine',
        //     duration: 3000,
        //     // loop: true
        //     autoplay: false
        // });

        // this.setState({ animation });

        // setTimeout(() => {
        // this.state.animation.play();
        this.setState({ animate: true });
        // }, 3000);
    }

    componentDidUpdate() {
        // console.log("update");
    }

    render() {

        const { animate, withinRange } = this.state;
        const { readyToLoad, shutdown } = this.props;

        return (

            <div className="myWorksDiv">
                {/* <Waypoint
                    onEnter={function (e) { this.setState({ withinRange: true }) }.bind(this)}
                    scrollableAncestor={window}
                    bottomOffset='50px'
                    topOffset='50px'
                > */}
                <div ref={this.myWorksText} className={classnames("myWorksTextWrapper", {
                    "myWorksTextWrapperShow": readyToLoad
                    //  animate && withinRange && readyToLoad
                })}>
                    <WorksText expand={animate} withinRange={withinRange} readyToLoad={readyToLoad} index={0} finishedMyWorksTextAnim={this.finishedMyWorksTextAnim} shutdown={shutdown} />
                    <WorksText expand={animate} withinRange={withinRange} readyToLoad={readyToLoad} shutdown={shutdown} />
                    <WorksText expand={animate} withinRange={withinRange} readyToLoad={readyToLoad} shutdown={shutdown} />

                    <span className="myWorksHeaderTopLine"></span>
                    <span className="myWorksHeaderBottomLine"></span>

                    {/* <p className={classnames("myWorksText", {
                        "myWorksTextScaleUp": animate
                    })}>Works</p> */}

                </div>
                {/* </Waypoint> */}

            </div >
        )
    }
}

export default MyWorks;