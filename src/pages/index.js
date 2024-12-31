import { useState } from "react";

export default function Home(){
  const [prompt, setPrompt] = useState("");
  const [ characters, setcharacters] = useState([]);
  const [ loading, setloading] = useState(false);

  const generateCharacters = async () => {
    try{
      setloading(true);
      const response = await fetch("/api/anime-character-generator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });
      const { characters } = await response.json();
      console.log("characters", characters);
      if (Array.isArray(characters)){
        setcharacters(characters);
      } else {
        console.error("Invalid characters format:", characters);
        setcharacters([]);
      }
    } catch(error){
      console.error("Failed to generate anime characters:", error);
      setcharacters([]);
    } finally {
      setloading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">AI Anime Character Generator</h1>
      <input
        type="text"
        placeholder="Enter your character prompt..."
        className="text-black border p-2 rounded w-full mb-4"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={generateCharacters}
        className="bg-blue-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Generating..." : "Generate Characters"}
      </button>
      {characters.length > 0 && (
        <div className="max-w-md mx-auto mt-4">
          {characters.map((character, index) => (
            <img
              key={index}
              src={character}
              alt={`Anime Character ${index + 1}`}
              className="w-48 h-auto mx-2 my-4"
            />
          ))}
        </div>
      )}
    </div>
  );  
}