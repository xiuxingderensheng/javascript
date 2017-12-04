import React, {Component} from 'react';
import config from './config.json';

class Greeter extends Component{
	render() {
		return (
			<div>
				<h1>{config.aa}</h1>
			</div>
		);
	}
}

export default Greeter