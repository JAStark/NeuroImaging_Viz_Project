<script type="text/javascript">

                          var EPI1 = [
                                  {"key": "DMN", "values": 0.3612327342549958, "sd":0.15721708382087163},
                                  {"key":"SN", "values": 0.36594731104141204, "sd":0.1438314594956751},
                                  {"key":"ECN", "values":0.4103003289319152, "sd":0.13817466701640893},
                                ]

                          var EPI2 = [
                                    {"key": "DMN", "values":0.43707597131902304, "sd":0.10188232006323178}, 
                                    {"key": "SN", "values":0.4854244668719318, "sd":0.1210977798623367}, 
                                    {"key": "ECN", "values":0.4711811105133274, "sd": 0.1537981757653103}
                                  ]                       
                            
                        var margin = {top: 100, right:20, bottom: 30, left: 100};                           
                        var w = 550 - margin.left - margin.right;
                        var h = 380 - margin.top - margin.bottom;
                            
                         var xScale  = d3.scale.ordinal().domain(d3.range(3)).rangeRoundBands([0, w-120], 0.75);  //from book
                         var yScale = d3.scale.linear().domain([1, 0]).rangeRound([0, 200]); //from book considering my data

                         var color = d3.scale.category10();

                         var xAxis = d3.svg.axis().scale(xScale).orient("bottom");
                         var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(10);


                          var svg = d3.select("#mean-z").append("svg")
                                      .attr("width", w + margin.left + margin.right)
                                      .attr("height", h + margin.top + margin.bottom)
                                      .append("g")
                                      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

                          

                          // d3.json("js/EPI1_108.json", function(error, EPI1) {
                          //   EPI1.forEach(function(d) {
                          //     d.key = parse(d.key);
                          //     d.close = +d.close;
                          //   });

                          var circles = svg.selectAll("circle").data(EPI1).enter().append("circle");
                          
                          circles.attr("cx", function(d,i) {return xScale(i);})  //from book how to reference ordinal scale
                                  .attr("cy", function(d) {return yScale(d.values)}) //.attr("cy", function(d) {return (d.values);})
                                  .attr("r", "9")
                                  .attr("fill",function(d) {return color(d.key);})
                                  .append("title").text(function(d) {return d.values;});

                          var lines = svg.selectAll("line").data(EPI1).enter().append("line");

                           lines.attr("x1", function(d,i) {return xScale(i);})  //x-position of mean
                                 .attr("y1", function(d) {return yScale(d.values+(d.sd/2));})  //y-position of mean
                                 .attr("x2", function(d,i) {return xScale(i);}) //x-position of mean same as x1 because vertical line
                                 .attr("y2", function(d) {return yScale(d.values-(d.sd/2));})   //y position 
                                 .attr("stroke-width", 2)
                                 .attr("stroke", function(d) {return color(d.key);});

                          //});    //end of var EPI1 = d3.json(loadData.json)



                          //var EPI2 = d3.json("js/EPI2_108.json", function(error, data) {

                          var rect = svg.selectAll("rect").data(EPI2).enter().append("rect");

                          rect.attr("x", function(d,i) {return xScale(i)+40;})
                                .attr("y", function(d) {return yScale(d.values)-8})
                                .attr("width", "16")
                                .attr("height", "16")
                                .attr("fill", function(d) {return color(d.key);});

                          var linesb = svg.selectAll("rects").data(EPI2).enter().append("line");

                          linesb.attr("x1", function(d,i) {return xScale(i)+48;})  //x-position of mean +40px to shift it rightward like the rects (squares)
                               .attr("y1", function(d) {return yScale(d.values+(d.sd/2));})  //y-position of mean
                               .attr("x2", function(d,i) {return xScale(i)+48;}) //x-position of mean same as x1 because vertical line
                               .attr("y2", function(d) {return yScale(d.values-(d.sd/2));})   //y position 
                               .attr("stroke-width", 2)
                               .attr("stroke", function(d) {return color(d.key);});

                            //});   /end of var EPI2 = d3.json(loadData.json)

                          var xPadding = 30;
                          var yPadding = 50; 
                          svg.append("g").attr("class", "axis").attr("transform", "translate(50," + (h - xPadding) + ")").call(xAxis);
                          svg.append("g").attr("class", "axis").attr("transform", "translate(" + yPadding + ",20)").call(yAxis);

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



                          </script>