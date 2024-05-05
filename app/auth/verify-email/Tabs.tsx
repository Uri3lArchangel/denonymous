'use client'
import React, { useEffect, useState } from 'react';
import EmailVerificationComponent from "@/src/FE/components/subcomponents/EmailVerificationComponent";
import { userDataJWTType } from '@/types';

function Tabs({ user }: { user: userDataJWTType }) {
  const [tabActive, setTabActive] = useState<"Verify Email" | "Change Email">("Verify Email");

  useEffect(() => {
    const handleStorageChange = () => {
      // Check for specific storage key that indicates tab change (if applicable)
      if (localStorage.getItem('yourTabStorageKey') === 'changed') {
        setTabActive((prevTab) => (prevTab === 'Verify Email' ? 'Change Email' : 'Verify Email'));
        // Clear the storage key to prevent infinite loops
        localStorage.removeItem('yourTabStorageKey');
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => window.removeEventListener('storage', handleStorageChange);
  }, []); // Empty dependency array to run effect only once

  return (
    <>
      <div className='flex items-center justify-between my-4'>
        <button
          className={`text-lg gradient_elements_text ${
            tabActive === "Verify Email" ? "border-b border-[#ffdf00]" : "opacity-[0.75] border-0"
          }`}
          onClick={() => {
            setTabActive("Verify Email");
            // Optionally store tab change in storage if needed for external communication
            localStorage.setItem('yourTabStorageKey', 'changed');
          }}
        >
          Verify Email
        </button>
        <button
          className={`text-lg gradient_elements_text ${
            tabActive === "Change Email" ? "border-b border-[#ffdf00]" : "opacity-[0.75] border-0"
          }`}
          onClick={() => {
            setTabActive("Change Email");
            // Optionally store tab change in storage if needed for external communication
            localStorage.setItem('yourTabStorageKey', 'changed');
          }}
        >
          Change Email
        </button>
      </div>
      <EmailVerificationComponent tab={tabActive} email={user.email} />
    </>
  );
}

export default Tabs;
