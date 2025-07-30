const { useState } = React;

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  weight: string;
  day: string;
}

interface Settings {
  weight: string;
  height: string;
  goal: string;
}

function App() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [settings, setSettings] = useState<Settings>({ weight: '', height: '', goal: '' });
  const [calendar, setCalendar] = useState<Record<string, Exercise[]>>({});
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());

  const addExercise = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const newExercise: Exercise = {
      name: form.name.value,
      sets: Number(form.sets.value),
      reps: Number(form.reps.value),
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

  const updateSetting = (e: React.ChangeEvent<HTMLInputElement>) => {
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

ReactDOM.render(<App />, document.getElementById('root'));
