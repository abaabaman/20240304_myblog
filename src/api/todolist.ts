import axios from 'axios'
// import { axios } from '@/utils/request'
import { BASE_URL } from '../constant/url'

// 全部笔记本
export function getTodoList (params) {
  return axios({
    url: `${BASE_URL}/todolist_get.php`,
    method: 'get',
    params
  })
};

export function setTodoList (data) {
  return axios({
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: `${BASE_URL}/todolist_set.php`,
    method: 'post',
    data
  })
};