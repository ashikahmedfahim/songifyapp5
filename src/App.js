import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Favourite from "./pages/Favourite";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToFavourite } from "./slices/favouriteSlice";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    if (favourites) {
      favourites.forEach((item) => {
        dispatch(addToFavourite(item));
      });
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="favourite" element={<Favourite />} />
      <Route path="music/:id" element={<Music />} />
    </Routes>
  );
}

export default App;
