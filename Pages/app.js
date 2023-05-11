// 1) USE THE D3 LIBRARY TO READ THE SAMPLES.JASON FILE FROM THE URL
// 2) CREATE A HORIZONTAL BAR CHART WITH A DROPDOWN MENU TO DISPLAY THE TOP 10 OUTs FOUND IN THAT INDIVIDUAL
// 3) CREATE A BUBBLE CHART THAT DISPLAYS EACH SAMPLE
// 4) DISPLAY THE SAMPLE METADATA - AN INDIVIDUALS DEMOGRAPHIC INFORMATION
// 5) DISPLAY EACH KEY-VALUE PAIR FROM THE METADATA JSON OBJECT
// 6) UPDATE ALL THE PLOTS WHEN A NEW SAMPLE IS SELECTED

// Part 1) - Have the URL as a constant and display the plots using D3
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

function init() {
    let dropdownMenu = d3.select("#selDataset");
    // Get the JSON data and have the console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        // The array of id names
        let namesID = data.names;
        // Next - iterate through the names in the array. And append each name as an option for the dropdown menu.
        namesID.forEach((name) => {
            dropdownMenu.append("option").text(name).property("value", name);
        });
        // Have the first name as a name variable
        let nameData = namesID[0];
        // Call the functions to make the demographic panel, the bar chart, and the bubble chart
        demographic(nameData);
        bar(nameData);
        bubble(nameData);
    });
}

// Part 2) - Make the bar chart
function bar(selectValue) {
    // Get the JSON data and have the console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        // Create an array of objects
        let sampleData = data.samples;
        // Filter the data where id = the selected value 
        let filterData = sampleData.filter((sample) => sample.id === selectValue);
        // Have the first object as an object variable
        let obj = filterData[0];
        // Trace for the data for the bar chart. Remember to display the chart horizontaly and slice the top 10 OTUs
        let trace = [{
            x: obj.sample_values.slice(0,10).reverse(),
            y: obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: obj.otu_labels.slice(0,10).reverse(),
            type: "bar",
            marker: {
                color: "lightblue"
            },
            orientation: "h"
        }];
        // Plot the data in a bar chart using Plotly
        Plotly.newPlot("bar", trace);
    });
}
  
// Part 3) - Create the bubble chart
function bubble(selectValue) {
    // Get the JSON data and have the console log it
    d3.json(url).then((data) => {
        // Create an array of objects
        let sampleData = data.samples;
        // Filter the data where id = the selected value 
        let filterData = sampleData.filter((sample) => sample.id === selectValue);
        // Have the first object as an object variable
        let obj = filterData[0];
        // Trace the data for the bubble chart.
        let trace = [{
            x: obj.otu_ids,
            y: obj.sample_values,
            text: obj.otu_labels,
            mode: "markers",
            marker: {
                size: obj.sample_values,
                color: obj.otu_ids,
                colorscale: "Rainbow"
            }
        }];
        // Add the x-axis lengend
        let layout = {
            xaxis: {title: "OTU ID"}
        };
        //Plot the data in a bubble chart using Plotly
        Plotly.newPlot("bubble", trace, layout);
    });
}
// Parts 4 & 5) - Make the demographics panel
function demographic(selectValue) {
    // Get the JSON data and have the console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        // Have an array of metadata objects and filter through with the first object as an object variable
        let metaData = data.metadata;
        let filterData = metaData.filter((meta) => meta.id == selectValue);
        let obj = filterData[0]
        // Clear any child elements in div with id sample-metadata
        d3.select("#sample-metadata").html("");
        // Return the array of a given object's key's, value's
        let entries = Object.entries(obj);
        // Iterate through the entries array. Add a h6 child element for each key value pair to the div with id sample-metadata
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h6").text(`${key}: ${value}`);
        });
        // Log the entries array
        console.log(entries);
    });
  }
// Part 6) - Toggle the page to the new plots when the option has been changed using the dropdown Menu for Test Subject ID.
function optionChanged(selectValue) {
    demographic(selectValue);
    bar(selectValue);
    bubble(selectValue);
}

init();
//NOTE: This challenge was particularly difficult. The code in this file is heavily reserached using Stack, Google and GitHub.
