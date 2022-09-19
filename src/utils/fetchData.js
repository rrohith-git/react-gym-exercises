export const exercisesOptions = {
    method: 'GET',
    headers: {
        'X-RapidAPI-Key': process.env.REACT_APP_RAPID_API_KEY,
        'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_EXERCISE_HOST
    }
};

export const youtubeSearchOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key':  process.env.REACT_APP_RAPID_API_KEY,
      'X-RapidAPI-Host': process.env.REACT_APP_RAPID_API_YOUTUBE_SEARCH_HOST
    }
  }

export const fetchData = async (url, options) => {
    const response = await fetch(url, options);
    const data = response.json();
    return data;
};