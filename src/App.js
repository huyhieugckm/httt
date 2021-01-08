import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ReactPlayer from 'react-player';

class App extends Component{
    constructor(props) {
        super(props);
        this.state = { value: '' };
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value });
    }
    render() {
        return <>
            <AppBar position='fixed'>
                <Toolbar>
                    <Typography variant="h6" >Custom Video Player</Typography>
                </Toolbar>
            </AppBar>
            <Toolbar />
            <Container maxWidth="md">
                <form>
                    <label>
                        Link:
                    <input type="text" value={this.state.value} onChange={this.handleChange} />
                    </label>
                </form>
                <ReactPlayer url={this.state.value} onChange={this.handleChange}
                />
            </Container>
        </>
    }
}
export default App;

