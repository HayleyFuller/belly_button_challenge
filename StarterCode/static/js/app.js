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
        let names = data.names;
        // Next - iterate through the names in the array. Then append each name as an option for the dropdown menu.
        // Resulting in each name added to the html file as an option.
        names.forEach((name) => {
            dropdownMenu.append("option").text(name).property("value", name);
        });
        // Have the first name as a name variable
        let name = names[0];
        // Call the functions to make the demographic panel, the bar chart, and the bubble chart
        demographic(name);
        bar(name);
        bubble(name);
    });
}

// Part 2) - Make the bar chart
function bar(selectValue) {
    // Get the JSON data and have the console log it
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        // Create an array of objects
        let samples = data.samples;
        // Filter the data where id = the selected value 
        let filterData = samples.filter((sample) => sample.id === selectValue);
        // Have the first object as an obj variable
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
        let samples = data.samples;
        // Filter the data where id = the selected value 
        let filterData = samples.filter((sample) => sample.id === selectValue);
        // Have the first object as an obj variable
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

// Part 6) - Toggle the page to the new plots when the option has been changed using the dropdown Menu for Test Subject ID.
