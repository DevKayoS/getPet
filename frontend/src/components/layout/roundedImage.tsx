interface RoundedImageProps {
  src: string,
  alt: string,
}


export function RoundedImage({src, alt}: RoundedImageProps) {
  return(
    <img
    className="rounded-full size-32" 
    src={src} 
    alt={alt}  
    />
  )
}