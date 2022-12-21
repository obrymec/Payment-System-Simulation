// Dependencies.
import React, {PureComponent} from "react";

// Activities class definition.
export default class Activities extends PureComponent {
    // Constructor definition.
    constructor (props) {
        // Gets the parent constructor.
        super (props);
        // Initializes component state and attributes.
        this.activities_data = {
            name: "activities-page",
            title: "Activités"
        };
    }

    // Called when the component is loaded and ready to use.
    componentDidMount = () => {
        // Calls page ready event.
        if (typeof this.props.ready === "function") this.props.ready (this.activities_data);
    }

    // Called when the component is destroyed from the app view.
    componentWillUnmount = () => {
        // Calls page destroyed event.
        if (typeof this.props.destroyed === "function") this.props.destroyed (this.activities_data);
    }

    // Gives page render from jsx language.
    render = () => <div className = "activities"><label>Activities</label></div>;
}
