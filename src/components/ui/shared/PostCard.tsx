// Import necessary modules and components
import { Models } from "appwrite"; // Importing Models from the appwrite library
import { Link } from "react-router-dom"; // Importing Link component from react-router-dom

import  PostStats  from "@/components/ui/shared/PostStats"; // Importing PostStats component
import { multiFormatDateString } from "@/lib/utils"; // Importing multiFormatDateString function
import { useUserContext } from "@/context/AuthContext"; // Importing useUserContext hook from AuthContext

// Define the type for props that the PostCard component receives
type PostCardProps = {
  post: Models.Document; // The post prop is expected to be of type Document from Models
};

// Define the PostCard component with its props
const PostCard = ({ post }: PostCardProps) => {
  // Destructure user from the AuthContext
  const { user } = useUserContext();

  // Check if post creator exists, if not, return nothing
  if (!post.creator) return;

  // Render the PostCard component
  return (
    <div className="post-card">
      <div className="flex-between">
        {/* Render profile picture and name of the post creator */}
        <div className="flex items-center gap-3">
          <Link to={`/profile/${post.creator.$id}`}>
            <img
              src={
                post.creator?.imageUrl ||
                "/assets/icons/profile-placeholder.svg"
              }
              alt="creator"
              className="w-12 lg:h-12 rounded-full"
            />
          </Link>

          <div className="flex flex-col">
            <p className="base-medium lg:body-bold text-light-1">
              {post.creator.name}
            </p>
            {/* Render post creation date and location */}
            <div className="flex-center gap-2 text-light-3">
              <p className="subtle-semibold lg:small-regular ">
                {multiFormatDateString(post.$createdAt)}
              </p>
              •
              <p className="subtle-semibold lg:small-regular">
                {post.location}
              </p>
            </div>
          </div>
        </div>

        {/* Render edit button if user is the creator of the post */}
        <Link
          to={`/update-post/${post.$id}`}
          className={`${user.id !== post.creator.$id && "hidden"}`}>
          <img
            src={"/assets/icons/edit.svg"}
            alt="edit"
            width={20}
            height={20}
          />
        </Link>
      </div>

      {/* Render post caption, tags, and image */}
      <Link to={`/posts/${post.$id}`}>
        <div className="small-medium lg:base-medium py-5">
          <p>{post.caption}</p>
          <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string, index: string) => (
              <li key={`${tag}${index}`} className="text-light-3 small-regular">
                #{tag}
              </li>
            ))}
          </ul>
        </div>

        <img
          src={post.imageUrl || "/assets/icons/profile-placeholder.svg"}
          alt="post image"
          className="post-card_img"
        />
      </Link>

      {/* Render post statistics */}
      <PostStats post={post} userId={user.id} />
    </div>
  );
};

// Export the PostCard component as default
export default PostCard;
