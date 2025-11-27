import { useState, useEffect } from 'react';

function FriendsList({ user }) {
  const [activeTab, setActiveTab] = useState('friends');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    loadFriends();
    loadRequests();
  }, [user.uid]);

  const loadFriends = () => {
    const userFriends = JSON.parse(localStorage.getItem(`empowerme_${user.uid}_friends`) || '[]');
    setFriends(userFriends);
  };

  const loadRequests = () => {
    const userRequests = JSON.parse(localStorage.getItem(`empowerme_${user.uid}_requests`) || '[]');
    setRequests(userRequests);
  };

  const searchUsers = (query) => {
    setSearchQuery(query);
    if (query.trim()) {
      const users = JSON.parse(localStorage.getItem('empowerme_all_users') || '[]');
      const results = users.filter(u => 
        u.uid !== user.uid && 
        u.name.toLowerCase().includes(query.toLowerCase()) &&
        !friends.some(f => f.uid === u.uid)
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const sendFriendRequest = (targetUser) => {
    const targetRequests = JSON.parse(localStorage.getItem(`empowerme_${targetUser.uid}_requests`) || '[]');
    const newRequest = { ...user, requestId: Date.now() };
    targetRequests.push(newRequest);
    localStorage.setItem(`empowerme_${targetUser.uid}_requests`, JSON.stringify(targetRequests));
    alert(`Friend request sent to ${targetUser.name}!`);
    setSearchResults([]);
    setSearchQuery('');
  };

  const acceptRequest = (requestUser) => {
    const newFriend = { uid: requestUser.uid, name: requestUser.name, email: requestUser.email };
    const updatedFriends = [...friends, newFriend];
    setFriends(updatedFriends);
    localStorage.setItem(`empowerme_${user.uid}_friends`, JSON.stringify(updatedFriends));
    
    const requesterFriends = JSON.parse(localStorage.getItem(`empowerme_${requestUser.uid}_friends`) || '[]');
    requesterFriends.push({ uid: user.uid, name: user.name, email: user.email });
    localStorage.setItem(`empowerme_${requestUser.uid}_friends`, JSON.stringify(requesterFriends));
    
    const updatedRequests = requests.filter(r => r.uid !== requestUser.uid);
    setRequests(updatedRequests);
    localStorage.setItem(`empowerme_${user.uid}_requests`, JSON.stringify(updatedRequests));
  };

  const declineRequest = (requestUser) => {
    const updatedRequests = requests.filter(r => r.uid !== requestUser.uid);
    setRequests(updatedRequests);
    localStorage.setItem(`empowerme_${user.uid}_requests`, JSON.stringify(updatedRequests));
  };

  return (
    <div style={{ background: '#1a1a1a', borderRadius: '20px', padding: '24px', border: '1px solid #2a2a2a' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: 'white', margin: 0 }}>Social</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          {['friends', 'requests', 'discover'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                padding: '8px 16px',
                background: activeTab === tab ? 'linear-gradient(135deg, #667eea, #764ba2)' : '#2a2a2a',
                border: 'none',
                borderRadius: '12px',
                color: 'white',
                fontSize: '14px',
                cursor: 'pointer',
                textTransform: 'capitalize'
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search users by name..."
          value={searchQuery}
          onChange={(e) => searchUsers(e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            background: '#2a2a2a',
            border: '1px solid #333',
            borderRadius: '12px',
            color: 'white',
            fontSize: '14px',
            outline: 'none'
          }}
        />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {searchQuery && searchResults.length > 0 && (
          <div>
            <div style={{ color: '#888', fontSize: '14px', marginBottom: '12px' }}>Search Results:</div>
            {searchResults.map(result => (
              <div key={result.uid} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#2a2a2a', borderRadius: '12px', marginBottom: '8px' }}>
                <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #667eea, #764ba2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '16px', fontWeight: '600' }}>
                  {result.name.charAt(0)}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ color: 'white', fontWeight: '500', fontSize: '15px' }}>{result.name}</div>
                  <div style={{ color: '#888', fontSize: '13px' }}>{result.email}</div>
                </div>
                <button 
                  onClick={() => sendFriendRequest(result)}
                  style={{ padding: '6px 12px', background: 'linear-gradient(135deg, #667eea, #764ba2)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '12px', cursor: 'pointer' }}
                >
                  Add Friend
                </button>
              </div>
            ))}
          </div>
        )}
        
        {searchQuery && searchResults.length === 0 && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
            No users found matching "{searchQuery}"
          </div>
        )}
        
        {!searchQuery && activeTab === 'friends' && (
          friends.length > 0 ? friends.map(friend => (
            <div key={friend.uid} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#2a2a2a', borderRadius: '12px' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #10b981, #059669)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '16px', fontWeight: '600' }}>
                {friend.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'white', fontWeight: '500', fontSize: '15px' }}>{friend.name}</div>
                <div style={{ color: '#888', fontSize: '13px' }}>{friend.email}</div>
              </div>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
            </div>
          )) : (
            <div style={{ padding: '20px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
              No friends yet. Search for users to add friends!
            </div>
          )
        )}

        {!searchQuery && activeTab === 'requests' && (
          requests.length > 0 ? requests.map(request => (
            <div key={request.uid} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', background: '#2a2a2a', borderRadius: '12px' }}>
              <div style={{ width: '40px', height: '40px', background: 'linear-gradient(135deg, #f59e0b, #d97706)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '16px', fontWeight: '600' }}>
                {request.name.charAt(0)}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ color: 'white', fontWeight: '500', fontSize: '15px' }}>{request.name}</div>
                <div style={{ color: '#888', fontSize: '13px' }}>Wants to be friends</div>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={() => acceptRequest(request)}
                  style={{ padding: '6px 12px', background: 'linear-gradient(135deg, #10b981, #059669)', border: 'none', borderRadius: '8px', color: 'white', fontSize: '12px', cursor: 'pointer' }}
                >
                  Accept
                </button>
                <button 
                  onClick={() => declineRequest(request)}
                  style={{ padding: '6px 12px', background: '#ef4444', border: 'none', borderRadius: '8px', color: 'white', fontSize: '12px', cursor: 'pointer' }}
                >
                  Decline
                </button>
              </div>
            </div>
          )) : (
            <div style={{ padding: '20px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
              No friend requests
            </div>
          )
        )}

        {!searchQuery && activeTab === 'discover' && (
          <div style={{ padding: '20px', textAlign: 'center', color: '#888', fontSize: '14px' }}>
            Use the search bar to find users by name
          </div>
        )}
      </div>
    </div>
  );
}

export default FriendsList;