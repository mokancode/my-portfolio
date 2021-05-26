import React, { Component } from 'react';

class LanguagesDiv extends Component {
    constructor(props) {
        super(props);
        this.state = {
            languages: [
                { name: "English" },
                { name: "Russian" },
                { name: "Hebrew" }
            ]
        };
    }

    render() {

        const { languages } = this.state;

        return (
            <div>

            </div>
        );
    }
}

export default LanguagesDiv;