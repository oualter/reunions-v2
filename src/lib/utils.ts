import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const imgMapUrl = async () => {
  const CMS_URL = process.env.CMS_URL
  const defaultImgMap = await fetch(CMS_URL + '/pingenerator/mapimage')
  if (!defaultImgMap.ok) {
    throw new Error(
      `CMS returned ${defaultImgMap.status} for ${CMS_URL}/pingenerator/mapimage`
    )
  }

  const defaultImgMapJson = await defaultImgMap.json()

  let defaultImgMapUrl = await defaultImgMapJson.imageToPinOnUrl

  const defaultImgMapFileName = await defaultImgMapUrl.split('/')[
    defaultImgMapUrl.split('/').length - 1
  ]
  if (defaultImgMapUrl.includes('localhost')) {
    defaultImgMapUrl = defaultImgMapUrl.replace('localhost', '127.0.0.1')
  }
  // console.log('UTILS defaultImgMapUrl => ', defaultImgMapUrl)
  // return defaultImgMapUrl
  return defaultImgMapFileName
}

// remplacer les retours à la ligne par une balise <br />
export const displayContentWithLBFunction = (obj: string) => {
  const contentWithLB = obj.replaceAll('\n', '<br />')
  return contentWithLB
}
