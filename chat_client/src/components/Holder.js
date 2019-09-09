import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import MainChat from "./MainChat";
import Main from "./Main";

class Holder extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            trigger: false
        };
    }
    switchPages(trigger) {
        this.setState({trigger: trigger});
    }

    render() {
        return <div>
            {this.state.trigger
                ? <MainChat login={'max'} />
                : <Main switchPages={this.switchPages.bind(this)}/>
            }
        </div>
    };
}

export default Holder;
