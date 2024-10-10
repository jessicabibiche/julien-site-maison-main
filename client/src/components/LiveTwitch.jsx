import React from "react";

function LiveTwitch() {
  return (
    <div className="bg-purple-800 bg-opacity-60 p-6 rounded-md text-center text-white my-8 neon-box">
      <h2 className="text-4xl font-bold mb-2 neon-text">
        Rejoignez l'Aventure Live
      </h2>
      <p className="mb-4">
        Rejoignez le stream de KOD_ElDragon en direct maintenant !
      </p>
      <button className="mt-4 bg-yellow-500 text-black px-6 py-3 rounded-full hover:bg-yellow-400 transition-shadow shadow-lg neon-glow">
        Regarder en Direct
      </button>
    </div>
  );
}

export default LiveTwitch;
