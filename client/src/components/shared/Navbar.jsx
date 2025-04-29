import { Popover } from "@radix-ui/react-popover";
import React from "react";
import { Avatar, AvatarImage, } from "../ui/avatar";
import { PopoverTrigger, PopoverContent } from "../ui/popover";
import { Button } from "../ui/button";
import { User2, LogOut } from "lucide-react";


const Navbar = () => {
  const user = false;
  return (
    <div className="bg-white">
      <div className="flex item-centre justify-between mx-auto max-w-7xl h-16">
        <div>
          <h1 className="text-2xl font-bold">
            Intervue<span className="text-[#F83002]">X</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
            </ul>
            {
              !user ? (
                <div className="flex items-center gap-2">
                  <Button variant="outline">Login</Button>
                  <Button className="bg-[#6A38C2] hover:bg-[#5b30a6]">  Signup</Button>
                </div>
              ) : (
               
                <Popover>
              <PopoverTrigger asChild>
                <Avatar className="cursor-pointer">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div>
                <div className="flex gap-4 space-y-2">
                  <Avatar className="cursor-pointer">
                    <AvatarImage src="https://github.com/shadcn.png" />
                  </Avatar>
                  <div>
                    <h4 className="font-medium">Anuj Goyal</h4>
                    <p className="text-sm text-gray-500">anujgoyal@gmail.com</p>
                  </div>
                </div>
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                  <User2/>
                  <Button variant="link">View Profile</Button>
                  </div>
                  <div className="flex w-fit items-center gap-2 cursor-pointer">
                    <LogOut/>
                  <Button variant="link">Logout</Button>
                </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
     
      </div>
    </div>
  );
};
export default Navbar;


