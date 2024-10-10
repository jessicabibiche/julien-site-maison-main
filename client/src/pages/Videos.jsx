import React, { useState } from "react";

const videos = [
  {
    id: 1,
    title: "Développement du Jeu - Partie 1",
    thumbnail: "/images/rocket.webp",
    videoUrl: "/videos/Best_Of_.mp4",
  },
  {
    id: 2,
    title: "Développement du Jeu - Partie 2",
    thumbnail: "/images/ioi.webp",
    videoUrl:
      "/videos/KOD_El_Dragon_-_Star_Wars_Fallen_Order_-_On_Pilote_un_TB_TT.mp4",
  },
  {
    id: 3,
    title: "Développement du Jeu - Partie 3",
    thumbnail: "/images/modern.webp",
    videoUrl: "/videos/best_of_kill_.mp4",
  },
  {
    id: 4,
    title: "Développement du Jeu - Partie 4",
    thumbnail: "/images/naruto.webp",
    videoUrl: "/videos/Cinematique_intro_Naruto_Ultimate_Ninja_Storm_NUNS.mp4",
  },
  {
    id: 5,
    title: "Développement du Jeu - Partie 5",
    thumbnail: "/images/startwars.jpg",
    videoUrl:
      "/videos/KOD_El_Dragon_-_Star_Wars_Fallen_Order_-_On_Pilote_un_TB_TT.mp4",
  },
];

function Videos() {
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleVideoClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };

  const handleCloseVideo = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="bg-black p-8">
      <h2 className="text-white text-3xl mb-6">Nos Vidéos</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {videos.map((video) => (
          <div
            key={video.id}
            className="relative group bg-gray-900 p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow"
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
            <video
              controls
              src={selectedVideo}
              className="w-full h-64 md:w-[560px] md:h-[315px] rounded-lg"
            >
              Votre navigateur ne supporte pas la lecture de vidéos.
            </video>
          </div>
        </div>
      )}
    </div>
  );
}

export default Videos;
