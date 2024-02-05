import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "@/utils/axios";
import { AppThunk } from "..";

export interface IActivity {
  activity: string;
  type: string;
  participants: number;
  price: number;
  link: string;
  key: string;
  accessibility: string;
}

const initialState = {
  data: {
    activity: "",
    type: "",
    participants: 0,
    price: 0,
  } as IActivity,
};

export type ActivityState = Readonly<typeof initialState>;

export const getActivity = createAsyncThunk<IActivity>(
  "get activity",
  async () => {
    const response = await axios.get<IActivity>(`/api/activity`);
    return response.data;
  }
);

const ActivitySlice = createSlice({
  name: "activity",
  initialState: initialState as ActivityState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(getActivity.fulfilled, (state, action) => ({
      ...state,
      data: action.payload,
    }));
  },
});

export const fetchActivityData: () => AppThunk = () => (dispatch) => {
  dispatch(getActivity());
};

export default ActivitySlice.reducer;
