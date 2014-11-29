var margin = {top: 0, right:20, bottom: 50, left: 200};                           
var w = 750 - margin.left - margin.right;
var h = 300 - margin.top - margin.bottom;
  
var xScale  = d3.scale.ordinal().domain(d3.range(3)).rangeRoundBands([0, w-120], 0.75);  //from book
var yScale = d3.scale.linear().domain([1, 0]).rangeRound([0, 200]); //from book considering my data

var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(10);


var svg = d3.select("#mean-zD3").append("svg")
            .attr("width", w + margin.left + margin.right)
            .attr("height", h + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



//data select from HTML dropdown:

// if you intend on using jquery, here's the easy way
// first, note, that you have to wrap your code in jquery ready call
// i'm doing it here, but you can wrap all your code in it
// and i'd put it all down at the bottom of the page


$(function(){
                          
    var $dropdown1 = $('#EPI1');
    
    $dropdown1.on('change',function(){
     var that = $(this),
      file = that.find('option:selected').val();
      
      console.log(file);

    var $dropdown2 = $('#EPI2');
    
    $dropdown2.on('change',function(){
     var that = $(this),
      file2 = that.find('option:selected').val();
      
      console.log(file2);
      
    // now bring in the data from the json and fire your stuff with d3
    if (file) { 
      d3.json(file,function(err,data){
        if (err) {
          console.log(err);
          return;
        }
        
        console.log(data);
        make_viz(data);

      });
    }  //end of if(file1)

    if (file2) { 
      d3.json(file2,function(err,data2){
        if (err) {
          console.log(err);
          return;
        }
        
        console.log(data2);
        make_viz(data2);

      });
    } //end of if(file2)    

    }); //end of $dropdown2= $("EPI2")

  }); //end of $dropdown1 = $("EPI1")


// add circles for EPI1
function make_Viz() {
  var circles = svg.selectAll("circle").data(data).enter().append("circle");
    
  circles.attr("cx", function(d,i) {return xScale(i);})  //from book how to reference ordinal scale
           .attr("cy", function(d) {return yScale(d.values)}) //.attr("cy", function(d) {return (d.values);})
           .attr("r", "9")
           .attr("fill",function(d) {return d.colours;})
           .append("title").text(function(d) {return d.values;})  //tooltip with actual mean value
           .attr("transform", "translate(0," + (h - xPadding) + ")")
           .attr("transform", "translate(" + yPadding + ",0)");


// add error bars for circles EPI1
  var lines = svg.selectAll("line").data(data).enter().append("line");

  lines.attr("x1", function(d,i) {return xScale(i);})  //x-position of mean
       .attr("y1", function(d) {return yScale(d.values+(d.sd/2));})  //y-position of mean
       .attr("x2", function(d,i) {return xScale(i);}) //x-position of mean same as x1 because vertical line
       .attr("y2", function(d) {return yScale(d.values-(d.sd/2));})   //y position 
       .attr("stroke-width", 2)
       .attr("stroke", function(d) {return d.colours;});


// add squares for EPI2
function make_viz2() {
        var rect = svg.selectAll("rect").data(data).enter().append("rect");

        rect.attr("x", function(d,i) {return xScale(i)+40;})
            .attr("y", function(d) {return yScale(d.values)-8})
            .attr("width", "16")
            .attr("height", "16")
            .attr("fill", function(d) {return d.colours;});


// add error bars for squares EPI2
        var linesb = svg.selectAll("rects").data(data).enter().append("line");

        linesb.attr("x1", function(d,i) {return xScale(i)+48;})  //x-position of mean +40px to shift it rightward like the rects (squares)
             .attr("y1", function(d) {return yScale(d.values+(d.sd/2));})  //y-position of mean
             .attr("x2", function(d,i) {return xScale(i)+48;}) //x-position of mean same as x1 because vertical line
             .attr("y2", function(d) {return yScale(d.values-(d.sd/2));})   //y position 
             .attr("stroke-width", 2)
             .attr("stroke", function(d) {return d.colours;});

};   //end of function make_viz2

 

  svg.append("text")
     .attr("class", "y-label")
     .attr("transform", "rotate(-90)")
     .attr("y", 0-40)
     .attr("x", 0-(h/2-6))
     .style("text-anchor", "middle")
     .text("Mean Correlation");

  svg.append("text")
     .attr("class", "y-label")
     .attr("transform", "rotate(-90)")
     .attr("y", 0-10)
     .attr("x", 0-(h/2-6))
     .style("text-anchor", "middle")
     .text("z-score (+/- sd)");

  var xPadding = 30;
  var yPadding = 50; 
  svg.append("g").attr("class", "axis").attr("transform", "translate(50," + (h - xPadding) + ")").call(xAxis);
  svg.append("g").attr("class", "axis").attr("transform", "translate(" + yPadding + ",20)").call(yAxis);

};//end make_viz function
}); //end of whole function()
