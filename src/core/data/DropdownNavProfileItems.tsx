import { MenuProps } from "antd";
import Link from "next/link";

export const ProfileDropdown: MenuProps['items'] = [
    {
      key: '1',
      theme:'dark',
      label: (
    <Link href="/settings">
    Settings
    </Link>
      ),
    }
,
    {
      key: '2',
      danger: true,
      label:(
        <Link href={"/api/signout"}>Sign out</Link>
      ),
    },
  ];

  export const NavCollapsedMenu: MenuProps['items'] = [
    {
      key: '1',
      label: (
    <Link href="/profile" className="text-xl py-2 px-4">
    Profile
    </Link>
      ),
      children:[
        {
          key:'1-1',
          label:(
            <Link href="/settings">
              Settings
            </Link>
          )
        }
      ]
    
},
    {
      key: '2',
      danger: true,
      label:(
        <Link href={"/api/signout"} className="text-xl py-2 px-4">Sign out</Link>
      ),
    },
  ];

  export const AuthDropdown: MenuProps['items'] = [
    {
      key: '1',
      label: (
    <Link href="/auth/signin" className="text-xl gradient_elements_text border border-[#ffdf00] px-6 py-2 rounded block ">
    Sign in
    </Link>
      ),
    }
,
    {
      key: '2',
      label:(
        <Link href="/auth/signup" className="text-xl gradient_elements_div px-6 py-2 rounded-md block ">Sign up</Link>
      ),
    },
  ];