import React from 'react';
import { FaStar } from 'react-icons/fa';

function App() {
  const stars: any = Array(5).fill(0);
  return (
    <div className="start">
      {stars.map((i: any, index: any) => {
        return (
          <FaStar
            key={index}
            size={24}
            color={4 <= index ? 'grey' : 'orange'}
            style={{
              marginRight: 10,
              cursor: 'pointer',
            }}
          />
        );
      })}
    </div>
  );
}

export default App;
