import { useLocation } from "react-router-dom";

const Home = () => {
  const location = useLocation();

  return (
    <main>
      <div className="flex-row justify-center">
        <div className="col-12 col-md-10 my-3">
          <h1>Hello </h1>
        </div>
      </div>
    </main>
  );
};

export default Home;
