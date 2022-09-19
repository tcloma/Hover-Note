/* eslint-disable react-hooks/rules-of-hooks */
import axios from 'axios';
import { useQuery, useMutation } from 'react-query';

const usersApi = axios.create({
   baseURL: 'http://localhost:8080',
});

const fetchUsers = async (): Promise<JSON> => {
   const request = await usersApi.get('/users');
   return request.data;
};

export const getAllUsers = () => {
   return useQuery('users', () => fetchUsers());
}

export const addNewUser = () => {
   return useMutation((newUser: object) => {
      return usersApi.post('users', newUser);
   }, {
      onSuccess: () => {
         console.log('Success!')
      }
   });
} 