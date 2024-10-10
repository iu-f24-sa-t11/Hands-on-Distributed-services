import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://localhost/api',
});

export const register = (username: string) => {
    return axiosInstance.post('/auth/register', {username: username});
};

export const login = (username: string) => {
    return axiosInstance.post('/auth/login', {username: username});
};

export const getFeed = () => {
    return axiosInstance.get('/feed/');
};

export const postMessage = (content: string, authorUsername: string) => {
  return axiosInstance.post('/messages/', {
    content: content,
    author_username: authorUsername,
  });
};

export const setLike = (messageId: string, username: string) => {
  return axiosInstance.post('/like/set', {
    message_id: messageId,
    username: username,
  });
};

export const unsetLike = (messageId: string, username: string) => {
  return axiosInstance.post('/like/unset', {
    message_id: messageId,
    username: username,
  });
};


