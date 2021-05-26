// Group
import React, { Component } from 'react'
import classnames from 'classnames';
import './MiscGroup.css';
import './MiscText.scss';
import MiscText from './MiscText';

export class MiscGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        // this.miscTextFinishedFunc = this.props.miscTextFinishedFunc;

        // refs
    }

    componentDidMount() {
        // setTimeout(function () {
        //     // this.state.animation.play();
        //     this.setState({ animate: true });
        // }.bind(this), 10);
    }

    componentDidUpdate() {
        // console.log("update");
        const { animate } = this.props;
        if (animate !== this.state.animate) this.setState({ animate })
    }

    render() {

        const { animate } = this.state;
        const { } = this.props;

        return (
            <div className="miscWordDiv">
                <div ref={this.miscText} className={classnames("miscGroupWrapper", {
                    "miscGroupWrapperShow": animate
                })}>
                    <MiscText expand={animate}
                        // miscTextFinishedFunc={this.miscTextFinishedFunc} 
                        index={0} />
                    <MiscText expand={animate} />
                    <MiscText expand={animate} />
                </div>
            </div>
        )
    }
}

export default MiscGroup;