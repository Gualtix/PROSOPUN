import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

 
class MultiseriesChart extends Component {	
	render() {
		const options = {
				animationEnabled: true,	
				title:{
					text: "Up Votes VS Down Votes"
				},
				axisY : {
					title: "Numero de Votos",
					includeZero: false
				},
				toolTip: {
					shared: true
				},
				data: [{
					type: "spline",
					name: "UpVotes",
					showInLegend: true,
					dataPoints: this.props.arreglo1
				},
				{
					type: "spline",
					name: "DownVotes",
					showInLegend: true,
					dataPoints: this.props.arreglo2
				}]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default MultiseriesChart;