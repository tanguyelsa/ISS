let map;
let latitude ;
let longitude ;

jQuery(document).ready(//équivalent du main, ne s'execute que lorsque le document est chargé
    function ($) {

        requeteAPIinitiale()
        setInterval(requeteAPI,2000);




    }


)


function requeteAPI(){
    $.ajax(
        {
            url: 'http://api.open-notify.org/iss-now.json',
            method: 'GET'
        })
        .done(

            (donnees) => {
                latitude = donnees.iss_position.latitude;
                longitude = donnees.iss_position.longitude;

                $("#coordonneesISS").text("latitude : " + latitude + "*** longitude : " + longitude);
                map.flyTo([latitude, longitude]);
                L.circle([latitude, longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 5000
                }).addTo(map);
            }
        )
}
function requeteAPIinitiale(){
    $.ajax(
        {
            url: 'http://api.open-notify.org/iss-now.json',
            method: 'GET'
        })
        .done(

            (donnees) => {
                latitude = donnees.iss_position.latitude;
                longitude = donnees.iss_position.longitude;

                $("#coordonneesISS").text("latitude : " + latitude + "*** longitude : " + longitude);

                map = L.map('map').setView([latitude, longitude], 3);

                L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                    maxZoom: 19,
                    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',

                }).addTo(map);

                L.circle([latitude, longitude], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 5000
                }).addTo(map);
            }
        )
}