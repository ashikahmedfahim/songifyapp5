import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Container from "../components/Container";
import { getSelectedResult } from "../slices/searchSlice";

const Music = () => {
  const { selctedResult } = useSelector((state) => state.search);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!Object.keys(selctedResult).length) {
      dispatch(getSelectedResult(id));
    }
  }, []);

  return (
    <Container>
      {selctedResult && (
        <div className="flex justify-center items-center m-5">
          <div className="min-w-full md:min-w-[500px] relative">
            <div className="flex justify-center items-center">
              <h1 className="text-2xl font-semibold">{selctedResult.title}</h1>
            </div>
          </div>
        </div>
      )}
    </Container>
  );
};

export default Music;
