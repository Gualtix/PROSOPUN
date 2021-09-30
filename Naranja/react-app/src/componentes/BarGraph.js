import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function ElementoLista(){
    
    
}
 
class StackedBarChart extends Component {
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}


	toggleDataSeries(e) {
		if(typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else {
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	render() {
		const options = {
			animationEnabled: true,
			theme: "dark2",
			/*title:{
				text: "Evening Sales in a Restaurant"
			},*/
			axisX: {
				valueFormatString: "DDD"
			},
			axisY: {
				prefix: ""
			},
			toolTip: {
				shared: true
			},
			legend:{
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			},
			data: [{
				type: "stackedBar",
				name: "UpVote",
				showInLegend: "true",
				xValueFormatString: "DD, MMM, YYYY",
				yValueFormatString: "#,##0",
				dataPoints: this.props.arreglo1
			},
			
			{
				type: "stackedBar",
				name: "DownVote",
				showInLegend: "true",
				xValueFormatString: "DD, MMM, YYYY",
				yValueFormatString: "#,##0",
				dataPoints: this.props.arreglo2
			}]
		}
		
		return (
		<div>
			{/*console.log(this.props.arreglo1)*/}
			<h2>UPVOTES VR DOWNVOTES</h2>
            {ElementoLista}
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default StackedBarChart;