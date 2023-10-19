import { authKey } from "@/constant/common";
import { getUserInfo, removeUserInfo } from "@/services/auth.services";
import { useRouter } from "next/navigation";

const DashboardNabvar = () => {
  const { firstName, lastName } = getUserInfo() as any;

  const router = useRouter();

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  return (
    <div className="flex justify-between items-center gap-3 bg-white shadow-md mb-5 p-2 rounded-md">
      <div>
        <span className="font-extrabold">Welcome,</span>{" "}
        <span>
          {firstName} {lastName}
        </span>
      </div>
      <div>
        <button
          onClick={logOut}
          className="bg-black text-white rounded-lg text-sm p-[4px]"
        >
          logout
        </button>
      </div>
    </div>
  );
};

export default DashboardNabvar;
