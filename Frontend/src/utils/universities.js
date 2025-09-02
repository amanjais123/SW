// src/utils/colleges.js
import axios from 'axios';

export const fetchIndianColleges = async () => {
  try {
    const response = await axios.get('https://colleges-api-india.fly.dev/colleges');
    return response.data.map(college => college.name);
  } catch (error) {
    console.error('Error fetching colleges:', error);
    return [];
  }
};
