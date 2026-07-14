import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateForm, addChatMessage } from './store/crmSlice';
import axios from 'axios';

function App() {
  const dispatch = useDispatch();
  const formData = useSelector((state) => state.crm.formData);
  const chatHistory = useSelector((state) => state.crm.chatHistory);
  const [chatInput, setChatInput] = useState('');

  const handleChatSubmit = async () => {
    if (!chatInput) return;
    
    // User ka message UI mein add karna
    dispatch(addChatMessage({ sender: 'user', text: chatInput }));
    
    try {
      // Backend ko message bhejna
      const response = await axios.post('http://127.0.0.1:8000/api/chat', { message: chatInput });
      
      // AI ka reply UI mein add karna
      dispatch(addChatMessage({ sender: 'ai', text: response.data.reply }));
    } catch (error) {
      console.error("Error communicating with AI:", error);
      dispatch(addChatMessage({ sender: 'ai', text: "Sorry, backend se connect nahi ho paaya." }));
    }
    setChatInput('');
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: "'Inter', sans-serif", backgroundColor: '#f8f9fa' }}>
      
      {/* LEFT SIDE: STRUCTURED FORM */}
      <div style={{ flex: 2, padding: '30px', borderRight: '2px solid #e0e0e0', overflowY: 'auto' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Log HCP Interaction</h2>
        <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
          
          <div style={{ display: 'flex', gap: '20px', marginBottom: '15px' }}>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>HCP Name</label>
              <input type="text" placeholder="Search or select HCP..." style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}/>
            </div>
            <div style={{ flex: 1 }}>
              <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Interaction Type</label>
              <select style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}>
                <option>Meeting</option>
                <option>Email</option>
                <option>Call</option>
              </select>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Topics Discussed</label>
            <textarea placeholder="Enter key discussion points..." rows="4" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Observed/Inferred HCP Sentiment</label>
            <div style={{ display: 'flex', gap: '15px' }}>
              <label><input type="radio" name="sentiment" /> Positive</label>
              <label><input type="radio" name="sentiment" defaultChecked /> Neutral</label>
              <label><input type="radio" name="sentiment" /> Negative</label>
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', fontSize: '14px', marginBottom: '5px' }}>Follow-up Actions</label>
            <textarea placeholder="Enter next steps or tasks..." rows="3" style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}></textarea>
          </div>
          
        </div>
      </div>

      {/* RIGHT SIDE: AI ASSISTANT CHAT */}
      <div style={{ flex: 1, padding: '30px', display: 'flex', flexDirection: 'column', backgroundColor: 'white' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }}>
          <span style={{ fontSize: '24px', marginRight: '10px' }}>🤖</span>
          <div>
            <h3 style={{ margin: 0 }}>AI Assistant</h3>
            <span style={{ fontSize: '12px', color: 'gray' }}>Log interaction via chat</span>
          </div>
        </div>

        <div style={{ backgroundColor: '#f0f4f8', padding: '15px', borderRadius: '8px', fontSize: '14px', color: '#555', marginBottom: '20px' }}>
          Log interaction details here (e.g., "Met Dr. Smith, discussed Product X efficacy, positive sentiment, shared brochure") or ask for help.
        </div>
        
        <div style={{ flex: 1, overflowY: 'auto', border: '1px solid #e0e0e0', borderRadius: '8px', padding: '15px', marginBottom: '15px', backgroundColor: '#fafafa' }}>
          {chatHistory.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#aaa', marginTop: '50%' }}>No messages yet...</p>
          ) : (
            chatHistory.map((msg, index) => (
              <div key={index} style={{ textAlign: msg.sender === 'user' ? 'right' : 'left', margin: '10px 0' }}>
                <span style={{ 
                  backgroundColor: msg.sender === 'user' ? '#4a90e2' : '#e2e2e2', 
                  color: msg.sender === 'user' ? 'white' : 'black', 
                  padding: '10px 15px', 
                  borderRadius: '15px', 
                  display: 'inline-block',
                  maxWidth: '80%'
                }}>
                  {msg.text}
                </span>
              </div>
            ))
          )}
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="text" 
            value={chatInput} 
            onChange={(e) => setChatInput(e.target.value)} 
            placeholder="Describe interaction..." 
            style={{ flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
          <button onClick={handleChatSubmit} style={{ padding: '12px 20px', backgroundColor: '#5c6bc0', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>
            Log
          </button>
        </div>
      </div>

    </div>
  );
}

export default App;
