import { combineReducers } from '@reduxjs/toolkit';
import news from '../slices/news';

const rootReducer = combineReducers({ news });

export default rootReducer;
