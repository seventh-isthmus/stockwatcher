import React from "react";
import TickerWidget from "./tickerWidget";
import axios from "axios";

export default class TickerWidgets extends React.Component {
  
  constructor() {
    super();

    this.state = {
      data: []
    };
  }
  processData(d, ticker){
	console.log(ticker);
	d = d.data.datatable.data
	console.log(d)
	var displayItem = {name: ticker, data: d}
	var oldData = this.state.data;
	//The problem is here
	oldData.push(displayItem)
	this.setState(data: oldData);
	
  }
  getData(tickers, startDate, endDate){
    //Make an object that widget can process to make the call to the API and go through the map function to get passed to individual widgets
    var makeUrl = function(ticker, startDate, endDate){
	  return '/stock/search/' + ticker + '/' + startDate + '/' + endDate
        }
    var dataArray = [];
    
    for(var i = 0; i < tickers.length; i++){
	var url = makeUrl(tickers[i], startDate, endDate)
	var t = tickers[i]
        axios.get(url)
	.then(data => this.processData(data, t));
    }
  }
  drawData(){
  //Draws to svg with data
  }
  componentWillMount(){
  //Props move to state
  }
  render() {
    this.getData(this.props.tickers, this.props.startDate, this.props.endDate)
    console.log('processed');

    /*let widgets = d.map(j =>{
	return <TickerWidget key={j.id} name={j.name}/>
})*/
    return (
      <div className="widget-collection">
        {/*widgets*/}
      </div>
    );
  }
}
