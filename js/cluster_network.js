// // // Make EPI1 Cluster Network Graphs
function networkClust() {
    var w = 355
    var h = 380

  //create tooltip (from http://bl.ocks.org/Caged/6476579)
var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) { return "<strong>" + d.NW + ":" + d.id + "</strong>";
            })

    var svg = d3.select("#networkClustD3").append("svg")
                  .attr("width", w )
                  .attr("height", h )
                  .attr('preserveAspectRatio', 'xMinYMin slice') 
                  .append("g");

  svg.call(tip);


    var color = d3.scale.ordinal().domain(["DMN", "ECN", "SN"]).range(["#354e7f","#139e9e","#b81359"]);
    var color_weight = d3.scale.linear().domain([0.3, 1]).range(["#f7f7f7", "#969696", "#252525"])


    var force = self.force = d3.layout.force()  //this looks unusual
      .nodes(graph.nodes)
      .links(graph.links)
      .gravity(0.05).distance(100).charge(-100)
      .size([w,h])
      .start();   

    var link = svg.selectAll(".link")
      .data(graph.links)
      .enter().append("line")
      .filter(function(d) {return d.weight>0.3})
      .attr("class", "link")
      .attr("x1", function(d) {return (d.source.x); })
      .attr("y1", function(d) {return (d.source.y); })
      .attr("x2", function(d) {return (d.target.x); })
      .attr("y2", function(d) {return (d.target.y); })
      .style("stroke-width", function(d) {return (d.weight*10);})
      .style("stroke", "#ccc");//function(d) {return color_weight(d.weight)});

    var node_drag = d3.behavior.drag()
      .on("dragstart", dragstart)
      .on("drag", dragmove)
      .on("dragend", dragend);

    var node = svg.selectAll(".node")
      .data(graph.nodes)
      .enter().append("circle")
      .attr("x", function(d) {return d.x;})
      .attr("y", function(d) {return d.y;})
      .attr("class", "node")
      .attr("r", 13)
      .style("fill", function(d) {return color(d.NW);})
      .call(node_drag);
  
    function dragstart(d, i) {
      force.stop(); // stops the force auto positioning before you start dragging
    }

    function dragmove(d, i) {
      d.px += d3.event.dx;
      d.py += d3.event.dy;
      d.x += d3.event.dx;
      d.y += d3.event.dy; 
      tick(); 
    }

    function dragend(d, i) {
      d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
      tick();
      force.resume();
    }
    
    force.on("tick", tick);

    function tick() {
          link.attr("x1", function(d) {return d.source.x; })
          .attr("y1", function(d) {return d.source.y; })
          .attr("x2", function(d) {return d.target.x; })
          .attr("y2", function(d) {return d.target.y; });

node.attr("cx", function(d) {return d.x; })
.attr("cy", function(d) {return d.y; })
.on('mouseover', tip.show)
.on('mouseout', tip.hide);
//.append("title").text(function(d) {return d.id;});
    } // end tick function
}; //end function networkClust()


 d3.json("js/network/EPI1_Clust0_Network.json", function(error, json) {
  if (error) return console.warn(error);
  graph = json;
  networkClust();
 });
 
window.setTimeout(function() {
 d3.json("js/network/EPI1_Clust1_Network.json", function(error, json) {
  if (error) return console.warn(error);
  graph = json;
  networkClust();
 }); 

} ,500)