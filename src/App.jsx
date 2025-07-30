import React, { useState } from 'react';

function App() {
  const [exercises, setExercises] = useState([]);
  const [settings, setSettings] = useState({ weight: '', height: '', goal: '' });
  const [calendar, setCalendar] = useState({});
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const addExercise = (e) => {
    e.preventDefault();
    const form = e.target;
    const newExercise = {
      name: form.name.value,
      sets: form.sets.value,
      reps: form.reps.value,
      weight: form.weight.value,
      day: form.day.value
    };
    setExercises([...exercises, newExercise]);
    setCalendar({
      ...calendar,
      [newExercise.day]: [...(calendar[newExercise.day] || []), newExercise]
    });
    form.reset();
  };

  const updateSetting = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: value });
  };

  const daysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const monthDays = () => {
    const total = daysInMonth();
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    return Array.from({ length: total }, (_, i) => new Date(year, month, i + 1));
  };

  return (
    <div>
      <header>
        <h1>Fit Planner</h1>
      </header>

      <section>
        <h2>Personal Settings</h2>
        <input
          type="text"
          name="weight"
          placeholder="Weight"
          value={settings.weight}
          onChange={updateSetting}
        />
        <input
          type="text"
          name="height"
          placeholder="Height"
          value={settings.height}
          onChange={updateSetting}
        />
        <input
          type="text"
          name="goal"
          placeholder="Goal"
          value={settings.goal}
          onChange={updateSetting}
        />
      </section>

      <section>
        <h2>Add Exercise</h2>
        <form onSubmit={addExercise}>
          <input name="name" placeholder="Exercise" required />
          <input name="sets" placeholder="Sets" type="number" min="1" required />
          <input name="reps" placeholder="Reps" type="number" min="1" required />
          <input name="weight" placeholder="Weight" />
          <select name="day" required>
            {monthDays().map(d => (
              <option key={d.toDateString()} value={d.toDateString()}>{d.getDate()}</option>
            ))}
          </select>
          <button type="submit">Add</button>
        </form>
      </section>

      <section>
        <h2>{currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' })}</h2>
        <button onClick={prevMonth}>Prev</button>
        <button onClick={nextMonth}>Next</button>
        <div className="calendar">
          {monthDays().map(date => (
            <div key={date.toDateString()} className="day">
              <header>{date.getDate()}</header>
              {(calendar[date.toDateString()] || []).map((ex, idx) => (
                <div key={idx} className="exercise">
                  {ex.name} {ex.sets}x{ex.reps} {ex.weight}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default App;
