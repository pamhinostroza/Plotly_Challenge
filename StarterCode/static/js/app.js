

function buildMetaData (sampleNumber) {

d3.json("samples.json").then((data) => {
    metadata = data.metadata;
    var sample = metadata.filter(d => d.id == sampleNumber);
    sample = sample [0]
    var metadata_object = d3.select("#sample-metadata");
    metadata_object.html("")
    Object.entries(sample).forEach([key, value]) => {
        metadata_object.append("h6").text(`${key.toUpperCase()}: ${value}`);
    })
})
}
function buildCharts(sampleNumber) {
    d3.json("samples.json").then((data) => {
        samples = data.samples;
        var sample = samples.filter(d => d.id == sampleNumber);
        sample = sample[0]
        var otu_ids = sample.otu_ids
        var otu_labels = sample.otu_labels;
        var sample_values = sample.sample_values;

        barTrace = {
            y: otu_ids.slice(0,10).map(otu => `OTU ${otu}`).reverse(),
            x: sample_values.slice(0,10).reverse(),
            type: "bar",
            text: otu_labels.slice(0,10).reverse(),
            orientation: "h"
        }
        var layout = {
            title: "Top 10 OTU",
            yaxis:{
            tickmode:"linear",
            },
            margin: {
            l: 100,
            r: 100,
            t: 30,
            b: 20
            }
            };

Plotly.newplot("bar", [barTrace], layout);

var trace1 = {
    x: samples.otu_ids,
    y: samples.sample_values,
    mode: "markers",
    marker: {
    size: samples.sample_values,
    color: samples.otu_ids
    },
    text: samples.otu_labels
    };

    var layout = {
        xaxis:{title: "OTU ID"},
        height: 600,
        width: 1300
        };

        var data1 = [trace1];

        Plotly.newPlot("bubble", data1, layout); 
})};

var metadata = data.metadata;
var result = metadata.filter(meta => meta.id.toString() === id)[0];
var demographicInfo = d3.select("#sample-metadata");
demographicInfo.html("");
function optionChanged(id) {
getInfo(id);
}

function init() {
var dropdown = d3.select("#selDataset");
d3.json("./samples.json").then((data)=> {
console.log(data)

data.names.forEach(function(name) {
dropdown.append("option").text(name).property("value");
});
getPlot(data.names[0]);
getInfo(data.names[0]);
});
}
data.names.forEach(function(name) {
    dropdown.append("option").text(name).property("value");
    });
init();