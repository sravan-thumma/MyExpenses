import axios from 'axios';
import React, { useEffect } from 'react';  
//import { Cookie } from 'cookie';
const api = axios.create({
  baseURL: 'https://homenetwork-dev.free.nf/api.php/', // Replace with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
  responseType: 'json',
  withCredentials: true, // This enables sending cookies with requests
});

// Add your cookie string to the headers
//api.defaults.headers.common['Cookie'] = '__test=ae5c50926771a64dab0ff5eb1ff9e451; expires=2023-08-21T17:16:34.847Z; path=/'; 
//api.defaults.headers.common['Accept'] = 'application/json';
//api.defaults.headers.common['Content-Type'] = 'application/json';
//const cookies = new Cookie();
//cookies.set('__test', 'ae5c50926771a64dab0ff5eb1ff9e451', { path: '/', maxAge: 3600 }); 

api.defaults.headers.common['Cookie'] = '__test=ae5c50926771a64dab0ff5eb1ff9e451; expires=2023-09-13T16:59:56.838Z; path=/';
api.defaults.headers.common['User-Agent'] = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36';
/*api.interceptors.request.use(async config =>{
  cookie = await AsyncStorage.getItem('cookie');
      if (cookie) {
        config.headers.Cookie = cookie;
      }
      return config;
})*/
export default api;
