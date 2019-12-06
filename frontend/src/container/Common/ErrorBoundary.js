import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, errorInfo: '' };
    }

    componentDidCatch(error) {
        this.setState({ hasError: true, errorInfo: error });
    }

    render() {
        const { hasError, errorInfo } = this.state;
        const { children } = this.props;
        if (hasError) {
            return (
                <div style={{margin:10}}>
                    <h1>Something went wrong.</h1>
                    <details style={{ whiteSpace: 'pre-wrap' }}>
                        {hasError && errorInfo.toString()}
                        <br />
                        {errorInfo.componentStack}
                    </details>
                </div>
            );
        }
        return children;
    }
}
