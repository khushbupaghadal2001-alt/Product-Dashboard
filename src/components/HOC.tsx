import { LuMessageCircleMore } from "react-icons/lu";
import logo from "../assets/logo.png";
import { Input } from "./ui/input";
import { IoIosNotificationsOutline } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const HOC = (Component: any) => {
  const newComponnet = () => {
    return (
      <>
        <div className="bg-gray-300 flex">
          <div className="w-2/12 border-r border-gray-400">
            <img src={logo} alt="logo" width={200} height={200} />
          </div>
          <div className="w-10/12">
            <div className="h-16 flex justify-between items-center border-b border-gray-400 px-[10px]">
              <div>
                <Input
                  placeholder="Search..."
                  className="border border-gray-400"
                />
              </div>
              <div className="flex justify-center items-center gap-2">
                <span className="w-[32px] h-[32px] flex justify-center items-center border border-gray-400 rounded-full cursor-pointer">
                  <LuMessageCircleMore />
                </span>
                <span className="w-[32px] h-[32px] flex justify-center items-center border border-gray-400 rounded-full cursor-pointer">
                  <IoIosNotificationsOutline />
                </span>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </div>
            </div>
            <div className="p-2.5 overflow-auto h-[calc(100vh-64px)]">
              <Component />
            </div>
          </div>
        </div>
      </>
    );
  };
  return newComponnet;
};
