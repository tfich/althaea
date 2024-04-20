import querystring from 'querystring'

const buildQuerystring = (query: object) =>
  `${Object.values(query).length ? '?' : ''}${querystring.stringify(query as any)}`

export default buildQuerystring
