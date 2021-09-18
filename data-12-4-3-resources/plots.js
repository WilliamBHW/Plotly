// initial function that display options
function init() {
    var selector = d3.select("#selDataset");

    // retrieve data from sample.json
    d3.json("samples.json").then((data) => {
        console.log(data);
        var sampleNames = data.names;
        
        // iterate through each data
        sampleNames.forEach((sample) => {
            // append each id as option
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
            // console.log(sample);
        });
    })
}

// to be called by html.index
// call two functions in this script
function optionChanged(newSample) {
    buildMetadata(newSample);
    buildCharts(newSample);
}

// function responsive to create metadata
function buildMetadata(sample) {
    // retrieve data from the same source
    d3.json("samples.json").then((data) => {
        var metadata = data.metadata;

        // filter selected id from optionChanged
        // retrieve data from the array
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        var result = resultArray[0];

        // select area to put relative info
        var PANEL = d3.select("#sample-metadata");
        // ensures that the contents of the panel are cleared
        PANEL.html("");

        // iterate through each pair of data and display them
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        });
    });
}

init();