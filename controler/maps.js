function buscarEndereco() {
    jQuery('#input_busca_endereco').keypress(function() {
        if (jQuery(this).val().length > 5)  {
            var dados = {"text": jQuery(this).val()}
            jQuery.post('https://maps.googleapis.com/maps/api/geocode/json?address='+$(this).val()+'&key=AIzaSyBSzkoViMnQSUwUICcklWEQ884Jb2pljeo',dados, function(data){
            var dados = data.results[0];
            // jQuery(this).val(dados.address_components.formatted_address);
            var latitude = dados.geometry.location.lat;
            var longitude = dados.geometry.location.lng;
            var position = {lat:parseFloat(latitude),lng:parseFloat(longitude)}
            map.setCenter(position);
            map.setZoom(20);
            },'json');
        }
    });
}

var map;
var marker;
var infowindow;
var markerExist;
function initMap(myLat, myLng) {
    var myLatLng = new google.maps.LatLng({lat: parseFloat(myLat), lng: parseFloat(myLng)});
    map = new google.maps.Map(document.getElementById('map'), {
        center: myLatLng,
        zoom: 13,
        zoomControl: false,
        scaleControl: false,
        streetViewControl: false,
        fullscreenControl: false
    });
    markerExist = false;
    placeMarker(map, myLatLng); 
    
    google.maps.event.addListener(map, 'click', function(event) {
        placeMarker(map, event.latLng);    
    });


    function placeMarker(map, location) {
        if(markerExist == false) {
            marker = new google.maps.Marker({
                position: location,
                map: map,
                draggable: true,
                editable: true
            });
            markerExist = true;
            EditLocation(map, location);
            function EditLocation(map, location) {
                infowindow = new google.maps.InfoWindow({
                    content: 'Latitude: ' + location.lat() +
                    '<br>Longitude: ' + location.lng()
                });
                infowindow.open(map,marker);
                document.getElementById("input_lat").value = marker.getPosition().lat();
                document.getElementById("input_lng").value = marker.getPosition().lng();
                
            }
            google.maps.event.addListener(marker, 'dragend', function (event) {  
                EditLocation(map, event.latLng);
            });
        }
    }
}