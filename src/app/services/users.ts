import axios from 'axios';
import { GitHubSearchResponse } from '../types/github';

export const getUsers = async (query: string): Promise<GitHubSearchResponse> => {
  const { data } = await axios.get<GitHubSearchResponse>(`https://api.github.com/search/users?q=${query}`);
  return data;
};