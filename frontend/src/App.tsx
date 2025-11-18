import VideoBackground from './components/VideoBackground';
import AudioControl from './components/AudioControl';
import AISimulator from './components/AISimulator';
import './App.css'; // Mantém a importação do App.css
import './index.css'; // Garante que o index.css seja carregado

function App() {
  return (
    <div className="app-container">
      <VideoBackground />
      <AudioControl />
      {/* O content-wrapper agora envolve o AISimulator para posicioná-lo */}
      <div className="content-wrapper">
        <AISimulator />
      </div>
    </div>
  );
}

export default App;
