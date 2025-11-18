// frontend/src/components/AudioControl.tsx
import React, { useState, useRef, useEffect } from 'react';

const AudioControl: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3; // Define o volume inicial

      // Adiciona listeners para verificar o carregamento e erros
      const handleLoadedData = () => {
        setIsLoaded(true);
        console.log('✅ Áudio carregado com sucesso.');
        // Se o áudio já deveria estar tocando (por exemplo, após um refresh com estado salvo),
        // tentamos tocar aqui, mas o navegador pode bloquear.
        // A reprodução real será garantida no primeiro clique.
      };

      const handleError = (e: Event) => {
        console.error('❌ Erro ao carregar áudio:', e);
        setIsLoaded(false);
        // Você pode adicionar um feedback visual para o usuário aqui, se quiser
      };

      audioRef.current.addEventListener('loadeddata', handleLoadedData);
      audioRef.current.addEventListener('error', handleError);

      // Limpeza dos listeners ao desmontar o componente
      return () => {
        if (audioRef.current) {
          audioRef.current.removeEventListener('loadeddata', handleLoadedData);
          audioRef.current.removeEventListener('error', handleError);
        }
      };
    }
  }, []); // Executa apenas uma vez no montagem do componente

  const toggleAudio = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        console.log('⏸️ Áudio pausado.');
      } else {
        // Tenta tocar o áudio. O .catch() é importante para lidar com o bloqueio do navegador.
        audioRef.current
          .play()
          .then(() => {
            console.log('▶️ Áudio tocando.');
          })
          .catch(err => {
            console.warn('⚠️ Navegador bloqueou a reprodução automática de áudio. Clique novamente para tentar.', err);
            // Aqui você pode dar um feedback ao usuário, por exemplo, mudar o ícone para um "clique para tocar"
          });
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <button
      onClick={toggleAudio}
      disabled={!isLoaded} // Desabilita o botão se o áudio não carregou
      className="audio-control"
      aria-label={isPlaying ? 'Pausar música' : 'Tocar música'}
      title={!isLoaded ? 'Carregando áudio...' : isPlaying ? 'Pausar música' : 'Tocar música'}
    >
      <span>{isPlaying ? '⏸️' : '🎵'}</span>
      <audio ref={audioRef} src="/assets/theme.mp3" loop preload="auto" />
    </button>
  );
};

export default AudioControl;
