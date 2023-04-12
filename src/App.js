import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Favourite from "./pages/Favourite";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToFavourite } from "./slices/favouriteSlice";
import Navbar from "./components/Navbar";

function App() {
  const dispatch = useDispatch();
  const { darkMode } = useSelector((state) => state.theme);

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    if (favourites) {
      favourites.forEach((item) => {
        dispatch(addToFavourite(item));
      });
    }
  }, []);

  return (
    <div className={`${darkMode ? "bg-body-black" : ""}`}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="favourite" element={<Favourite />} />
        <Route path="music/:id" element={<Music />} />
      </Routes>
    </div>
  );
}

export default App;
