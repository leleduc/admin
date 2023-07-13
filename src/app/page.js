'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import Image from 'next/image';

export default function Home() {
  const session = useSession();
  // console.log(session);
  // console.log(session?.data?.user?.image);
  // if (session.status === 'authenticated') {
  //   return (
  //     <>
  //       Signed in as {session.data.user.email} <br />
  //       <button
  //         className="bg-white p-2 px-4 rounded-lg"
  //         onClick={() => signOut()}
  //       >
  //         Sign out
  //       </button>
  //     </>
  //   );
  // }

  // return (
  //   <>
  //     <button
  //       className="bg-white p-2 px-4 rounded-lg"
  //       onClick={() => signIn('google')}
  //     >
  //       Login with Google
  //     </button>
  //   </>
  // );

  return (
    <div className="text-blue-900 flex justify-between">
      <h2>
        Hello, <b> {session?.data?.user.name}</b>
      </h2>
      <div className="flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden">
        <Image src={session?.data?.user.image} width={30} height={30} alt="" />
        <span className="py-1 px-2">{session?.data?.user.name}</span>
      </div>
    </div>
  );
}
