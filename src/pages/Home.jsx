import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResult, setSelectedResult } from "../slices/searchSlice";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";
import imageOne from "../images/one.jpg";
import imageTwo from "../images/two.jpg";
import imageThree from "../images/three.jpg";

const images = [imageOne, imageTwo, imageThree];

const Home = () => {
  const [currentImg, setCurrentImg] = useState(0);
  const [searchedTerm, setSearchedTerm] = useState("");
  const { searchResult } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelected = (item) => {
    dispatch(setSelectedResult(item));
    navigate(`/music/${item.id}`);
  };

  useEffect(() => {
    if (searchedTerm.length > 0) {
      dispatch(getSearchResult(searchedTerm));
    }
  }, [searchedTerm]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCurrentImg((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearTimeout(timer);
  }, [currentImg]);

  return (
    <Container>
      <div className="flex flex-col justify-center items-center m-5">
        <div className="mb-10">
          <h1 className="font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600">
            Music App
          </h1>
          <p className="text-transparent text-xl bg-clip-text bg-gradient-to-r from-purple-400 to-blue-600 mt-5">
            An environment where you can find your favourite music
          </p>
        </div>
        <div className="min-w-full md:min-w-[500px] relative">
          <input
            type="text"
            className="border-2 border-gray-300 bg-white p-3 rounded-lg text-sm font-semibold focus:outline-none w-full"
            placeholder="Search"
            onChange={(e) => setSearchedTerm(e.target.value)}
          />
          {searchedTerm && (
            <div>
              {searchResult.length > 0 ? (
                <div className="absolute bg-white border-b-2 border-r-2 border-l-2 border-gray-300 rounded-lg w-full">
                  {searchResult.map((item, index) => (
                    <div
                      key={index}
                      className="p-2 hover:bg-slate-100 rounded-lg cursor-pointer"
                      onClick={() => handleSelected(item)}
                    >
                      {item.title}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="absolute bg-white border-b-2 border-r-2 border-l-2 border-gray-300 rounded-lg w-full">
                  <div className="p-2 hover:bg-slate-100 rounded-lg cursor-pointer">
                    No Result
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        <div className="min-w-full md:min-w-[500px]">
              <img
                src={images[currentImg]}
                alt="music"
                className="w-full h-96 object-cover rounded-lg mt-10"
              />
        </div>
      </div>
    </Container>
  );
};

export default Home;
