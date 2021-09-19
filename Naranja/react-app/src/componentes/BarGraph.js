import React, { Component } from 'react';
import data from "../helpers/data.json";

import CanvasJSReact from '../assets/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
function ElementoLista(){
    
    
}
 
class StackedBarChart extends Component {
	constructor() {
		super();
		this.toggleDataSeries = this.toggleDataSeries.bind(this);
	}
    votosUp = ()=>{

        return data.twits.map((voto) =>{
            return { x: voto.fecha, y: parseInt(voto.upvotes) };
          })
    }
    votosDown = ()=>{
        return data.twits.map((voto) =>{
            return { x: voto.fecha, y: parseInt(voto.dowvotes) };
          })
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
				xValueFormatString: "DD, MMM",
				yValueFormatString: "#,##0",
				dataPoints: [
					{ x: new Date(2018, 5, 27), y: 71 },
					{ x: new Date(2018, 5, 28), y: 41 },
					{ x: new Date(2018, 5, 29), y: 60 },
					{ x: new Date(2018, 5, 30), y: 75 },
					{ x: new Date(2018, 6, 1), y: 98 }
				]
			},
			
			{
				type: "stackedBar",
				name: "DownVote",
				showInLegend: "true",
				xValueFormatString: "DD, MMM",
				yValueFormatString: "#,##0",
				dataPoints: [
					{ x: new Date(2018, 5, 27), y: 20 },
					{ x: new Date(2018, 5, 28), y: 35 },
					{ x: new Date(2018, 5, 29), y: 30 },
					{ x: new Date(2018, 5, 30), y: 45 },
					{ x: new Date(2018, 6, 1), y: 25 }
				]
			}]
		}
		
		return (
		<div>
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