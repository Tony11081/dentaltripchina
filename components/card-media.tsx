import Image from "next/image";

interface CardMediaProps {
  src: string;
  alt: string;
  portrait?: boolean;
}

export function CardMedia({ src, alt, portrait = false }: CardMediaProps) {
  return (
    <figure className={`card-media${portrait ? " portrait" : ""}`}>
      <Image
        src={src}
        alt={alt}
        width={portrait ? 900 : 1200}
        height={portrait ? 1200 : 900}
      />
    </figure>
  );
}
