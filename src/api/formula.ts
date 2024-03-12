import axios from 'axios'
// import { axios } from '@/utils/request'
import { BASE_URL } from '@/constant/url';

// 全部笔记本
export function getFormula(params = {}) {
  return axios({
    url: `${BASE_URL}/formula_get.php`,
    method: 'get',
    params
  })
};

export function setFormula(data) {
  return axios({
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    url: `${BASE_URL}/formula_set.php`,
    method: 'post',
    data
  })
};