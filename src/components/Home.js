import React, { Component } from 'react';
import AliyahInvite from '../images/AliyahInvite.jpg';
import axios from 'axios';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);

export default class Home extends Component {

    componentDidMount(){
        // Create chart instance
        var chart = am4core.create("chartdiv", am4charts.PieChart);
        axios.get('http://localhost:4000/rsvp/data/').then(res => {
            console.log(res.data);
            for (var i = 0; i < res.data.length; i++){
                chart.data = [
                    { "sector": "Yes", "size": 9 },
                    { "sector": "No", "size": 2 },
                    { "sector": "Undecided", "size": 4 },
                    { "sector": "Awaiting Response", "size": 30 },
                  ];
            }
        });

        chart.innerRadius = 100;
        var label = chart.seriesContainer.createChild(am4core.Label);
        label.text = "Guests";
        label.horizontalCenter = "middle";
        label.verticalCenter = "middle";
        label.fontSize = 50;
        // Add and configure Series
        var pieSeries = chart.series.push(new am4charts.PieSeries());
        pieSeries.dataFields.value = "size";
        pieSeries.dataFields.category = "sector";
        this.chart = chart;
    }

    componentWillUnmount() {
        if (this.chart) {
          this.chart.dispose();
        }
      }

    render(){
        return(
        <div>
            <div className="col-12" id="chartdiv"></div>

            <div className="col-6">
                <h3>Aliyah's Birthday Party !!</h3>
                <a href="https://ttejuosho.herokuapp.com" target="_blank" rel="noopener noreferrer">
                <img alt="Aliyah's Birthday Invite" height="600px" src={AliyahInvite} />
                </a>
            </div>

            
        </div>
        )
    }
}