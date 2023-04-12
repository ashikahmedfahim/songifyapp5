import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Container from "../components/Container";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { addToFavourite, removeFromFavourite } from "../slices/favouriteSlice";
import { useNavigate } from "react-router-dom";

const Favourite = () => {
  const { favourites } = useSelector((state) => state.favourite);
  const { darkMode } = useSelector((state) => state.theme);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToFavourite = (item) => {
    dispatch(addToFavourite(item));
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    if (favourites) {
      localStorage.setItem("favourites", JSON.stringify([...favourites, item]));
    } else {
      localStorage.setItem("favourites", JSON.stringify([item]));
    }
  };

  const handleRemoveFromFavourite = (item) => {
    dispatch(removeFromFavourite(item));
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    const newFavourites = favourites.filter((fav) => fav.id !== item.id);
    localStorage.setItem("favourites", JSON.stringify(newFavourites));
  };

  return (
    <Container>
      {favourites.length ? (
        <>
          <div>
            <h1
              className={`text-2xl text-center my-5 ${
                darkMode ? "text-white" : "text-black"
              }`}
            >
              Favourites
            </h1>
          </div>
          {favourites.map((favourite, index) => (
            <div
              key={index}
              className={`flex justify-between items-center m-3 py-2 px-5 rounded text-white mx-auto w-5/6 md:w-1/2 cursor-pointer hover:bg-gray-600 ${
                darkMode ? "bg-gray-800" : "bg-gray-500"
              }`}
            >
              <p
                className="w-full"
                onClick={() => navigate(`/music/${favourite.id}`)}
              >
                {favourite.title}
              </p>
              <span className="ml-2">
                {favourites.find((item) => item.id === favourite.id) ? (
                  <MdFavorite
                    size={24}
                    onClick={() => handleRemoveFromFavourite(favourite)}
                  />
                ) : (
                  <MdOutlineFavoriteBorder
                    size={24}
                    onClick={() => handleAddToFavourite(favourite)}
                  />
                )}
              </span>
            </div>
          ))}
        </>
      ) : (
        <div className="flex justify-center my-10">
          <p
            className={`text-2xl py-10 ${
              darkMode ? "text-white" : "text-black"
            }`}
          >
            No Favourite
          </p>
        </div>
      )}
    </Container>
  );
};

export default Favourite;
