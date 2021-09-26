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
				toolTipContent: "{label}: <strong>{y}UpVotes</strong>",
				indexLabel: "{y} UpVotes",
				indexLabelPlacement: "inside",
				dataPoints: this.props.arreglo
			}]
		}

	
		return (
		<div>
			<h2>TOP 5 HASHTAG</h2>
			
			<CanvasJSChart options = {options} 
				/* onRef={ref => this.chart = ref} */
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default PieChartWithCustomization;