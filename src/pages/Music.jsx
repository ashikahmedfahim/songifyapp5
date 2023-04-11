import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { getSelectedResult } from "../slices/searchSlice";
import { getGifByKeyword } from "../slices/gifSlice";
import Loader from "../components/Loader";

const Music = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const searchState = useSelector((state) => state.search);
  const gifState = useSelector((state) => state.gif);
  const { id } = useParams();
  const dispatch = useDispatch();

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
      <div className="flex flex-col justify-center items-center m-5 min-h-screen">
        {searchState.isLoading ? (
          <Loader />
        ) : (
          searchState.selctedResult && (
            <>
              <h1 className="text-2xl font-semibold">
                {searchState.selctedResult.title}
              </h1>
              <div className="my-10">
                {gifState.isLoading ? (
                  <Loader />
                ) : gifState.gifResult.length ? (
                  <div className="flex flex-col justify-center items-center">
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
