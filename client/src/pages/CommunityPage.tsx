import { useEffect, useState } from "react";
import { dummyPublishedImages } from "../assets/dummyData/assets";

interface CommunityImage {
  imageUrl: string;
  userName: string;
}

const CommunityPage = () => {
  const [images, setImages] = useState<CommunityImage[] | null>(null);

  const fetchImages = async () => {
    setImages(dummyPublishedImages);
  }

  useEffect(() => {
    fetchImages();
  }, []);

  console.log(images);

  return (
    <div className="mx-auto 2xl:px-20 xl:px-12 p-6 pt-13 md:pt-12 w-full h-full overflow-y-scroll">
      <h2 className="mt-2 mb-6 font-semibold text-gray-800 text-xl dark:text-purple-100">Community Images</h2>
      {(images?.length) ? (
        <div className="flex flex-wrap max-sm:justify-center gap-5">
          {images.map((image, index) => (
            <a key={index} href={image.imageUrl} target="_blank" className="group block relative shadow-sm hover:shadow-md border border-gray-200 dark:border-purple-700 rounded-lg transition-shadow duration-300 overflow-hidden">
              <img src={image.imageUrl} alt="" className="w-full h-40 md:h-50 2xl:h-62 transition-transform duration-300 object-cover group-hover:scale-105 ease-in-out" />
              <p className="right-0 bottom-0 absolute bg-black/50 opacity-0 group-hover:opacity-100 backdrop-blur px-4 py-1 rounded-tl-xl text-white text-xs transition duration-300">Created by {image.userName}</p>
            </a>
          ))}
        </div>
      ) : (
        <p className="mt-10 text-center text-gray-600 dark:text-purple-200">No Image Available</p>
      )}
    </div>
  )
}

export default CommunityPage