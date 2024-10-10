import React, { useState } from "react";

const videos = [
  {
    id: 1,
    title: "Rocket league",
    thumbnail: "/images/rocket.webp",
    videoUrl: "/videos/Best_Of_.mp4",
  },
  {
    id: 2,
    title: "league of legend",
    thumbnail: "/images/ioi.webp",
    videoUrl:
      "/videos/KOD_El_Dragon_-_Star_Wars_Fallen_Order_-_On_Pilote_un_TB_TT.mp4",
  },
  {
    id: 3,
    title: "modern warfare",
    thumbnail: "/images/modern.webp",
    videoUrl: "/videos/best_of_kill_.mp4",
  },
  {
    id: 4,
    title: "naruto ultimate",
    thumbnail: "/images/naruto.webp",
    videoUrl: "/videos/Cinematique_intro_Naruto_Ultimate_Ninja_Storm_NUNS.mp4",
  },
  {
    id: 5,
    title: "star wars",
    thumbnail: "/images/startwars.jpg",
    videoUrl:
      "/videos/KOD_El_Dragon_-_Star_Wars_Fallen_Order_-_On_Pilote_un_TB_TT.mp4",
  },
];

function VideoGallery() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="bg-black p-8">
      <h2 className="text-white text-3xl mb-6">Nos nouvelles vidéos</h2>

      {/* Mise à jour de la grille pour afficher 5 vidéos sur une seule ligne */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative group bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
            onClick={() => handleVideoClick(video.videoUrl)}
          >
            <img
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-48 object-cover rounded-lg group-hover:opacity-75 transition-opacity"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="bg-yellow-500 text-black px-4 py-2 rounded-full">
                Regarder la Vidéo
              </button>
            </div>
            <h3 className="text-white text-lg mt-4">{video.title}</h3>
          </div>
        ))}
      </div>

      {selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative bg-gray-900 p-6 rounded-lg">
            <button
              onClick={handleCloseVideo}
              className="absolute top-2 right-2 bg-red-500 text-white px-4 py-2 rounded-full"
            >
              Fermer
            </button>
            <iframe
              width="560"
              height="315"
              src={selectedVideo}
              title="Video Player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-64 md:w-[560px] md:h-[315px] rounded-lg"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
}

export default VideoGallery;
