import { useState } from 'react';
import './App.css';

export default function App() {
  const [ideas, setIdeas] = useState([]);
  const [newIdeaText, setNewIdeaText] = useState("");
  const [error, setError] = useState("");

  const handleAddIdea = (event) => {
    event.preventDefault();

    if (!newIdeaText.trim()) {
      setError("Digite sua ideia antes de adicionar.");
      return;
    }

    setError("");

    const newIdea = {
      id: Date.now(),
      text: newIdeaText.trim(),
      completed: false
    };

    setIdeas((prevIdeas) => [...prevIdeas, newIdea]);
    setNewIdeaText("");
  };

  return (
    <div className="app-container">
      <div className="card">
        <header className="app-header">
          <h1> Painel de Ideias</h1>
          <p>Suas ideias de projeto, guardadas antes que esqueça.</p>
        </header>

        <form onSubmit={handleAddIdea} className="idea-form">
          <div className="input-group">
            <input
              type="text"
              value={newIdeaText}
              onChange={(e) => {
                setNewIdeaText(e.target.value);
                if (error) setError("");
              }}
              placeholder="Ex.: app de receitas para o TCC..."
            />
            <button type="submit">Adicionar</button>
          </div>
          {error && <span className="error-message">{error}</span>}
        </form>
      </div>
    </div>
  );
}

  const handleToggleCompleted = (id) => {
    setIdeas((prevIdeas) =>
      prevIdeas.map((idea) =>
        idea.id === id ? { ...idea, completed: !idea.completed } : idea
      )
    );
  };

  const handleRemoveIdea = (id) => {
    setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id !== id));
  };