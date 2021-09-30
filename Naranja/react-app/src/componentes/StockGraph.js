import React, { Component } from 'react';
import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
class StackedAreaChart extends Component {
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
	toggleDataSeries(e){
		if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
			e.dataSeries.visible = false;
		}
		else{
			e.dataSeries.visible = true;
		}
		this.chart.render();
	}
	render() {
		const options = {
			  theme: "light2",
			  animationEnabled: true,
			  exportEnabled: true,
			  title: {
				text: "Up Votes VS Down Votes"
			  },
			  axisY: {
				title: "Cantidad de Votos"
			  },
			  toolTip: {
				shared: true
			  },
			  legend: {
				verticalAlign: "center",
				horizontalAlign: "right",
				reversed: true,
				cursor: "pointer",
				itemclick: this.toggleDataSeries
			  },
			  data: [
				{
					type: "stackedArea",
					name: "Down Votes",
					showInLegend: true,
					xValueFormatString: "DD MMM YYYY",
					dataPoints: this.props.arreglo2
				},
				{
					type: "stackedArea",
					name: "Up Votes",
					showInLegend: true,
					xValueFormatString: "DD MMM YYYY",
					dataPoints: this.props.arreglo1
				}
				
			]
		}
		
		return (
		<div>
			<CanvasJSChart options = {options} 
				onRef={ref => this.chart = ref}
			/>
			{/*You can get reference to the chart instance as shown above using onRef. This allows you to access all chart properties and methods*/}
		</div>
		);
	}
}

export default StackedAreaChart;