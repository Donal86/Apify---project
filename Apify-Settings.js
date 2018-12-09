function pageFunction(context) {
    var $ = context.jQuery;
    if (context.request.label === "house") {
        context.skipLinks();
        var house = {};
        var getValue = function getParameterByName(name, url) {
            if (!url) url = window.location.href;
            name = name.replace(/[\[\]]/g, '\\$&');
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
                results = regex.exec(url);
            if (!results) return null;
            if (!results[2]) return '';
            return decodeURIComponent(results[2].replace(/\+/g, ' '));
        };
        var link = $('head > link:nth-child(2)').attr('href');
        house.link = link;
        var location = {
            country: "Italy",
            city: "Milano",
            address: $('.box_contatti_bottom > div:nth-child(1) > div:nth-child(3)').text().replace(/\s\s+/g, ''),
            coordinates: {
                lat: getValue('lat', $('#mapcontainer').attr('src')),
                lng: getValue('lng', $('#mapcontainer').attr('src'))
            }
        };
        location.coordinates.lat = Number(location.coordinates.lat);
        location.coordinates.lng = Number(location.coordinates.lng)
        house.location = location;
        var size = {
            parcel_m2: '',
            gross_m2: '',
            net_m2: $('div.casella_caratteristica:nth-child(6)').text().replace(/[^\d]/g, ''),
            rooms: $('div.casella_caratteristica:nth-child(3)').text().replace(/[^\d]/g, '')
        };
        size.net_m2 = Number(size.net_m2);
        size.rooms = Number(size.rooms);
        house.size = size;
        var price = {
            value: $('.box_prezzo').text().replace(/[^\d]/g, ''),
            currency: "EUR"
        };
        price.value = Number(price.value);
        house.price = price;
        var description = $('.descrizione').text().replace(/\s\s+/g, '');
        house.description = description;
        var title = $('.intestazione_annuncio').text().replace(/\s\s+/g, '');
        house.title = title;
        var images = $('.box_thumbnails img');
        var imageArr = [];
        for (var i = 0; i < images.length; i++) {
            var image = $(images[i]);
            var src = image.attr('src');
            imageArr.push(src);
        }
        house.images = imageArr;
        return house;

    } else {
        context.skipOutput();
    }
}