import { LOCAL_STORAGE_LOGIN_TOKEN } from "../constants/constants";

export const setLocalStorageLoginToken = (data) => {
  localStorage.setItem(LOCAL_STORAGE_LOGIN_TOKEN, JSON.stringify(data));
};

export const getLocalStorageLoginToken = (key) => {
  const data = localStorage.getItem(key);
  return JSON.parse(data);
};

export const removeLocalStorageLoginToken = (key) => {
  localStorage.removeItem(key);
};
