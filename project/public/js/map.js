// Get file from Dataverse API

// initialize the map
// TODO - set view based on map features
var map = L.map('map').fitWorld();
map.setZoom(1.25);

// load a tile layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const mapForm = document.getElementById('mapForm');
mapForm.addEventListener('submit', loadMap);

function loadMap(event){
    event.preventDefault();
    const dataverseUrl = mapForm.elements["dataverse"].value;
    const fileId = mapForm.elements["fileId"].value;
    const idType = mapForm.elements["idType"].value;
    const apiKey = mapForm.elements["apiKey"].value;

    fetch("/getFile?dataverse="+dataverseUrl+"&fileId="+fileId+"&idType="+idType+"&apiKey="+apiKey)
    .then(function(response) {
        return response.json();
    })
    .then(function (mapJSON) {
        // TODO: clear previous map layers
        L.geoJSON(mapJSON).addTo(map);
    }).catch(console.error);
}