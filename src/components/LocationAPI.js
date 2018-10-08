const api = 'https://api.foursquare.com/v2/venues/explore'

const params = {
  clientId: 'C1A4NZFFWZV4EMWAQ55OEP0HZG31JAZGMRMMSR0YOPRZMKKI',
  clientSecret: '4KQ3DRG1A4MMY0R3LWXLQ0I5BNH0KPGCOOCX313TEQOL0HZK',
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
