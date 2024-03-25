import{useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    useInfiniteQuery
} from '@tanstack/react-query'
import { createAccount, signInAccount } from '../appwrite/api'
import { INewUser } from '@/types'


// Creates the user and saves it into the dabatase
// uses api functions from the appwrite api file
export const useCreateUserAccount = () => {
    return useMutation({
      mutationFn: (user: INewUser) => createAccount(user),
    });
  };

//Sign in into the account by checking for email and password
// uses api functions from the appwrite api file
export const useSignInAccount = () => {
    return useMutation({
        mutationFn: (user: {
            email: string; 
            password: string;}) => signInAccount(user)
    })
}

