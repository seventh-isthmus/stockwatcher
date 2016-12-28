import React from "react";
import Grapher from "./Grapher";



ReactDOM.render(
  <Grapher  />,
  document.getElementById('container')
)




//There should be no setting of state, everything should be controlled through props and simply redrawn
var TickerWidgets = React.createClass({
  getInitialState() {
    return {
      tickers: [],
      data: [],
      maxPrice: 0
    };
  }
  processData(d, ticker){
	console.log(ticker);
	d = d.data.datatable.data
	var data = d.map(function(a){
	  return {date: a[0], price: a[1]}	
	})
	console.log(data)
	var displayItem = {name: ticker, data: data}
	var oldData = this.state.data;
	oldData.push(displayItem)
	//Let's draw the data instead
	this.drawData(displayItem);
	
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
  getAllPrices(){
    var makeUrl = function(){
	var t = "";
	for(var i = 0; i < this.props.tickers.length; i++){
	  t = t + this.props.tickers[i];
	  if(i !== this.props.tickers.length - 1){
	    t = t + ","
	  }
	}
	return '/stock/search/' + t + '/' + startDate + '/' + endDate
    }

    axios.get(url)
    .then(data => this.processPrices(data))
  }
  processPrices(data){
    var d = data.data.datatable.data
    var prices = d.map(function(a){
	return a[1]
})
    var maxPrice = d3.max(prices);
    this.setState({maxPrice: maxPrice});
  }
  drawData(){
  
  }
　　componentDidMount(){
    //Draw the initial Map
　　　　Drawer.setHW("#graph", ".graph-box");
    Drawer.addMargins("#graph");
    var minDate = Drawer.findMinDate(this.props.initialData.data);
　　　　console.log(minDate);
    var maxDate = Drawer.findMaxDate(this.props.initialData.data);
    var maxPrice = Drawer.findMaxPrice(this.props.initialData.data);
    var scales = Drawer.getScale(minDate, maxDate, maxPrice);
    Drawer.drawAxes(scales.xScale, scales.yScale);
    Drawer.drawLine(this.props.initialData.data, this.props.initialData.name, scales)
    
    //Add the initial map data to the states
    //this.setState({tickers:this.props.tickers})
  }
  render() {
    /*this.getAllPrices();
    this.getData(this.props.tickers, this.props.startDate, this.props.endDate)
    console.log('processed');*/

    //Let's jsut try to get the widgets to appear first
    let widgets = this.state.tickers.map(function(t, i){
	return <TickerWidget key={i} name={t}/>
})
    return (
      <div className="widget-collection">
        {widgets}
      </div>
    );
  }
})

var Drawer = (function() {

  var margins = {
    "top": 50,
    "left": 30,
    "bottom": 30,
    "right": 10
  }

  var height = 500 - margins.top - margins.bottom;
  var width = 700 - margins.left - margins.right;

  return{
  findMinDate: function(data){
    return d3.min(data, function(d){
	console.log(d.date);
	return d.date
    })
    
　　},
  findMaxDate: function(data){
    return d3.max(data, function(d){
	console.log(d.date);
	return d.date;
    })
  },
  findMaxPrice: function(data){
    return d3.max(data, function(d){
	return d.price;
    })
  },
  //Set initial height and width of SVG
  setHW: function(svg, cont){
    d3.select(svg)
      .attr("height", height + margins.top + margins.bottom)
      .attr("width", width + margins.left + margins.right)
    d3.select(cont)
      .attr("height", height + margins.top + margins.bottom)
      .attr("width", width + margins.left + margins.right)
  },
  //Add inner G for margins, 'containerG'
  addMargins: function(svg){
    d3.select(svg)
      .append("g")
      .attr("id", "containerG")
      .attr("transform", "translate(" + margins.left + "," +margins.top + ")")
  },
  //Return Scale
  getScale: function(minDate, maxDate, maxPrice){
    var xScale = d3.scaleLinear().domain([maxDate, minDate]).range([0,width])
    var yScale = d3.scaleLinear().domain([maxPrice, 0]).range([height, 0])
    return {xScale:xScale, yScale:yScale}
  },
  drawAxes: function(xScale, yScale){
    //First Check if there are already axes and if there are delete the old axes
    var yAxis = d3.axisLeft().scale(yScale).tickSize(0)
    d3.select("#containerG").append("g").attr("id", "yAxisG").attr("transform", "translate(0,0)").call(yAxis);

    var xAxis = d3.axisBottom().scale(xScale).tickSize(0)
    d3.select("#containerG").append("g").attr("id", "xAxisG").attr("transform", "translate(0," + height + ")").call(xAxis);
  },
  drawLine: function(data, ticker, s){
    //First add a g with the id of the ticker
    //There is no x and y in my data now
    var line = d3.line()
    line.x(function(d) {return s.xScale(d.date);})
    line.y(function(d){return s.yScale(d.price);})
    line.curve();

　　　　var lineG = d3.select("#containerG").append("g")
    lineG.attr("id", ticker + "-g")

    //Add the data and draw
　　　　var containerG = d3.select('#containerG')
.append('svg:path')
.attr('d', line(data))
.attr('stroke', 'blue')
.attr('stroke-width', 2)
.attr('fill', 'none');
  }
  }
}());



var TickerWidget = React.createClass({
  getInitialState() {
    return {
      ticker: ""
    };
  }
  render() {
    return (
      <div className="text-center widget-button">
        <span>{this.props.name}</span>
      </div>
    );
  }
});



var mapped = initialData.map(function(d){
  return {date: new Date(d[0]), price: d[1]};
})

initialData = {name: "AAPL", data: mapped};


var darken = function(){
    /*d3.select(".background")
.style("opacity","0.5");
    d3.select("graph")
.style("display", "none");
    d3.select("grapher")
.style("display", "block");
}

var close = function() {
  d3.select("grapher")
.style("display", "none");
  d3.select("graph")
.style("display", "block");
  d3.select(".background")
.style("opacity", "0")
}*/
}

var Grapher = React.createClass({
  getInitialState() {
    return {
      tickers: [],
      startDate: new Date(),
      endDate: new Date(),
      currentTicker: "",
      addTickerText: ""
    };
  }
//I think I need to combine the two pieces again.
//That would also remove the communication problem
  addWindowTicker(){
    var oldTickers = this.state.tickers
    oldTickers.push(this.state.addTickerText);
    this.setState({tickers: oldTickers});
  }
  addTicker() {
    //This method needs to go to setState
    this.state.tickers.push(this.state.currentTicker);
    this.setState(currentTicker: "");
  }
  UpdateCurrentTicker(evt){
    this.setState({currentTicker: evt.target.value});
  }
  UpdateStartDate(evt){
    //This needs to feed into props, where it will then just send re-render the object with a call to the api
    this.setState({startDate: evt.target.value});
  }
  UpdateAddTickerText(evt){
　　　　this.setState({AddTickerText: evt.target.value});
  }
  UpdateEndDate(evt){
    this.setState({endDate: evt.target.value});
  }
  componentDidMount() {
  this.setState({tickers: this.props.tickers})
  this.setState({startDate: this.props.startDate})
  this.setState({endDate: this.props.endDate})
  }
  onAddTickerClick(e){
  d3.select(".add-window").style("display", "block")
  .style("position", "absolute")
　　.style("top", "100%")
  alert('hi')
  }
　　close(){
    console.log('dog');
  }
  render() {
    return (
　　　　  <div>
        <div className="graph-box">
	  <div className="graph-title">Stocks</div>
	  <svg id="graph">
	    <image id="settings-cog"　onClick={darken()} href="/img/cog.svg" x="630" y="20" height="50px" width="50px"/>
	  </svg>
	  <div className="details"></div>
　　　　    </div>
      
      <div className="grapher row">
	<div className="add-window col-md-6 col-md-offset-3">
	  <h1 className="text-center">Add Ticker</h1>
	  <input className="" type="text" value={this.state.addTickerText} onChange={this.UpdateAddTickerText} placeholder="Enter a ticker..." />
	  <button className="btn btn-large btn-default" onClick={this.addWindowTicker}>Add</button>
	</div>
	<div className="settings-wall col-md-6 col-md-offset-3">
	    <h1 className="text-center">Settings</h1>
	    <div className="form-horizontal">	
              <div className="col-md-10 col-md-offset-1　change-start-date-widget form-group">
	      　　<label for="startDateControl" className="col-sm-2 control-label">Start Date</label>
	　　    　　<div className="col-sm-10"><input className="form-control" id="startDateControl" type="date" value={this.state.startDate} onChange={this.UpdateStartDate} /></div>
	      </div>
	      <div className="col-md-10 col-md-offset-1　change-end-date-widget form-group">
	      　　<label for="endDateControl" className="col-sm-2 control-label">End Date</label>
              　　<div className="col-sm-10"><input className="form-control" id="endDateControl" type="date" value={this.state.endDate} onChange={this.UpdateEndDate} /></div>
	     　</div>
　　　　　　　　　　　　</div>
	    <div className="col-sm-10 col-sm-offset-1 add-ticker-widget">
	    　　<TickerWidgets initialData={initialData}　tickers={["AAPL"]} startDate={this.state.startDate} endDate={this.state.endDate} />
	    　　<div className="add-widget-button widget-button text-center" onClick={this.onAddTickerClick}>
	      </div>
	    </div>
	    <button id="closeButton" className="btn btn-default btn-large" onClick={this.close()}>Close</button>
       　</div>
      </div>
    </div>
    );
  }
})






















var initialData = [["2016-05-05",94.0],["2016-05-06",93.37],["2016-05-09",93.0],["2016-05-10",93.33],["2016-05-11",93.48],["2016-05-12",92.72],["2016-05-13",90.0],["2016-05-16",92.39],["2016-05-17",94.55],["2016-05-18",94.16],["2016-05-19",94.64],["2016-05-20",94.64],["2016-05-23",95.87],["2016-05-24",97.22],["2016-05-25",98.67],["2016-05-26",99.68],["2016-05-27",99.44],["2016-05-31",99.6],["2016-06-01",99.02],["2016-06-02",97.6],["2016-06-03",97.79],["2016-06-06",97.99],["2016-06-07",99.25],["2016-06-08",99.02],["2016-06-09",98.5],["2016-06-10",98.53],["2016-06-13",98.69],["2016-06-14",97.32],["2016-06-15",97.82],["2016-06-16",96.45],["2016-06-17",96.62],["2016-06-20",96.0],["2016-06-21",94.94],["2016-06-22",96.25],["2016-06-23",95.94],["2016-06-24",92.91],["2016-06-27",93.0],["2016-06-28",92.9],["2016-06-29",93.97],["2016-06-30",94.44],["2016-07-01",95.49],["2016-07-05",95.39],["2016-07-06",94.6],["2016-07-07",95.7],["2016-07-08",96.49],["2016-07-11",96.75],["2016-07-12",97.17],["2016-07-13",97.41],["2016-07-14",97.39],["2016-07-15",98.92],["2016-07-18",98.7],["2016-07-19",99.56],["2016-07-20",100.0],["2016-07-21",99.83],["2016-07-22",99.26],["2016-07-25",98.25],["2016-07-26",96.82],["2016-07-27",104.265],["2016-07-28",102.83],["2016-07-29",104.19],["2016-08-01",104.41],["2016-08-02",106.05],["2016-08-03",104.81],["2016-08-04",105.58],["2016-08-05",106.27],["2016-08-08",107.52],["2016-08-09",108.23],["2016-08-10",108.71],["2016-08-11",108.52],["2016-08-12",107.78],["2016-08-15",108.14],["2016-08-16",109.63],["2016-08-17",109.1],["2016-08-18",109.23],["2016-08-19",108.77],["2016-08-22",108.86],["2016-08-23",108.59],["2016-08-24",108.565],["2016-08-25",107.39],["2016-08-26",107.41],["2016-08-29",106.62],["2016-08-30",105.8],["2016-08-31",105.66],["2016-09-01",106.14],["2016-09-02",107.7],["2016-09-06",107.9],["2016-09-07",107.83],["2016-09-08",107.25],["2016-09-09",104.64],["2016-09-12",102.65],["2016-09-13",107.51],["2016-09-14",108.73],["2016-09-15",113.86],["2016-09-16",115.12],["2016-09-19",115.19],["2016-09-20",113.05],["2016-09-21",113.85],["2016-09-22",114.35],["2016-09-23",114.42],["2016-09-26",111.64],["2016-09-27",113.0],["2016-09-28",113.69],["2016-09-29",113.16],["2016-09-30",112.46],["2016-10-03",112.71],["2016-10-04",113.06],["2016-10-05",113.4],["2016-10-06",113.7],["2016-10-07",114.31],["2016-10-10",115.02],["2016-10-11",117.7],["2016-10-12",117.35],["2016-10-13",116.79],["2016-10-14",117.88],["2016-10-17",117.33],["2016-10-18",118.18],["2016-10-19",117.25],["2016-10-20",116.86],["2016-10-21",116.81],["2016-10-24",117.1],["2016-10-25",117.95],["2016-10-26",114.31],["2016-10-27",115.39],["2016-10-28",113.87],["2016-10-31",113.65],["2016-11-01",113.46],["2016-11-02",111.4],["2016-11-03",110.98],["2016-11-04",108.53],["2016-11-07",110.08],["2016-11-08",110.31],["2016-11-09",109.88],["2016-11-10",111.09]];