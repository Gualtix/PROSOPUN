import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
//import data from "../helpers/data.json";

class PieChartWithCustomization extends Component {
	
	render() {
		const options = {
			theme: "dark2",
			animationEnabled: true,
			exportFileName: "New Year Resolutions",
			exportEnabled: true,
			
			data: [{
				type: "pie",
				showInLegend: true,
				legendText: "{label}",
				toolTipContent: "{label}: <strong>{y}%</strong>",
				indexLabel: "{y}%",
				indexLabelPlacement: "inside",
				dataPoints: [
					{ y: 20, label: "#TOP 1" },
					{ y: 20, label: "#TOP 2" },
					{ y: 30, label: "#TOP 3" },
					{ y: 10, label: "#TOP 4" },
					{ y: 20, label: "#TOP 5" },
				]
			}]
		}

	
		return (
		<div>
			<h2>TOP HASHTAG</h2>
			
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default PieChartWithCustomization;