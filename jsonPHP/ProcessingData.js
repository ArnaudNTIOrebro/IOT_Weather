var xhttp = new XMLHttpRequest();

const data = [];

xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {               
            var JS_result = JSON.parse(xhttp.responseText);
            var places = JS_result.Places; 
            var placesInfo = '';

            for(var i = 0; i < places.length;i++)
            {
                placesInfo += '<li>'+ "Location : " +places[i].location + ". Humidity: "+ places[i].humidity+ "%"+'</li>';
                data.push([places[i].temperature, places[i].humidity]);
            }
            document.getElementById("demo").innerHTML = placesInfo;
}
console.log("log1" + data);
const xSize = 250; 
const ySize = 200;
const margin = 40;
const xMax = xSize - margin*2;
const yMax = ySize - margin*2;


            /*d3.json("./data.json", function(data) {
                console.log(data);
            });*/

const svg = d3.select("#myPlot")
.append("svg")
.append("g")
.attr("transform","translate(" + margin + "," + margin + ")");

// X Axis
const x = d3.scaleLinear()
  .domain([0, 100])
  .range([0, xMax]);

svg.append("g")
  .attr("transform", "translate(0," + yMax + ")")
  .call(d3.axisBottom(x));

// Y Axis
const y = d3.scaleLinear()
  .domain([0, 100])
  .range([ yMax, 0]);

svg.append("g")
  .call(d3.axisLeft(y));
console.log(data);
console.log(data[0]);
console.log(data[1]);
// Dots
svg.append('g')
  .selectAll("dot")
  .data(data).enter()
  .append("circle")
  .attr("cx", function (d) { return d[0] } )
  .attr("cy", function (d) { return d[1] } )
  .attr("r", 3)
  .style("fill", "Red");
            

};
xhttp.open("GET", "data.json", true);
xhttp.send();