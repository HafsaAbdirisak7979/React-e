import { useState, useEffect } from "react";

function GreetingTitle() {
  const [name, setName] = useState("");
  const [greeting, setGreeting] = useState("Hello");

  useEffect(() => {
    document.title = name ? `${greeting}, ${name}` : "Welcome!";
  }, [name, greeting]);

  return (
    <div>
      <h2>Enter Your Name:</h2>
      <input
        type="text"
        placeholder="Write your name..."
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <h2>Choose a Greeting:</h2>
      <input
        type="text"
        placeholder="e.g. Hi, Good morning..."
        value={greeting}
        onChange={(e) => setGreeting(e.target.value)}
      />

      
    </div>
  );
}

export default GreetingTitle;
