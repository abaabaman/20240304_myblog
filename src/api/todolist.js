import axios from 'axios'
// import { axios } from '@/utils/request'
import { BASE_URL } from '../constant/url'

// 全部笔记本
export function getTodoList (params) {
  console.log(params);
  return axios({
    url: `${BASE_URL}/todoList_get.php`,
    method: 'get',
    params
  })
};

export function setTodoList (data) {
  console.log(data);
  return axios({
    url: `${BASE_URL}/todoList_set.php`,
    method: 'post',
    data
  })
};