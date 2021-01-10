import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ReactPlayer from 'react-player';
import Weather from "./components/weather.component"
import 'bootstrap/dist/css/bootstrap.min.css';
import 'weather-icons/css/weather-icons.css';
//api.openweathermap.org/data/2.5/weather?q=London,uk&appid=
//const api_key = "154083a3593ffca1fd6b314c541bcf0b";
class App extends Component{
    constructor() {
        super();
        this.state = {
            value: '',
            city: undefined,
            country: undefined,
            icon: undefined,
            main: undefined,
            celsius: undefined,
            temp_max: undefined,
            temp_min: undefined,
            des: "",
            error : false
        };
        this.getWeather();
        this.handleChange = this.handleChange.bind(this);
        this.weatherIcon = {
            Thunderstorm: "wi-thunderstorm",
            Drizzle: "wi-sleet",
            Rain: "wi-storm-showers",
            Snow: "wi-snow",
            Atmosphere: "wi-fog",
            Clear: "wi-day-sunny",
            Clouds: "wi-day-fog"
        };
    }

    get_WeatherIcon(icons, rangeId) {
        switch (true) {
            case rangeId >= 200 && rangeId < 232:
                this.setState({ icon: icons.Thunderstorm });
                break;
            case rangeId >= 300 && rangeId <= 321:
                this.setState({ icon: icons.Drizzle });
                break;
            case rangeId >= 500 && rangeId <= 521:
                this.setState({ icon: icons.Rain });
                break;
            case rangeId >= 600 && rangeId <= 622:
                this.setState({ icon: icons.Snow });
                break;
            case rangeId >= 701 && rangeId <= 781:
                this.setState({ icon: icons.Atmosphere });
                break;
            case rangeId === 800:
                this.setState({ icon: icons.Clear });
                break;
            case rangeId >= 801 && rangeId <= 804:
                this.setState({ icon: icons.Clouds });
                break;
            default:
                this.setState({ icon: icons.Clouds });
        }
    }

    calCel(temp) {
        let cell = Math.floor(temp - 273.15)
        return cell;
    }

    getWeather = async () => {
            const api_call = await
                fetch(
                    'http://api.openweathermap.org/data/2.5/weather?q=hanoi,vn&appid=bf97b8a697f657e96c6a1432fe66756e');
            const response = await api_call.json();
            this.setState({
                city: `${response.name}, ${response.sys.country}`,
                country: response.sys.country,
                main: response.weather[0].main,
                celsius: this.calCel(response.main.temp),
                temp_max: this.calCel(response.main.temp_max),
                temp_min: this.calCel(response.main.temp_min),
                des: response.weather[0].description,
                error: false
            });
            this.get_WeatherIcon(this.weatherIcon, response.weather[0].id);
            console.log(response);
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
            <Weather
                city={this.state.city}
                weatherIcon={this.state.icon}
                temp_celsius={this.state.celsius}
                temp_max={this.state.temp_max}
                temp_min={this.state.temp_min}
                des={this.state.des}
            />
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

