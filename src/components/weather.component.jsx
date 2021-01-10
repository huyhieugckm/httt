import React from 'react';
import Container from '@material-ui/core/Container';
const Weather = (props) => {
    return (
        <Container>
            <div className="cards">
                <h1>{props.city}</h1>
                <h5 className="py-4 px-4">
                    <i className={`wi ${props.weatherIcon} display-1`}/>
                </h5>
                <h1 className="px-5">{props.temp_celsius}&deg;</h1>
                {minmaxTemp(props.temp_min, props.temp_max)}
                <h4 className="py-3 px-3">{props.des}</h4>
            </div>
        </Container>
        );
}
function minmaxTemp(min, max) {
    return (
        <h3>
            <span className="px-4">{min}&deg;</span>
            <span className="px-4">{max}&deg;</span>
        </h3>

        );
}

export default Weather;