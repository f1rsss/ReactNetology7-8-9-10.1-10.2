import { useState } from 'react'
import './App.css'

function App() {
  const [date, setDate] = useState('');
  const [distance, setDistance] = useState('');
  const [trainings, setTrainings] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!date || !distance) return;
    const km = Number(distance);
    
    const existingIndex = trainings.findIndex(t => t.date === date);

    let updatedTrainings;

    if (existingIndex !== -1) {
      updatedTrainings = trainings.map((t, index) => {
        if (index === existingIndex) {
          return {...t, distance: t.distance + km};
        }
        return t;
      })
    } else {
      updatedTrainings = [...trainings, {date: date, distance: km}];
    }

    updatedTrainings.sort((a,b) => {
      const dateA = new Date(a.date.split('.').reverse().join('-')); // Добавил const
      const dateB = new Date(b.date.split('.').reverse().join('-')); // Добавил const
      return dateB - dateA;
    });

    setTrainings(updatedTrainings);

    setDate("");
    setDistance("");
  }

  const handleDelete = (dateToDelete) => {
    const filteredTrainings = trainings.filter((t) => t.date !== dateToDelete )
    setTrainings(filteredTrainings);
  };

  return (
    <div className="container">
      <div className="form-container">
        {/* Привязали onSubmit и убрали id */}
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="date">Дата (ДД.ММ.ГГ)</label>
              {/* Исправили onChange и value */}
              <input 
                type="text" 
                placeholder="20.07.2019" 
                required 
                value={date} 
                onChange={(e) => setDate(e.target.value)} 
              />
            </div>

            <div className="form-group">
              <label htmlFor="distance">Пройдено км</label>
              <input 
                type="number" 
                placeholder="5.7" 
                step="0.1" 
                min="0" 
                required 
                value={distance} 
                onChange={(e) => setDistance(e.target.value)} 
              />
            </div>

            <button type="submit" className="submit-btn">OK</button>
          </div>
        </form>
      </div>

      <div className="data-table">
        <div className="table-header">
          <div className="col-date">Дата (ДД.ММ.ГГ)</div>
          <div className="col-distance">Пройдено км</div>
          <div className="col-actions">Действия</div>
        </div>

        <div className="table-body">
          {trainings.length === 0 ? (
            <div className="empty-state">Нет данных о тренировках</div>
          ) : (
            trainings.map((e) => (
              <div className="table-row" key={e.date}>
                <div className="col-date">{e.date}</div>
                <div className="col-distance">{e.distance}</div>
                <div className="col-actions">
                  <button className="action-btn edit-btn" title="Редактировать">✎</button>
                  <button className="action-btn delete-btn" title="Удалить" onClick={() => handleDelete(e.date)}>✕</button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default App
