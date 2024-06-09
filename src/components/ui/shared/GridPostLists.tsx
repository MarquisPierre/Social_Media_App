
import { Models } from "appwrite"; 
import { Link } from "react-router-dom"; 
import PostStats from "@/components/ui/shared/PostStats"; 
import { useUserContext } from "@/context/AuthContext"; 

// Define the props type for GridPostList component
type GridPostListProps = {
  posts: Models.Document[]; // Array of post documents
  showUser?: boolean; // Optional prop to show or hide the user information
  showStats?: boolean; // Optional prop to show or hide the post statistics
};

// GridPostList functional component to display a list of posts in a grid
const GridPostList = ({
  posts, // Array of post documents to display
  showUser = true, // Default to show user information
  showStats = true, // Default to show post statistics
}: GridPostListProps) => {
  const { user } = useUserContext(); // Access the current user from the user context

  return (
    <ul className="grid-container"> {/* Container for the grid list */}
      {posts.map((post) => ( // Iterate over the posts array and render each post
        <li key={post.$id} className="relative min-w-80 h-80"> {/* List item for each post */}
          <Link to={`/posts/${post.$id}`} className="grid-post_link"> {/* Link to the post detail page */}
            <img
              src={post.imageUrl} // Post image URL
              alt="post" // Alt text for the post image
              className="h-full w-full object-cover" // Image styling
            />
          </Link>

          <div className="grid-post_user"> {/* Container for user information and post statistics */}
            {showUser && ( // Conditional rendering of user information
              <div className="flex items-center justify-start gap-2 flex-1"> {/* User info container */}
                <img
                  src={
                    post.creator.imageUrl || // User profile image URL
                    "/assets/icons/profile-placeholder.svg" // Placeholder image if no profile image
                  }
                  alt="creator" // Alt text for the creator image
                  className="w-8 h-8 rounded-full" // Image styling
                />
                <p className="line-clamp-1">{post.creator.name}</p> {/* User name */}
              </div>
            )}
            {showStats && <PostStats post={post} userId={user.id} />} {/* Conditional rendering of post statistics */}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default GridPostList; // Export the GridPostList component as default
