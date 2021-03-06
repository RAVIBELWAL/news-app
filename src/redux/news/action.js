import axios from 'axios'

export const FETCH_NEWS_REQUESTED = 'FETCH_NEWS_REQUESTED'
export const FETCH_NEWS_SUCCESS = 'FETCH_NEWS_SUCCESS'
export const FETCH_NEWS_FAILED = 'FETCH_NEWS_FAILED'

export const fetchNewsRequested = () => ({
	type: FETCH_NEWS_REQUESTED
})

export const fetchNewsSuccess = (news) => ({
	type: FETCH_NEWS_SUCCESS,
	payload: news
})

export const fetchNewsFailure = (errorMessage) => ({
	type: FETCH_NEWS_FAILED,
	payload: errorMessage
})

export const fetchNews = (countryCode = 'in', searchQuery = '') => {
	return async (dispatch, getState) => {
		try {
			dispatch(fetchNewsRequested())
			let res = await axios.get(`https://newsapi.org/v2/top-headlines?apiKey=b19c939513574f5a9e80bb4c4133da31&country=${countryCode}&q=${searchQuery}`)
			dispatch(fetchNewsSuccess(res.data.articles))
		} catch (error) {
			dispatch(fetchNewsFailure(error.message))
		}
	}
}

/*
	Redux-Thunk - For Asynchronous Redux State Updates
	- Return an async callback with two parameters
		1. dispatch - for dispatching other actions
		2. getState - to access the current state
	- Make API calls
*/