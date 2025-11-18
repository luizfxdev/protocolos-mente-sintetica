import React, { useState } from 'react';
import { aiService } from '../services/aiService';
import { AIResponse } from '../types/ai.types';
// Não precisamos mais importar App.css aqui, pois index.css já contém tudo

const AISimulator: React.FC = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState<AIResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSimulate = async () => {
    if (!input.trim()) {
      setError('Por favor, insira os tipos de IA separados por vírgula');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const response = await aiService.simulateAI(input);
      setResult(response);
      console.log('✅ Simulação concluída:', response);
    } catch (err) {
      setError('Erro ao processar simulação. Verifique se o backend está rodando.');
      console.error('❌ Erro na simulação:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setInput('');
    setResult(null);
    setError('');
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !loading) {
      handleSimulate();
    }
  };

  return (
    // O container principal do simulador agora usa a classe 'race-container'
    <div className="race-container">
      {/* Header Section */}
      <div className="header-section">
        <h1 className="main-title">Protocolos da Mente Sintética</h1>
        <div className="title-underline"></div>
      </div>

      {/* Description Section */}
      <div className="description-section">
        <p className="description-text">
          Nas profundezas neon de Neo-Tóquio, IAs surgem sob diferentes protocolos. Insira os tipos separados por
          vírgula: <span className="highlight-pink">security, administrative, musical, hacked</span>
        </p>
      </div>

      {/* Input Section (Form Section) */}
      <div className="form-section">
        <div className="input-wrapper">
          <label htmlFor="protocol-input" className="input-label">
            Entrada de Protocolos
          </label>
          <input
            id="protocol-input"
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="security, administrative, musical, hacked"
            className="input-field" // Usando a classe input-field
          />
        </div>
        {error && (
          <div className="error-message mt-4">
            {' '}
            {/* Adicionei mt-4 para espaçamento */}
            <p className="text-sm">{error}</p>
          </div>
        )}
      </div>

      {/* Buttons Section */}
      <div className="buttons-section">
        {/* Botão CALCULAR */}
        <button onClick={handleSimulate} disabled={loading} className="action-btn btn-calculate">
          <span>{loading ? 'PROCESSANDO...' : 'CALCULAR'}</span>
        </button>
        {/* Botão RETORNAR */}
        <button onClick={handleReset} disabled={loading} className="action-btn btn-reset">
          <span>RETORNAR</span>
        </button>
      </div>

      {/* Result Section */}
      {result && (
        <div className="results-section">
          <div className="results-header">
            <span className="results-icon">⚙️</span>
            <h3 className="results-title">Execução de Protocolos ({result.totalAIs} IAs)</h3>
          </div>

          {/* Aqui você pode mapear os 'actions' do seu resultado para 'result-card' */}
          {/* Por exemplo, se result.actions for um array de strings ou objetos */}
          {result.actions.map((action, index) => (
            <div key={index} className="result-card" style={{ animationDelay: `${index * 0.1}s` }}>
              <div className="card-header security-header">
                {' '}
                {/* Adapte a classe do header conforme o tipo de IA */}
                <span className="card-icon">🤖</span>
                <h4 className="card-title">Protocolo {action.split(':')[0].trim()}</h4>{' '}
                {/* Exemplo de como extrair o título */}
              </div>
              <div className="card-body">
                <p className="info-line">
                  <span className="info-label">Ação:</span>
                  <span className="info-value">{action.split(':')[1]?.trim() || action}</span>
                </p>
                {/* Adicione mais info-lines se o seu objeto 'action' tiver mais propriedades */}
              </div>
            </div>
          ))}

          {/* Saída Final Destacada */}
          <div className="final-output-box">
            <h4>SAÍDA FINAL:</h4>
            <pre>{result.finalOutput}</pre>
          </div>
        </div>
      )}
    </div>
  );
};

export default AISimulator;
