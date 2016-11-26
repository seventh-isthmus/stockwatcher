

var Drawer = (function() {

  margins = {
    "top": 50,
    "left": 30,
    "bottom": 5,
    "right": 10
  }
  minDate = new Date();
  maxDate = new Date();
  maxPrice = 0;

  height = 700 - margins.top - margins.bottom;
  width = 500 - margins.left - margins.right;

  return{
  findMinDate: function(data){
    return d3.min(function(d){
	return new Date(d.date);
    }
　　},
  findMaxDate = function(data){
    return d3.max(function(d){
	return new Date(d.date);
    }
  },
  findMaxPrice = function(data){
    return d3.max(function(d){
	return d.price;
    }
  },
　　setMinDate = function(d){
    minDate = d;
  },
  setMaxDate = function(d){
    maxDate = d;
  },
　　setMaxPrice = function(p){
    maxPrice = p;
  },
  //Set initial height and width of SVG
  setHW = function(svg, cont){
    d3.select(svg)
      .attr("height", height + margins.top + margins.bottom)
      .attr("width", width + margins.left + margins.right)
    d3.select(cont)
      .attr("height", height + margins.top + margins.bottom)
      .attr("width", width + margins.left + margins.right)
  },
  //Add inner G for margins, 'containerG'
  addMargins = function(svg){
    d3.select(svg)
      .append("g")
      .attr("id", "containerG")
      .attr("transform", "translate(" + margins.left + "," +margins.top + ")")
  },
  //Return Scale
  getScale = function(){
    var xScale = d3.scaleLinear().domain([maxDate, minDate]).range([0,width])
    var yScale = d3.scaleLinear().domain([maxPrice, 0]).range([height, 0])
    return {xScale:xScale, yScale:yScale}
  },
  drawAxes = function(xScale, yScale){
    //First Check if there are already axes and if there are delete the old axes
    var yAxis = d3.axisLeft().scale(yScale).tickSize(0)
    d3.select("#containerG").append("g").attr("id", "yAxisG").attr("transform", "translate(0,0)").call(yAxis);

    var xAxis = d3.axisBottom().scale(xScale).tickSize(0)
    d3.select("#containerG").append("g").attr("id", "xAxisG").attr("transform", "translate(0," + height + ")").call(xAxis);
  },
  drawLine　= function(data, ticker){
    //First add a g with the id of the ticker
    //There is no x and y in my data now
    var lineFunc = d3.svg.line()
.x(function(d) {return xScale(d.date);})
.y(function(d){return yScale(d.price);})
.interpolate('linear');

　　　　var lineG = d3.select("#containerG").append("g")
    lineG.attr("id", ticker + "-g")

    //Add the data and draw
　　　　var containerG = d3.select('#containerG')
.append('svg:path')
.attr('d', lineFunc(data))
.attr('stroke', 'blue')
.attr('stroke-width', 2)
.attr('fill', 'none');
  }
  }
}());