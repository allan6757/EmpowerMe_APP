import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, isToday } from 'date-fns';

function CalendarView({ selectedDate, onDateSelect, progressData }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const monthStart = startOfMonth(currentMonth);
  const monthEnd = endOfMonth(currentMonth);
  const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

  const getProgressForDate = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd');
    return progressData[dateStr] || { completed: 0, total: 0 };
  };

  const getProgressColor = (progress) => {
    const percentage = progress.total > 0 ? (progress.completed / progress.total) * 100 : 0;
    if (percentage === 100) return '#10b981';
    if (percentage >= 75) return '#667eea';
    if (percentage >= 50) return '#f59e0b';
    if (percentage >= 25) return '#ef4444';
    return '#374151';
  };

  return (
    <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '24px', border: '1px solid #2a2a2a' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: 0 }}>
          {format(currentMonth, 'MMMM yyyy')}
        </h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
            style={{ padding: '8px', background: '#2a2a2a', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}
          >
            ←
          </button>
          <button
            onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
            style={{ padding: '8px', background: '#2a2a2a', border: 'none', borderRadius: '8px', color: 'white', cursor: 'pointer' }}
          >
            →
          </button>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', marginBottom: '8px' }}>
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} style={{ padding: '8px', textAlign: 'center', color: '#888', fontSize: '12px', fontWeight: '600' }}>
            {day}
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px' }}>
        {days.map(day => {
          const progress = getProgressForDate(day);
          const isSelected = isSameDay(day, selectedDate);
          const isCurrentDay = isToday(day);
          
          return (
            <button
              key={day.toISOString()}
              onClick={() => onDateSelect(day)}
              style={{
                padding: '12px 4px',
                background: isSelected ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#2a2a2a',
                border: isCurrentDay ? '2px solid #667eea' : '1px solid #333',
                borderRadius: '8px',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer',
                position: 'relative',
                minHeight: '48px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <div style={{ fontWeight: isCurrentDay ? '600' : '400' }}>
                {format(day, 'd')}
              </div>
              {progress.total > 0 && (
                <div
                  style={{
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: getProgressColor(progress),
                    marginTop: '2px'
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: '16px', padding: '12px', background: '#2a2a2a', borderRadius: '12px' }}>
        <div style={{ color: 'white', fontSize: '14px', fontWeight: '500', marginBottom: '8px' }}>
          {format(selectedDate, 'EEEE, MMMM d')}
        </div>
        <div style={{ color: '#888', fontSize: '13px' }}>
          {getProgressForDate(selectedDate).completed} of {getProgressForDate(selectedDate).total} challenges completed
        </div>
      </div>
    </div>
  );
}

export default CalendarView;