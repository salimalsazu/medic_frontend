"use client";
import Image from "next/image";
import React, { useState } from "react";
import Logo from "/public//assists/logo_Asset-1-1.png";
import Link from "next/link";
import { INavbarType } from "@/types/NavbarType";
import NavbarMenu from "./NavbarMenu";
import { PhoneTwoTone } from "@ant-design/icons";
import { AppstoreOutlined } from "@ant-design/icons";
import { Drawer } from "antd";
import AddToCart from "../addToCart/AddToCart";
import { getUserInfo, removeUserInfo } from "@/services/auth.services";
import { useRouter } from "next/navigation";
import { authKey } from "@/constant/common";

const Navbar = () => {
  const { firstName, lastName, userId, profileId, email, role } =
    getUserInfo() as any;

  const router = useRouter();

  const [open, setOpen] = useState<boolean>(false);
  const [addToCart, setAddToCart] = useState<boolean>(false);

  const user = {
    name: "John Doe",
    email: "masud",
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const NavbarData: INavbarType[] = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Service",
      link: "/service",
    },
    {
      name: "Feedback",
      link: "/feedback",
    },
  ];

  const logOut = () => {
    removeUserInfo(authKey);
    router.push("/login");
  };

  return (
    <div className="py-[16px] border-b-2 borderColor common flex gap-3 items-center justify-between w-full bg-white text-black">
      {/* logo */}
      <Link href={"/"} className="md:w-full">
        {/* <Image
          src={Logo}
          alt=""
          width={130}
          height={284}
          className="md:w-[130px] md:h-[54px] w-[100px] h-[51px]"
        /> */}
        <p className="font-extrabold text-2xl animate-bounce">Uttara Medic.</p>
        <p className="text-xs text-gray-600">Your satisfaction is our value</p>
      </Link>
      {/* NavData */}
      <div className="md:flex hidden gap-5 w-full justify-between px-[50px]">
        {NavbarData?.map((nav: INavbarType, i: number) => (
          <NavbarMenu key={i} navbarData={nav} />
        ))}
      </div>

      {/* appoinment */}

      <div className="flex gap-5 items-center w-full justify-end  ">
        {/* button and drower */}
        <>
          <button
            onClick={showDrawer}
            className="block md:hidden text-[32px] border rounded-lg "
          >
            <AppstoreOutlined />
          </button>

          <Drawer
            title="Menu"
            placement="right"
            onClose={onClose}
            open={open}
            className="text-[20px] text-center"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
            }}
          >
            {NavbarData?.map((nav: INavbarType, i: number) => (
              <p key={i} className="text-[20px] my-[20px]">
                name
              </p>
            ))}
          </Drawer>
        </>

        {/* user */}

        {userId && profileId ? (
          <div className="flex items-center justify-center z-50 ">
            <div className=" relative inline-block text-left dropdown">
              <span className="rounded-md shadow-sm">
                <button
                  className="inline-flex justify-center w-full  text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out  rounded-md hover:text-gray-500 "
                  type="button"
                  aria-haspopup="true"
                  aria-expanded="true"
                  aria-controls="headlessui-menu-items-117"
                >
                  <Image
                    className="inline-block h-10 w-10 rounded-full ring-2 ring-white"
                    src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    width={100}
                    height={100}
                  />
                </button>
              </span>
              <div className="opacity-0 invisible dropdown-menu transition-all duration-300 transform origin-top-right -translate-y-2 scale-95">
                <div
                  className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                  aria-labelledby="headlessui-menu-button-1"
                  id="headlessui-menu-items-117"
                  role="menu"
                >
                  <div className="px-4 py-3">
                    <p className="text-sm leading-5">Signed in as</p>
                    <p className="text-sm font-medium leading-5 text-gray-900 truncate">
                      {email} <br /> ({firstName} {lastName})
                    </p>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/profile"
                      className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                      role="menuitem"
                    >
                      Profile Settings
                    </Link>
                    <Link
                      href="/dashboard"
                      className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                      role="menuitem"
                    >
                      Dashboard
                    </Link>
                    <button
                      onClick={() => setAddToCart(true)}
                      className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                      role="menuitem"
                    >
                      Add To Cart
                    </button>
                    <span
                      role="menuitem"
                      className="flex justify-between w-full px-4 py-2 text-sm leading-5 text-left text-gray-700 cursor-not-allowed opacity-50"
                      aria-disabled="true"
                    >
                      New feature (soon)
                    </span>
                  </div>
                  <div className="py-1">
                    <button
                      onClick={logOut}
                      className="text-gray-700 flex justify-between w-full px-4 py-2 text-sm leading-5 text-left"
                      role="menuitem"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Link href={"/login"}>
            <div className="relative inline-flex  group">
              <div className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-lg group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt"></div>
              <a
                href="#"
                title="Get quote now"
                className="relative inline-flex items-center justify-center px-4 py-2 text-lg  text-white transition-all duration-200 bg-gray-700 font-pj rounded-xl "
                role="button"
              >
                Login
              </a>
            </div>
          </Link>
        )}
      </div>

      {addToCart && <AddToCart open={addToCart} setOpen={setAddToCart} />}
    </div>
  );
};

export default Navbar;
