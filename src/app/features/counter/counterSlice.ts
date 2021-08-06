import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit';
import {RootState} from 'src/app/redux/store';
import {fetchCount} from './counterAPI';

export interface CounterState {
	value: number;
	status: 'loading' | 'idle' | 'failed';
}
const initState: CounterState = {
	value: 0,
	status: 'idle',
};
export const incrementAsync = createAsyncThunk('counter/fetchCount', async (amount: number) => {
	const res = await fetchCount(amount);
	return res;
});
const counterSlice = createSlice({
	name: 'counter',
	initialState: initState,
	reducers: {
		increment: (state) => {
			state.value += 1;
		},
		decrement: (state) => {
			state.value -= 1;
		},
		incrementByAmount: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
		},
		incrementSuccess: (state, action: PayloadAction<number>) => {
			state.value += action.payload;
			state.status = 'idle';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(incrementAsync.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(incrementAsync.fulfilled, (state, action) => {
				state.status = 'idle';
				state.value += action.payload;
			});
	},
});

export const {decrement, increment, incrementByAmount, incrementSuccess} = counterSlice.actions;

export const selectCount = (state: RootState) => state.counter.value;
export const isLoadingCounting = (state: RootState) => state.counter.status === 'loading';

const counterReducer = counterSlice.reducer;
export default counterReducer;
