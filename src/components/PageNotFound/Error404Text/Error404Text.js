import React, { Component } from 'react';
import './Error404Text.css';
import Error404_Text_0 from './Error404_Text_0';
import Error404_Text_4 from './Error404_Text_4';
import classnames from 'classnames';

class Error404Text extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        setTimeout(function () {
            this.setState({ reveal: true });
        }.bind(this), 10);
    }

    render() {

        const { reveal } = this.state;

        return (
            <div className={classnames("error404TextDiv", {
                "reveal": reveal
            })}>
                <Error404_Text_4 />
                <Error404_Text_0 />
                <Error404_Text_4 index={2} />
            </div>
        );
    }
}

export default Error404Text;;