import React, { useState, useEffect } from 'react';

const WindowMouseTracker = () => {
  const [Mouse, setMouse] = useState(window.innerMouse);
  const[coords, setCoords]=useState({x:0,y:0});


   useEffect(() => {
    const handleMouseMove = (e) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
    

  return (
    <div>
    
    <p>
      mouse x: {coords.x} mouse y: {coords.y}

    </p>
    </div>
  );
 
};

export default WindowMouseTracker;
