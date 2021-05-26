import React, { Component } from 'react';
import './PageNotFoundCursive.css';
import PageNotFoundCursiveLottie from './PageNotFoundCursiveLottie';

class PageNotFoundCursive extends Component {
    render() {
        return (
            <div className="pageNotFoundCursive">
                <PageNotFoundCursiveLottie />
                <PageNotFoundCursiveLottie />
            </div>
        );
    }
}

export default PageNotFoundCursive;