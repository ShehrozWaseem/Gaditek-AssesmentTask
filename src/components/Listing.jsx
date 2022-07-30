import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCountry } from "../redux/reducer/contSlicer";
import Count_Tab from "./UI/Count_Tab";

const Listing = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountry());
  }, []);
  const countryList = useSelector((state) => state.countryList);
  const { error } = countryList;
  // console.log(countryList[0].name.common)
  return (
    <>
      <Count_Tab />
    </>
  );
};

export default Listing;
