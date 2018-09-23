const api = 'https://api.foursquare.com/v2/venues/explore'

const params = {
  clientId: process.env.REACT_APP_FOURSQUARE_CLIENT_ID,
  clientSecret: process.env.REACT_APP_FOURSQUARE_CLIENT_SECRET,
  limit: '20',
  town: 'Düsseldorf',
  query: 'pizza'
}

class HttpError extends Error {
  constructor(response) {
    super(`Status Code "${response.status}"`);
    this.name = 'HttpError';
    this.response = response;
  }
}

export const getLocation = () => {
  return fetch(`${api}?client_id=${params.clientId}&client_secret=${params.clientSecret}&v=20180323&limit=${params.limit}&near=${params.town}&query=${params.query}`)
  .then(response => {
    if (response.status !== 200) {
      return Promise.reject(new HttpError(response))
    } else {
      return response.json()
    }
  })
}
