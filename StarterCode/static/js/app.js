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
  
// Part 3) - Create the bubble chart

// Parts 4 & 5) - Make the demographics panel

// Part 6) - Toggle the page to the new plots when the option has been changed using the dropdown Menu for Test Subject ID.
