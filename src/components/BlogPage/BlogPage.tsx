import { IBlogType } from "@/types/BlogType";
import React from "react";
import BlogCard from "./blogCard";
import { useGetBlogsQuery } from "@/redux/api/features/blogApi";

const BlogPage = () => {
  // get data
  const { data, isLoading } = useGetBlogsQuery(undefined);

  // const blogData: IBlogType[] = [
  //   {
  //     blogId: "1a6627c7-f2f8-4698-945e-f32519863618",
  //     blogTitle: "Lorem ipsum dolor sit amet",
  //     blogDescription:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, elit vel bibendum bibendum, sapien sapien bibendum sapien, vel bibendum sapien sapien vel sapien.",
  //     blogImage:
  //       "https://res.cloudinary.com/dfvsjdxtb/image/upload/v1697117140/styles/wkba9aarcgcr5yf0nyzs.png",
  //     createdAt: "2023-10-12T13:25:40.286Z",
  //     updatedAt: "2023-10-12T13:25:40.286Z",
  //     profileId: "aab88f72-7454-43fa-a676-d7d35041b912",
  //     profile: {
  //       firstName: "John",
  //       lastName: "Doe",
  //       profileImage: "https://picsum.photos/200",
  //     },
  //   },
  //   {
  //     blogId: "1a6627c7-f2f8-4698-945e-f32519863618",
  //     blogTitle: "Lorem ipsum dolor sit amet",
  //     blogDescription:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, elit vel bibendum bibendum, sapien sapien bibendum sapien, vel bibendum sapien sapien vel sapien.",
  //     blogImage:
  //       "https://res.cloudinary.com/dfvsjdxtb/image/upload/v1697117140/styles/wkba9aarcgcr5yf0nyzs.png",
  //     createdAt: "2023-10-12T13:25:40.286Z",
  //     updatedAt: "2023-10-12T13:25:40.286Z",
  //     profileId: "aab88f72-7454-43fa-a676-d7d35041b912",
  //     profile: {
  //       firstName: "Bob",
  //       lastName: "Smith",
  //       profileImage: "https://picsum.photos/200",
  //     },
  //   },
  //   {
  //     blogId: "1a6627c7-f2f8-4698-945e-f32519863618",
  //     blogTitle: "Lorem ipsum dolor sit amet",
  //     blogDescription:
  //       "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, elit vel bibendum bibendum, sapien sapien bibendum sapien, vel bibendum sapien sapien vel sapien.",
  //     blogImage:
  //       "https://res.cloudinary.com/dfvsjdxtb/image/upload/v1697117140/styles/wkba9aarcgcr5yf0nyzs.png",
  //     createdAt: "2023-10-12T13:25:40.286Z",
  //     updatedAt: "2023-10-12T13:25:40.286Z",
  //     profileId: "aab88f72-7454-43fa-a676-d7d35041b912",
  //     profile: {
  //       firstName: "Alice",
  //       lastName: "Johnson",
  //       profileImage: "https://picsum.photos/200",
  //     },
  //   },
  // ];

  return (
    <div className="common mb-[60px]">
      {/* blog news */}

      <div className="w-full flex justify-between items-center mt-20 mb-[100px]">
        <div>
          <p className="text-black md:text-[20px] text-[32px] font-semibold">
            OUR RECENT BLOGS
          </p>
        </div>
      </div>

      {/* blogs */}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 justify-center items-center ">
        {data?.map((blog: any) => (
          <BlogCard key={blog.blogId} blog={blog} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
