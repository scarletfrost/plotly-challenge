function optionChanged(selectedID){

    console.log(selectedID);
 
    // Reading the json file
    d3.json("samples.json").then((data) => {

    // To clear the dropdown
    d3.select("#selDataset").html("");  
    
    // TABLE
    
    // For each item append the item ID
    data.metadata.forEach(item =>
         {
         d3.select ("#selDataset").append('option').attr('value', item.id).text(item.id);
         });
   

    d3.select("#selDataset").node().value = selectedID;
    
    
    const id_Metadata = data.metadata.filter(item=> (item.id == selectedID));
    console.log(id_Metadata);
   
    // append key-value pair 
    const table = d3.select("#sample-metadata");
    table.html("");
    Object.entries(id_Metadata[0]).forEach(item=> 
       {
        table.append("p").text(`${item[0]}: ${item[1]}`)
       });
 
    
    // BAR CHART
    
    // Filtering the data by selected ID
    const sample_ID = data.samples.filter(item => parseInt(item.id) == selectedID);
    
    // Slicing for top 10
    var sampleValue1 = sample_ID[0].sample_values.slice(0,10);
    var otuID = sample_ID[0].otu_ids.slice(0,10);
    var otuLabels = sample_ID[0].otu_labels;
 
    
    const y_axis = otuID.map(item => 'OTU' + item);
   
       const trace = {
       y: y_axis,
       x: sampleValue1,
       type: 'bar',
       orientation: "h",
       text:  otuLabels,
       
       marker: 
       {  color: 'steelblue',
          line: {width: 1}  }
       },
       layout = {
       title: 'Top 10 OTUs found in the individual',
       yaxis: {
           title: 'OTU ID',
           autorange:'reversed'
        },
       xaxis: {title: 'Sample Values'},
       };
 
    Plotly.newPlot('bar', [trace], layout,  {responsive: true});    
       
     
    // BUBBLE CHART
    
    // All the Sample value and otuID taken from the the selected ID
    var sampleValue2 =sample_ID[0].sample_values;
    var otuID1= sample_ID[0].otu_ids;
    
    const trace1 = {
        x: otuID1,
        y: sampleValue2,
        mode: 'markers',
        marker: {
        color: otuID1,
        size: sampleValue2
        }
    },
    
    layout1 = {
        title: 'Bubble Chart',
        xaxis: {title: 'OTU ID'},
        yaxis: {title: 'Sample Values'},
        height: 500,
        width: 1200
        };
    
    Plotly.newPlot('bubble', [trace1], layout1);

    });
 } 
 
 // page loads with id 940 initially
 optionChanged(940);
 
 d3.select("#selDataset").on('change',() => {
 optionChanged(d3.event.target.value);
 });