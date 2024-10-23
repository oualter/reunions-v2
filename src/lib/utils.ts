import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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
  if (defaultImgMapUrl.includes('localhost')) {
    defaultImgMapUrl = defaultImgMapUrl.replace('localhost', '127.0.0.1')
  }
  // console.log('UTILS defaultImgMapUrl => ', defaultImgMapUrl)
  return defaultImgMapUrl
}
