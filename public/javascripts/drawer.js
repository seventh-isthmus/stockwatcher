

var Drawer = (function() {

  margins = {
    "top": 50,
    "left": 30,
    "bottom": 5,
    "right": 10
  }

  height = 700 - margins.top - margins.bottom;
  width = 500 - margins.left - margins.right;

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
