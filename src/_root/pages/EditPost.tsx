// Importing necessary dependencies and components
import { useParams } from "react-router-dom"; // Hook to access URL parameters
import Loader from "@/components/ui/shared/Loader"; // Loader component for displaying loading state
import PostForm from "@/components/forms/PostForm"; // Form component for editing post
import { useGetPostById } from "@/lib/react-query/queriesAndMutations"; // Custom hook to fetch post data by ID

// Defining the EditPost component
const EditPost = () => {
  // Extracting the 'id' parameter from the URL
  const { id } = useParams();

  // Fetching the post data by its ID using a custom hook
  const { data: post, isLoading } = useGetPostById(id);

  // Rendering loading state while fetching data
  if (isLoading)
    return (
      <div className="flex-center w-full h-full">
        <Loader /> {/* Displaying the loader component */}
      </div>
    );

  // Rendering the edit post form once data is loaded
  return (
    <div className="flex flex-1">
      <div className="common-container">
        <div className="flex-start gap-3 justify-start w-full max-w-5xl">
          <img
            src="/assets/icons/edit.svg"
            width={36}
            height={36}
            alt="edit"
            className="invert-white"
          />
          <h2 className="h3-bold md:h2-bold text-left w-full">Edit Post</h2>
        </div>

        {/* Conditional rendering based on loading state */}
        {isLoading ? <Loader /> : <PostForm action="Update" post={post} />}
      </div>
    </div>
  );
};

export default EditPost; // Exporting the EditPost component
