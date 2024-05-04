import { TooltipApp } from "@/src/FE/components/libraries/antd";
import Signout from "@/src/FE/components/subcomponents/Signout";
import { MenuProps } from "antd";
import Link from "next/link";

export const ProfileDropdown: MenuProps["items"] = [
  //     {
  //       key: '1',
  //       label: (
  //     <Link className="gradient_elements_ px-6 py-2 rounded-md" href="/dashboard">
  //     Settings
  //     </Link>
  //       ),
  //     }
  // ,
  {
    key: "1",
    label: (
      <Link
        className="gradient_elements_div px-6 py-2 rounded-md mb-2 block"
        href="/settings"
      >
        Settings
      </Link>
    ),
  },
  {
    key: "2",
    label: (
   <Signout />
    ),
  },
];

export const NavCollapsedMenu: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <Link href="/profile" className="text-xl py-2 px-4">
        Profile
      </Link>
    ),
    children: [
      {
        key: "1-1",
        label: (
          <Link className="text-white" href="/settings">
            Settings
          </Link>
        ),
      },
    ],
  },
  {
    key: "2",
    danger: true,
    label: (
    <Signout />
    ),
  },
];

export const AuthDropdown: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <div className="navlinks">
        <Link href="/" className="mx-2 text-[1.05em] lg:mx-4 text-[#fffb] gradient_elements_text">
          Home
        </Link>
      </div>
    ),
  },
  {
    key: "2",
    label: (
      <div className="navlinks">
        <Link href="/dashboard" className="mx-2 text-[1.05em] lg:mx-4 text-[#fffb]  gradient_elements_text">
          Dashboard
        </Link>
      </div>
    ),
  },
  {
    key: "3",
    label: (
      <div className="navlinks">
        <TooltipApp text="" title="Premium feature coming soon!">
          <Link
            aria-disabled
            href=""
            className="mx-2 text-[1.05em] lg:mx-4 cursor-not-allowed opacity-[0.8] gradient_elements_text"
          >
            Premium
          </Link>
        </TooltipApp>
      </div>
    ),
  },
  {
    key: "4",
    label: (
      <Link
        href="/auth/signin"
        className="text-[1.05em] gradient_elements_text border border-[#ffdf00] px-6 py-2 rounded block "
      >
        Sign in
      </Link>
    ),
  },
  {
    key: "5",
    label: (
      <Link
        href="/auth/signup"
        className="text-[1.05em] gradient_elements_div px-6 py-2 rounded-md block "
      >
        Sign up
      </Link>
    ),
  },
];

export const navPages: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <Link
        href="/"
        className="text-[1.05em] gradient_elements_text underline sm:text-lg px-6 py-2 text-center rounded block "
      >
        Home
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link
        href="/dashboard"
        className="text-[1.05em] gradient_elements_text px-6 py-2 underline sm:text-lg text-center rounded-md block "
      >
        Dashboard
      </Link>
    ),
  },
  {
    key: "3",
    label: (
      <TooltipApp text='' title='Premium feature coming soon!'>

      <Link
        href=""
        className="text-[1.05em] gradient_elements_text px-6 py-2 rounded-md block underline sm:text-lg text-center cursor-not-allowed opacity-[0.7]"
      >
        Premium
      </Link>
      </TooltipApp>
    ),
  },
];
