import axios from 'axios'
// import { axios } from '@/utils/request'
import { BASE_URL } from '../constant/url.js';

// 全部笔记本
export function getNoteList(params = {}) {
  return axios({
    url: `${BASE_URL}/noteList_get.php`,
    method: 'get',
    params
  })
};