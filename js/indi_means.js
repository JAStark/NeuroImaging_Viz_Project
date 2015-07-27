$(function(){
           
var margin = {top: 10, right:20, bottom: 50, left: 75};                           
var w = 800 - margin.left - margin.right;
var h = 350 - margin.top - margin.bottom;
  
var xScale  = d3.scale.ordinal().domain(d3.range(3)).rangeRoundBands([0, w-120], 0.75);  //from book
var yScale = d3.scale.linear().domain([0.8, 0]).rangeRound([0, 300]); //from book considering my data

var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(10);

  //create tooltip (from http://bl.ocks.org/Caged/6476579)
var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) { return "<strong>" + d.key + " Mean Z-score </strong> <span style='color:red'>" + d3.round(d.values, 2) + "</span>";
            })
 

var svg = d3.select("#mean-zD3").append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


  svg.call(tip); 

//function for y grid axis lines
function make_y_axis() { return d3.svg.axis().scale(yScale).orient("left").ticks(10)}

var colours = d3.scale.ordinal().domain(["DMN", "ECN", "SN"]).range(["#354e7f","#139e9e","#b81359"]);

 var $inputs = $('#EPI1, #EPI2');
 function on_change(){
   var that = $(this),
      file = that.find('option:selected').val(),
      id = that.attr('id');
      
      if (file) { 
      d3.json(file,function(err,data){
        if (err) {
          console.log(err);
          return;
        }
      
       switch (id) {
         case 'EPI1':
          make_viz(data);
          break;
         case 'EPI2':
          make_viz2(data);
          break;
          default:
          alert(id);
       } //end switch (id) 


      });
    } //end if (file) statement
  } // end function on_change()

$inputs.on('change',on_change); // end $inputs.on('change', function  

 d3.json("js/mean-z/EPI1_101.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;
  make_viz(data);
 });
 
window.setTimeout(function() {
 d3.json("js/mean-z/EPI2_101.json", function(error, json) {
  if (error) return console.warn(error);
  data2 = json;
  make_viz2(data2);
 });
 } ,200)


// add circles for EPI1
function make_viz(data) {
  //alert(circles.toString());
  
  var group = svg.selectAll('g.EPI1');
  if (group.empty())
    group = svg.append('g').classed('EPI1', true);

  var circles = group.selectAll("circle").data(data);
  circles.enter().append("circle");

  //var circle = svg.selectAll("circle").data(data).enter().append("circle");
     
  circles.attr("cx", function(d,i) {return xScale(i);})  //from book how to reference ordinal scale
           .attr("cy", function(d) {return yScale(d.values)}) //.attr("cy", function(d) {return (d.values);})
           .attr("r", "18")
           .attr("fill",function(d) {return colours(d.key);})
           .attr("transform", "translate(0," + (h - xPadding) + ")")
           .attr("transform", "translate(" + dPadding + ",20)")
           .on('mouseover', tip.show)
           .on('mouseout', tip.hide);


// add error bars for circles EPI1
  var lines = group.selectAll("line").data(data);
  //alert(lines[0].length)
  lines.enter().append("line");

  lines.attr("x1", function(d,i) {return xScale(i);})  //x-position of mean
       .attr("y1", function(d) {return yScale(d.values+(d.sd/2));})  //y-position of mean
       .attr("x2", function(d,i) {return xScale(i);}) //x-position of mean same as x1 because vertical line
       .attr("y2", function(d) {return yScale(d.values-(d.sd/2));})   //y position 
       .attr("stroke-width", 2)
       .attr("stroke", function(d) {return colours(d.key);})
       .attr("transform", "translate(0," + (h - xPadding) + ")")
       .attr("transform", "translate(" + dPadding + ",20)");

}; //end make_viz function


// add squares for EPI2
function make_viz2(data2) {

    var group = svg.selectAll('g.EPI2');
  if (group.empty())
    group = svg.append('g').classed('EPI2', true);

  var rects = group.selectAll("rect").data(data2);
  rects.enter().append("rect");


        rects.attr("x", function(d,i) {return xScale(i)+40;})
            .attr("y", function(d) {return yScale(d.values)-16})
            .attr("width", "32")
            .attr("height", "32")
            .attr("fill", function(d) {return colours(d.key);})
           .attr("transform", "translate(0," + (h - xPadding) + ")")
           .attr("transform", "translate(" + dPadding + ",20)")
           .on('mouseover', tip.show)
           .on('mouseout', tip.hide);


      // add error bars for squares EPI2
        var line = group.selectAll("line").data(data2);
        line.enter().append("line");

        line.attr("x1", function(d,i) {return xScale(i)+56;})  //x-position of mean +40px to shift it rightward like the rects (squares)
             .attr("y1", function(d) {return yScale(d.values+(d.sd/2));})  //y-position of mean
             .attr("x2", function(d,i) {return xScale(i)+56;}) //x-position of mean same as x1 because vertical line
             .attr("y2", function(d) {return yScale(d.values-(d.sd/2));})   //y position 
             .attr("stroke-width", 2)
             .attr("stroke", function(d) {return colours(d.key);})
             .attr("transform", "translate(0," + (h - xPadding) + ")")
             .attr("transform", "translate(" + dPadding + ",20)");


};   //end of function make_viz2


  svg.append("text")
     .attr("class", "y-label")
     .attr("transform", "rotate(-90)")
     .attr("y", 0-40)
     .attr("x", 0-(h/2+15))
     .style("text-anchor", "middle")
     .text("Mean Correlation");

  svg.append("text")
     .attr("class", "y-label")
     .attr("transform", "rotate(-90)")
     .attr("y", 0-10)
     .attr("x", 0-(h/2+15))
     .style("text-anchor", "middle")
     .text("z-score (+/- sd)");

  var dPadding = 20
  var xPadding = 30;
  var yPadding = 50; 

  //Draw y gridlines
  svg.append("g")
      .attr("class", "grid")
      .attr("transform", "translate(" + yPadding + ",20)").call(yAxis)
      .call(make_y_axis()
        .tickSize(-500, 0, 0)
        .tickFormat(" "));


  //svg.append("g").attr("class", "axis").attr("transform", "translate(50," + (h - xPadding) + ")").call(xAxis);
  svg.append("g").attr("class", "axis").attr("transform", "translate(" + yPadding + ",20)").call(yAxis);
  //on_change();

// function type(d) {
//   d.values = +d.values;
//   return d;
// }

})//end whole $function()