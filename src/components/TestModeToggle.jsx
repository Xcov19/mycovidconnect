import React, { useState, useEffect } from 'react';
import { isTestMode, setTestMode, getTestLocation, setTestLocation } from '../utils/validation';

/**
 * Test Mode Toggle Component
 * Allows developers to enable/disable test mode and set test coordinates
 */
const TestModeToggle = () => {
  const [enabled, setEnabled] = useState(false);
  const [testLat, setTestLat] = useState('');
  const [testLng, setTestLng] = useState('');
  const [testCity, setTestCity] = useState('');

  useEffect(() => {
    // Load current test mode state
    setEnabled(isTestMode());
    
    // Load current test location
    const location = getTestLocation();
    setTestLat(location.lat.toString());
    setTestLng(location.lng.toString());
    setTestCity(location.city || '');
  }, []);

  const handleToggle = (checked) => {
    setEnabled(checked);
    setTestMode(checked);
    
    if (checked) {
      console.log('Test mode enabled');
    } else {
      console.log('Test mode disabled');
    }
  };

  const handleSaveLocation = () => {
    const lat = parseFloat(testLat);
    const lng = parseFloat(testLng);
    
    if (isNaN(lat) || isNaN(lng)) {
      alert('Please enter valid latitude and longitude values');
      return;
    }
    
    if (lat < -90 || lat > 90) {
      alert('Latitude must be between -90 and 90');
      return;
    }
    
    if (lng < -180 || lng > 180) {
      alert('Longitude must be between -180 and 180');
      return;
    }
    
    setTestLocation(lat, lng, testCity);
    alert('Test location saved successfully!');
  };

  // Only show in development mode
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      background: 'white',
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '15px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 9999,
      minWidth: '250px',
      fontSize: '12px'
    }}>
      <h4 style={{ margin: '0 0 10px 0', color: '#333' }}>🧪 Test Mode</h4>
      
      <label style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
        <input
          type="checkbox"
          checked={enabled}
          onChange={(e) => handleToggle(e.target.checked)}
          style={{ marginRight: '8px' }}
        />
        Enable Test Mode
      </label>
      
      {enabled && (
        <div>
          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '2px' }}>Latitude:</label>
            <input
              type="number"
              value={testLat}
              onChange={(e) => setTestLat(e.target.value)}
              placeholder="28.6139"
              style={{ width: '100%', padding: '4px', fontSize: '12px' }}
            />
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '2px' }}>Longitude:</label>
            <input
              type="number"
              value={testLng}
              onChange={(e) => setTestLng(e.target.value)}
              placeholder="77.2090"
              style={{ width: '100%', padding: '4px', fontSize: '12px' }}
            />
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            <label style={{ display: 'block', marginBottom: '2px' }}>City (optional):</label>
            <input
              type="text"
              value={testCity}
              onChange={(e) => setTestCity(e.target.value)}
              placeholder="New Delhi"
              style={{ width: '100%', padding: '4px', fontSize: '12px' }}
            />
          </div>
          
          <button
            onClick={handleSaveLocation}
            style={{
              width: '100%',
              padding: '6px',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '12px'
            }}
          >
            Save Test Location
          </button>
          
          <div style={{ marginTop: '8px', fontSize: '10px', color: '#666' }}>
            Current: {testLat}, {testLng}
          </div>
        </div>
      )}
    </div>
  );
};

export default TestModeToggle;
