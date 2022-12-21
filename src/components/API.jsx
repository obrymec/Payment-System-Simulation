// Dependencies.
import React, {PureComponent} from "react";

// API class definition.
export default class API extends PureComponent {
    // Constructor definition.
    constructor (props) {
        // Gets the parent constructor.
        super (props);
        // Initializes component state and attributes.
        this.api_data = {
            name: "api-page",
            title: "API"
        };
    }

    // Called when the component is loaded and ready to use.
    componentDidMount = () => {
        // Calls page ready event.
        if (typeof this.props.ready === "function") this.props.ready (this.api_data);
    }

    // Called when the component is destroyed from the app view.
    componentWillUnmount = () => {
        // Calls page destroyed event.
        if (typeof this.props.destroyed === "function") this.props.destroyed (this.api_data);
    }

    // Gives page render from jsx language.
    render = () => <div className = "api"><label>API</label></div>;
}
