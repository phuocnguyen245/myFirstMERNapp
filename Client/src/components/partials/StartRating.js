import { FaStar } from "react-icons/fa";

function App() {
  const stars = Array(5).fill(0)
  return (
    <div>
      {stars.map((_, index) => {
        return (
          <FaStar
            key={index}
            size={24}
            color={(4) <= index ? 'grey' : 'orange'}
            style={{
              marginRight: 10,
              cursor: "pointer"
            }}
          />
        )
      })}
    </div>
  );
};


export default App;
