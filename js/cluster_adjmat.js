// Adjacency Matrix for Clusters (adapted from Bostock)

function make_adjMat() {
    var margin = {top: 100, right: 60, bottom: 30, left: 60},
        width = 255,
        height = 255;

    var x = d3.scale.ordinal().rangeBands([0, width]),
        color = d3.scale.ordinal().domain(["DMN", "ECN", "SN"]).range(["#354e7f","#139e9e","#b81359"]),
        color_weight = d3.scale.quantile().domain([0.01, 0.03, 0.06, 0.9, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6]).range(["#276419", "#4d9221", "#7fbc41", "#b8e186", "#e6f5d0", "#f7f7f7", "#fde0ef", "#f1b6da", "#de77ae", "#c51b7d", "#8e0152"]);  //color blind safe. Both from Color Brewer

  //create tooltip (from http://bl.ocks.org/Caged/6476579)
var tip = d3.tip()
            .attr('class', 'd3-tip')
            .offset([-10, 0])
            .html(function(d) { return "<strong>"+  d3.round(d.z, 2) + "</span>";
            })

    var svg = d3.select("#corrmatClustD3").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        //.style("margin-left", -margin.left + "px")
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  svg.call(tip);

      var matrix = [],
          nodes = data.nodes,
          n = nodes.length;

      // Compute index per node.
      nodes.forEach(function(node, i) {
        node.index = i; 
        //node.weight = 0; //pretty sure this does nothing in this script
        matrix[i] = d3.range(n).map(function(j) { return {x: j, y: i, z: 0}; });
      });

      // Convert links to matrix; count character occurrences.
      data.links.forEach(function(link) {
        matrix[link.source][link.target].z += link.weight;
        matrix[link.target][link.source].z += link.weight;
        matrix[link.source][link.source].z += link.weight;
        matrix[link.target][link.target].z += link.weight;
        //nodes[link.source].weight += link.weight;
        //nodes[link.target].weight += link.weight;
      });

      // Precompute the orders.
      var orders = {idNW_order: d3.range(n).sort(function(a, b) { return d3.ascending(nodes[a].order, nodes[b].order); })};

      // The default sort order.
      x.domain(orders.idNW_order); //how to make it sort order NW first, and then further sort by alphabet ("id") (ignoring "l" and "r")

      svg.append("rect")
          .attr("class", "background")
          .attr("width", width)
          .attr("height", height);

      var row = svg.selectAll(".row")
          .data(matrix)
        .enter().append("g")
          .attr("class", "row")
          .attr("transform", function(d, i) { return "translate(0," + x(i) + ")"; })
          .each(row);

      row.append("line")
          .attr("x2", width);
    
      row.append("text")
          .attr("x", -6)
          .attr("y", x.rangeBand() / 2)
          .attr("dy", ".32em")
          .attr("text-anchor", "end")
          .text(function(d, i) { return nodes[i].id; })
          .style("fill", function(d, i) {return color(nodes[i].NW);});

      var column = svg.selectAll(".column")
          .data(matrix)
        .enter().append("g")
          .attr("class", "column")
          .attr("transform", function(d, i) { return "translate(" + x(i) + ")rotate(-90)"; });

      column.append("line")
          .attr("x1", -width);

      column.append("text")
          .attr("x", 6)
          .attr("y", x.rangeBand() / 2)
          .attr("dy", ".32em")
          .attr("text-anchor", "start")
          .text(function(d, i) { return nodes[i].id; })
          .style("fill", function(d, i) {return color(nodes[i].NW);});
      
      
      function row(row) {
        var cell = d3.select(this).selectAll(".cell")
            .data(row.filter(function(d) { return d.z; }))
            .enter().append("rect")
            .attr("class", "cell")
            .attr("z", function(d) { return d.z; })
            .attr("x", function(d) { return x(d.x); })
            .attr("width", x.rangeBand())
            .attr("height", x.rangeBand())
            .style("fill", function(d) {return color_weight(d.z); }) //right now THIS is mapping to weight value
            .on("mouseover", mouseover)
            .on("mouseout", mouseout);
      }

      function mouseover(p) {
        var gr = d3.selectAll(".row text");
   //     alert(gr[0].length);
        tip.show(p);
        svg.selectAll(".row text").classed("active", function(d, i) { return i == p.y; });
        svg.selectAll(".column text").classed("active", function(d, i) { return i == p.x;
        });
      }

      function mouseout() {
        tip.hide();
        svg.selectAll("text").classed("active", false);
      }

};  // end make_adjMat() function

//make_adjMat();

  d3.json("js/corrmat/EPI1_Clust0_corrmat.json", function(error, json) {
   if (error) return console.warn(error);
   data = json;
   make_adjMat();
  });
 
window.setTimeout(function() {
 d3.json("js/corrmat/EPI1_Clust1_corrmat.json", function(error, json) {
  if (error) return console.warn(error);
  data = json;
  make_adjMat();
 }); 

} ,500)