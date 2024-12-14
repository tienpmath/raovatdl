import { PostComponent } from "@/components/post/PostComponent";
import { getSession } from "@/lib";
import CreatePostComponent from "@/components/post/create";

const PostPage = async () => {
  const session = await getSession();
  const u = session.userInfo;

  //console.log(u);
  return (
    <div className="min-h-screen bg-white-100">
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
        <div className="container px-4 pt-4 pb-4 md:px-6 border-2 border-solid	border-color: currentColor  ">
          <h1 className="mb-5">
            Đăng bài mới : Thông tin của bạn sẽ được xác minh để hoàn tất !:{" "}
          </h1>
          <hr />
          {session ? (
            <PostComponent user={u} />
          ) : (
            "<h2>Vui lòng đăng nhập để post bài !</h2>"
          )}
        </div>{" "}
      </section>{" "}
    </div>
  );
};

export default PostPage;
