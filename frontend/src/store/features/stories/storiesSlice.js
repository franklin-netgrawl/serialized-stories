import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchStories = createAsyncThunk(
  'stories/fetchStories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stories`);
      const data = await response.json();
      
      if (!response.ok) {
        return rejectWithValue(data.message);
      }
      
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const storiesSlice = createSlice({
  name: 'stories',
  initialState: {
    items: [],
    loading: false,
    error: null,
    currentStory: null,
  },
  reducers: {
    setCurrentStory: (state, action) => {
      state.currentStory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchStories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStories.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchStories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setCurrentStory } = storiesSlice.actions;
export default storiesSlice.reducer;
