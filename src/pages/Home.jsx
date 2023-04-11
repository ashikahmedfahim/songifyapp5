import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getSearchResult, setSelectedResult } from "../slices/searchSlice";
import Container from "../components/Container";
import { useNavigate } from "react-router-dom";

const Home = () => {
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

  return (
    <Container>
      <div className="flex justify-center items-center m-5">
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
      </div>
    </Container>
  );
};

export default Home;
