import React from 'react';

const VideoBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 w-full h-full overflow-hidden z-0">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="background-video" // Usando a classe que você forneceu
      >
        <source src="/assets/background.mp4" type="video/mp4" />
        Seu navegador não suporta vídeos HTML5.
      </video>
      {/* Fallback: Gradiente caso o vídeo não carregue. Z-index -1 para ficar abaixo do vídeo. */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" // Cores mais neutras para o fallback
        style={{ zIndex: -1 }}
      />
    </div>
  );
};

export default VideoBackground;
