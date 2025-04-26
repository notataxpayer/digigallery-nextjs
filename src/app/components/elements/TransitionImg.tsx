'use client'
import Image from 'next/image';
import { motion } from 'framer-motion';

const DualImageRow = () => {
  const images = [
    {
      src: "https://res.cloudinary.com/dnyrrcacd/image/upload/v1745677555/porto%20commerce%20web-v1/Porto%20web/coba_v8lpof.png",
      alt: "Digital Artwork 1"
    },
    {
      src: "https://res.cloudinary.com/dnyrrcacd/image/upload/v1745677555/porto%20commerce%20web-v1/Porto%20web/coba_v8lpof.png", // Gunakan URL berbeda untuk gambar kedua jika perlu
      alt: "Digital Artwork 2"
    }
  ];

  return (
    <div className="w-full py-8">
      <div className="container mx-auto px-4">
        <motion.div 
          className="flex flex-col sm:flex-row gap-4 md:gap-8 justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {images.map((img, index) => (
            <div 
              key={index}
              className="relative w-full sm:w-1/2 aspect-square max-w-xs mx-auto"
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow"
                sizes="(max-width: 640px) 100vw, 50vw"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default DualImageRow;