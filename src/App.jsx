import { useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

const App = () => {
  const [advice, setAdvice] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchAdvice() {
    setLoading(true);
    try {
      const response = await fetch("https://api.adviceslip.com/advice");
      const data = await response.json();
      setAdvice([data]);
    } catch (error) {
      console.error("error occured fetching the advice:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAdvice();
  }, []);

  function handleNewAdvice() {
    fetchAdvice();
  }

  return (
    <div className="parent">
      <h2>Advice Slip Generator</h2>
      <p>
        <em>Get some Advice to keep you going and motivate you!</em>
      </p>
      <div>
        {!loading ? (
          advice.map((singleAdvice) => (
            <p key={singleAdvice.slip.id} className="singleAdvice">
              {singleAdvice.slip.advice}
            </p>
          ))
        ) : (
          <div>
            <ClipLoader size={20} color="red" />
          </div>
        )}
      </div>
      <button onClick={handleNewAdvice} disabled={loading}>
        {loading ? "Loading....." : "Get New Advice"}
      </button>
    </div>
  );
};

export default App;
