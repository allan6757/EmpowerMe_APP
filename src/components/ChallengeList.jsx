import ChallengeItem from './ChallengeItem';

function ChallengeList({ challenges, onToggleComplete, onDelete, onEdit }) {
  return (
    <div style={{
      background: '#1a1a1a',
      borderRadius: '20px',
      padding: '24px',
      border: '1px solid #2a2a2a'
    }}>
      <h2 style={{ fontSize: '18px', fontWeight: '600', color: 'white', marginBottom: '20px', margin: '0 0 20px 0' }}>Challenges</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {challenges.map(challenge => (
          <ChallengeItem 
            key={challenge.id} 
            challenge={challenge} 
            onToggleComplete={onToggleComplete}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  );
}

export default ChallengeList;