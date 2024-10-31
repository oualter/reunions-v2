export default function cloudinaryLoader({
  src,
  width,
  quality,
}: {
  src: string
  width: number
  quality?: number
}) {
  // console.log('loader src => ', src.includes('.svg'))
  if (src.includes('.svg')) return src
  const params = ['f_auto', 'c_limit', `w_${width}`, `q_${quality || 'auto'}`]
  return `https://res.cloudinary.com/dlm2lmaxc/image/upload/${params.join(
    ','
  )}${src}`
}
