import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDiplay from './SeasonDisplay';
import Spinner from './Spinner'

/*const App = () => {
    window.navigator.geolocation.getCurrentPosition(
        (position) => console.log(position),
        (err) => console.log(err)
    );
    return <div>Latitude: </div>
};*/

// React says we have to define render
class App extends React.Component {

    state = { lat: null, errorMessage:'' };

    componentDidMount() {
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({ lat: position.coords.latitude}),
            err => this.setState({errorMessage: err.message})
        );
    }

    renderContent() {

        if (this.state.errorMessage && !this.state.lat) {
            return <div>Error: {this.state.errorMessage}</div>
        }

        if (!this.state.errorMessage && this.state.lat) {
            return <SeasonDiplay lat = {this.state.lat}/>
        }

        return <Spinner message="Please accept location request" />;

    }

    // React says we have to define render!!!
    render () {
        return (
            <div className="border red">
                {this.renderContent()}
            </div>
        );
    }
}

ReactDOM.render (
    <App />, document.querySelector("#root")
);