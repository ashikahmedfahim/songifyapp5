import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { getSelectedResult } from "../slices/searchSlice";
import { getGifByKeyword } from "../slices/gifSlice";
import Loader from "../components/Loader";
import { MdOutlineFavoriteBorder, MdFavorite } from "react-icons/md";
import { addToFavourite, removeFromFavourite } from "../slices/favouriteSlice";

const Music = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const searchState = useSelector((state) => state.search);
  const gifState = useSelector((state) => state.gif);
  const { favourites } = useSelector((state) => state.favourite);
  const { darkMode } = useSelector((state) => state.theme);

  const { id } = useParams();
  const dispatch = useDispatch();

  const handleAddToFavourite = (item) => {
    dispatch(addToFavourite(item));
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    if (favourites) {
      localStorage.setItem("favourites", JSON.stringify([...favourites, item]));
    }else{
      localStorage.setItem("favourites", JSON.stringify([item]));
    }
  };

  const handleRemoveFromFavourite = (item) => {
    dispatch(removeFromFavourite(item));
    const favourites = JSON.parse(localStorage.getItem("favourites"));
    const newFavourites = favourites.filter((fav) => fav.id !== item.id);
    localStorage.setItem("favourites", JSON.stringify(newFavourites));
  };

  useEffect(() => {
    if (gifState.gifResult.length > 0) {
      const timer = setTimeout(() => {
        setCurrentImg((prev) => (prev + 1) % gifState.gifResult.length);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [gifState, currentImg]);

  useEffect(() => {
    if (!Object.keys(searchState.selctedResult).length) {
      dispatch(getSelectedResult(id));
    }
  }, []);

  useEffect(() => {
    if (Object.keys(searchState.selctedResult).length) {
      dispatch(getGifByKeyword(searchState.selctedResult.title));
    }
  }, [searchState.selctedResult]);

  return (
    <Container>
    <div className={`flex flex-col justify-center items-center m-5 ${darkMode ? 'text-white' : ''}`}>
        {searchState.isLoading ? (
          <Loader />
        ) : (
          searchState.selctedResult && (
            <>
              <h1 className="text-2xl font-semibold flex items-center">
                {searchState.selctedResult.title}
                <span className="ml-2 mt-1">
                  {favourites.find(
                    (item) => item.id === searchState.selctedResult.id
                  ) ? (
                    <MdFavorite
                      size={24}
                      onClick={() =>
                        handleRemoveFromFavourite(searchState.selctedResult)
                      }
                    />
                  ) : (
                    <MdOutlineFavoriteBorder
                      size={24}
                      onClick={() =>
                        handleAddToFavourite(searchState.selctedResult)
                      }
                    />
                  )}
                </span>
              </h1>
              <div className="my-10">
                {gifState.isLoading ? (
                  <Loader />
                ) : gifState.gifResult.length ? (
                  <div className="flex flex-col justify-center items-center max-w-[400px] max-h-[400px]">
                    <img
                      src={
                        gifState.gifResult[currentImg]?.images?.downsized.url
                      }
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex justify-center items-center">
                    <p>No Gif Found</p>
                  </div>
                )}
              </div>
            </>
          )
        )}
      </div>
    </Container>
  );
};

export default Music;
