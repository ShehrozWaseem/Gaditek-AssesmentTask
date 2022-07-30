import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  fetchedCountries: [],
  error: "",
};

// Generates pending, fulfilled and rejected action types
export const fetchCountry = createAsyncThunk(
  "country/fetchCountry",
  async () => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "99ca0d31famsh06ae13a5fcd817ap1e6b8bjsnc4bc8ee97dc4",
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    };
    const response = await fetch("https://restcountries.com/v3.1/all");
    const data = await response.json();
    return data;
    // console.log(data)
  }
);

const contSlicer = createSlice({
  name: "country",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCountry.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCountry.fulfilled, (state, action) => {
      state.loading = false;
      state.fetchedCountries = action.payload;
      state.error = "";
      // console.log(state.fetchedCountries)
    });
    builder.addCase(fetchCountry.rejected, (state, action) => {
      state.loading = false;
      state.fetchedCountries = [];
      state.error = action.error.message;
    });
  },
});

export default contSlicer.reducer;
