import { INewUser, IUser } from "@/types";
import  {Avatars, ID} from 'appwrite'
import { account , avatars, databases} from "./config";
import { appwriteConfig } from "./config";

//Creates new account for a new user
export async function createAccount(user: INewUser) {
 try {
    const newAccount = await account.create(
        ID. unique(),
        user.email,
        user.password,
        user.name

    );
      if(!newAccount) throw Error;

      const avatarUrl = avatars.getInitials(user.name);

      const newUser = await saveUserToDB({
         acountId: newAccount.$id,
         name: newAccount.name,
         email: newAccount.email,
         username: user.username,
         imageUrl: avatarUrl,
      })
    return newUser

 } catch (error) {
    console.log(error)
    return error
 }
}

// This saves the new user into the Database
export async function saveUserToDB(user:{
   acountId: string;
   email: string;
   name: string;
   imageUrl: URL;
   username?: string
}) {
   try {
      const newUser = await databases.createDocument(
         appwriteConfig.databaseId,
         appwriteConfig.postCollectionId,
         ID.unique(),
         user
      )
   } catch (error) {
      console.log(error)
   }
   
}