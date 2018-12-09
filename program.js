const db = require('./db-config.js');
const houses = require('./data.json');

houses.forEach(house => {
    const { link, location, size, price, description, title, images } = house;
    let storeDataQuery =
        'INSERT INTO houses (link, location_country, location_city, location_address, location_coordinates_lat, location_coordinates_lng, size_grossm2, size_netm2, size_rooms, price_value, price_currency, description, title, images ) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)'

    let queryArr = [];
    queryArr.push(link)
    queryArr.push(location.country)
    queryArr.push(location.city)
    queryArr.push(location.address)
    queryArr.push(location.coordinates.lat)
    queryArr.push(location.coordinates.lng)
    queryArr.push(size.net_m2)
    queryArr.push(size.rooms)
    queryArr.push(price.value)
    queryArr.push(price.currency)
    queryArr.push(description)
    queryArr.push(title)
    queryArr.push(images)

    db.query(storeDataQuery, [...queryArr], (err, results, fields) => {
        if (err) console.log('error with inserting data!', err);
        else console.log('done!');
    })
})
