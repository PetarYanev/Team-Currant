function myMap() {
    var mapOptions = {
        center: new google.maps.LatLng(42.650911, 23.379464),
        zoom: 16,
        mapTypeId: google.maps.MapTypeId.TERRAIN
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
}