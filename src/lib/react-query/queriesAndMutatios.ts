import {
    // useQuery,
    useMutation,
    // useQueryClient,
    // useInfiniteQuery,
} from '@tanstack/react-query';
import { INewUser } from '../../types';
import { createUserAccount, singInAccount } from '../appwrite/api';

export const useCreateUserAccount = () => {
    return useMutation({
        mutationFn: (user: INewUser) => createUserAccount(user)
    })
}

export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: { email: string; password: string; }) => singInAccount(user)
    })
}