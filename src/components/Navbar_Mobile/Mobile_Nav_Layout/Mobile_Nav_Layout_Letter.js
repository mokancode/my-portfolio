import React, { Component } from 'react';
import isEmpty from '../../../is-empty';

class Mobile_Nav_Layout_Letter extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        const { wordIndex, index } = this.props;

        var animationDelay = index * 0.05 + 1.4;
        this.setState({ animationDelay });

        if (wordIndex === 1) {
            var cascadeStyle = { transform: `translateY(-${window.innerHeight / 30 * index}px)`, animationDelay: `${animationDelay}s` };
            this.setState({ cascadeStyle });
        }

        window.addEventListener("resize", function (e) {
            var cascadeStyle = { transform: `translateY(-${window.innerHeight / 30 * index}px)`, animationDelay: `${animationDelay}s` };
            this.setState({ cascadeStyle });
        }.bind(this))
    }

    render() {

        const { letter, wordIndex } = this.props;
        const { animationDelay, cascadeStyle } = this.state;

        return (
            <p style={!isEmpty(cascadeStyle) && wordIndex === 1 ? cascadeStyle : null}
            >
                <span style={{ animationDelay: `${animationDelay}s` }}>{letter}</span>
            </p>
        );
    }
}

export default Mobile_Nav_Layout_Letter;