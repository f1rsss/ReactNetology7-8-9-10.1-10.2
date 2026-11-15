import { useState } from 'react'
import './App.css'

function hexToRgb(hex) {
  hex = hex.replace("#", ""); // Исправлено на английскую 'c'
  if (hex.length === 3) {
    hex = hex.split("").map(c => c + c).join("");
  }

  let r = parseInt(hex.slice(0, 2), 16)
  let g = parseInt(hex.slice(2, 4), 16)
  let b = parseInt(hex.slice(4, 6), 16)

  return `rgb(${r}, ${g}, ${b})`; // Убрали 'a'
}

export default function App() {
  const [inputValue, setInputValue] = useState('');
  const [rgbColor, setRgbColor] = useState('');
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.length === 7) {
      const hexRegex = /^#[0-9A-Fa-f]{6}$/;

      if (hexRegex.test(value)) {
        setIsError(false);
        setRgbColor(hexToRgb(value));
      } else {
        setIsError(true);
        setRgbColor("");
      }
    } else {
      setIsError(false);
      setRgbColor('');
    }
  };

  return (
    <div className="container">
      <input 
        type="text" 
        className="input-field" 
        id="colorInput" 
        placeholder="Введите код цвета..." 
        value={inputValue} 
        onChange={handleChange} 
      />
      
      {isError ? (
        <span className="error-message">Ошибка!</span>
      ) : (
        <span className="result" id="result">{rgbColor}</span>
      )}
      
      <div 
        className="color-box" 
        style={{ backgroundColor: rgbColor || 'transparent' }}
      ></div>
    </div>
  );
}