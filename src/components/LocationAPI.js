const api = 'https://api.foursquare.com/v2/venues/explore'

const credentials = {
  clientId: process.env.REACT_APP_FOURSQUARE_CLIENT_ID,
  clientSecret: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET,
}

export const getLocation = (town, query) =>
  fetch(`${api}?client_id=${credentials.clientId}&client_secret=${credentials.clientSecret}&v=20180323&limit=20&near=${town}&query=${query}`)
  .then(response => {
    if (response.status !== 200) {
      alert('Looks like something went wrong. Status Code: ' + response.status)
      return
    }
    return response.json()
  })
  .catch(function(err) {
    console.log('Fetch Error :-S', err)
  });
