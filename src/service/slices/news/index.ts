import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getNewsList } from '../../../utils/api';
import { State } from './index.types';
import { TComment, TNews } from '../../../types';

export const getNews = createAsyncThunk('news/getNews', async () => {
  return await getNewsList();
});

const initialState: State = {
  request: false,
  loading: false,
  failed: false,
  news: [],
  activeNewsItem: null,
  comments: [],
  isKids: false,
  error: undefined,
};

const news = createSlice({
  name: 'news',
  initialState,
  reducers: {
    setActiveNewsItem: (state, action: PayloadAction<TNews>) => {
      state.activeNewsItem = action.payload;
    },
    setComment: (state, action: PayloadAction<TComment>) => {
      state.comments.push(action.payload);
    },
    setIsKids: (state, action: PayloadAction<boolean>) => {
      state.isKids = action.payload;
    },
    clearComments: (state) => {
      state.comments = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getNews.pending, (state) => {
      state.loading = true;
      state.request = true;
    });
    builder.addCase(getNews.fulfilled, (state, action: PayloadAction<number[]>) => {
      state.loading = false;
      state.news = action.payload;
    });
    builder.addCase(getNews.rejected, (state) => {
      state.loading = false;
      state.failed = true;
      state.request = false;
    });
    builder.addDefaultCase(() => {});
  },
});

const { reducer, actions } = news;

export const { setActiveNewsItem, setComment, clearComments, setIsKids } = actions;

export default reducer;
