import { writeFileSync } from 'node:fs'
import qs from 'qs'

// const url = 'http://127.0.0.1:1337/api/place-de-la-reunions'+'?populate=* '
// const url = 'http://127.0.0.1:1337/api/a-propos'
const url =
  'http://127.0.0.1:1337/api/microfictions' +
  '?' +
  qs.stringify(
    {
      fields: [
        'Date',
        'ordre_de_lecture',
        'pingenerator',
        'GingkoBiloba',
        'Texte_microfiction',
      ],
      sort: ['ordre_de_lecture'],
    },
    { encodeValuesOnly: true }
  )
const response = await fetch(url)
const body = await response.json()
// console.log(body)
const formatted = JSON.stringify(body, null, 2)
// console.log('formatted => ', formatted)
const file = 'scripts/strapi-response.json'
writeFileSync(file, formatted, 'utf8')
