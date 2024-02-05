import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import axios from "@/utils/axios";
import { AppThunk } from "..";

interface IUser {
  firstName: string;
  lastName: string;
  gender: string;
  age: number;
  hair: {
    color: string;
  };
  address: {
    postalCode: string;
  };
  company: {
    department: string;
  };
}

interface IGetUsers {
  users: IUser[];
}

interface IUserState {
  departments: {
    [key: string]: {
      male: number;
      female: number;
      ageRange: string;
      hair: { [key: string]: number };
      addressUser: { [key: string]: string };
    };
  };
}

const initialState: IUserState = {
  departments: {},
};

export type UserState = Readonly<typeof initialState>;

export const getUsers = createAsyncThunk<IUser[]>("get user", async () => {
  const response = await axios.get<IGetUsers>(`/users`);
  return response.data.users;
});

const calculateAgeRange = (currentAgeRange: string, newAge: number) => {
  const [minAge, maxAge = 0] = currentAgeRange.split("-").map(Number);

  const updatedMinAge = minAge === 0 ? newAge : Math.min(minAge, newAge);
  const updatedMaxAge = Math.max(maxAge, updatedMinAge);

  return `${updatedMinAge}-${updatedMaxAge}`;
};

const groupHair = (existingData, newData) => {
  return { ...existingData, ...newData };
};

const transformUserData = (users: IUser[]) => {
  return users.reduce((result, user) => {
    const { firstName, lastName, company, gender, age, hair, address } = user;
    const department = company?.department || "";

    if (!result[department]) {
      result[department] = {
        male: 0,
        female: 0,
        ageRange: "",
        hair: {},
        addressUser: {},
      };
    }

    result[department][gender]++;
    result[department].ageRange = calculateAgeRange(
      result[department].ageRange,
      age
    );
    result[department].hair = groupHair(result[department].hair, hair);
    result[department].addressUser[firstName + lastName] = address.postalCode;

    return result;
  }, {} as IUserState["departments"]);
};

const UserSlice = createSlice({
  name: "user",
  initialState: initialState as UserState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(
      getUsers.fulfilled,
      (state, action: PayloadAction<IUser[]>) => {
        const transformedData = transformUserData(action.payload);
        return {
          ...state,
          departments: transformedData,
        };
      }
    );
  },
});

export const fetchUserData: () => AppThunk = () => (dispatch) => {
  dispatch(getUsers());
};

export default UserSlice.reducer;
