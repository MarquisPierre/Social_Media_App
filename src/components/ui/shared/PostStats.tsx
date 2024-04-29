import { Models } from "appwrite"; // Importing necessary models from the appwrite library
import { useState, useEffect } from "react"; // Importing useState and useEffect hooks from React
import { useLocation } from "react-router-dom"; // Importing useLocation hook from React Router

import { checkIsLiked } from "@/lib/utils"; // Importing a utility function for checking if a post is liked
import {
  useLikePost,
  useSavePost,
  useDeleteSavedPost,
  useGetCurrentUser,
} from "@/lib/react-query/queriesAndMutations"; // Importing custom React query hooks for interacting with the backend
import { Loader } from "lucide-react";

// Defining the type for props received by the component
type PostStatsProps = {
  post: Models.Document; // The post document
  userId: string; // ID of the current user
};

// Defining the PostStats component
const PostStats = ({ post, userId }: PostStatsProps) => {
  const location = useLocation(); // Getting the current location using useLocation hook
  const likesList = post.likes.map((user: Models.Document) => user.$id); // Extracting the list of users who liked the post

  // State variables for likes and saved status of the post
  const [likes, setLikes] = useState<string[]>(likesList);
  const [isSaved, setIsSaved] = useState(false);

  // Custom React query hooks for like, save, and delete actions
  const { mutate: likePost } = useLikePost();
  const { mutate: savePost, isPending: isSavingPost } = useSavePost();
  const { mutate: deleteSavePost, isPending: isDeletingSaved } = useDeleteSavedPost();

  // Custom React query hook to get the current user data
  const { data: currentUser } = useGetCurrentUser();

  // Checking if the post is saved by the current user
  const savedPostRecord = currentUser?.save.find(
    (record: Models.Document) => record.post.$id === post.$id
  );

  // Effect to update saved status when the current user data changes
  useEffect(() => {
    setIsSaved(!!savedPostRecord); // Updating isSaved based on whether the post is saved
  }, [currentUser]);

  // Handler for toggling like status of the post
  const handleLikePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Preventing event bubbling

    let likesArray = [...likes]; // Creating a copy of likes array

    // Toggling like status based on whether the user already liked the post
    if (likesArray.includes(userId)) {
      likesArray = likesArray.filter((Id) => Id !== userId); // If liked, remove the like
    } else {
      likesArray.push(userId); // If not liked, add the like
    }

    setLikes(likesArray); // Updating likes array
    likePost({ postId: post.$id, likesArray }); // Calling the likePost mutation
  };

  // Handler for toggling save status of the post
  const handleSavePost = (
    e: React.MouseEvent<HTMLImageElement, MouseEvent>
  ) => {
    e.stopPropagation(); // Preventing event bubbling

    // If post is already saved, delete the saved record
    if (savedPostRecord) {
      setIsSaved(false); // Updating isSaved state
      return deleteSavePost(savedPostRecord.$id); // Calling deleteSavePost mutation
    }

    // If post is not saved, save the post
    savePost({ userId: userId, postId: post.$id }); // Calling savePost mutation
    setIsSaved(true); // Updating isSaved state
  };

  // Applying container styles based on location
  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  // Rendering the component
  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <div className="flex gap-2 mr-5">
        {/* Like button */}
        <img
          src={`${
            checkIsLiked(likes, userId)
              ? "/assets/icons/liked.svg"
              : "/assets/icons/like.svg"
          }`}
          alt="like"
          width={20}
          height={20}
          onClick={(e) => handleLikePost(e)}
          className="cursor-pointer"
        />
        {/* Displaying the number of likes */}
        <p className="small-medium lg:base-medium">{likes.length}</p>
      </div>

      <div className="flex gap-2">
        {/* Save button */}
        {isSavingPost || isDeletingSaved ? <Loader /> : <img
          src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
          alt="share"
          width={20}
          height={20}
          className="cursor-pointer"
          onClick={(e) => handleSavePost(e)}
        />}
      </div>
    </div>
  );
};

export default PostStats; // Exporting the PostStats component
