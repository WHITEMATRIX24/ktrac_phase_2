"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.replace("/Dashboard/Revenue");
  };

  return (
    <div className="relative w-full h-dvh flex">
      <div className="landing-leftside bg-[url(/landing-ksrtc-image.jpeg)] bg-center bg-cover bg-no-repeat">
        <div className="mt-10 ml-10 flex gap-5 items-center">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
          <h6 className="text-2xl font-bold">KTRAC</h6>
        </div>
      </div>
      <div className="flex flex-col gap-8 justify-around items-center h-full w-[40%]">
        <h5 className="text-red-600 font-semibold text-[24px] text-center">
          Your Gateway to
          <br />
          God’s Own Country
        </h5>
        <div className="flex flex-col items-center gap-8 rounded-md shadow-sm px-12 py-5 pb-10 w-96">
          <h6 className="text-themeBlue text-2xl font-semibold">Login</h6>
          <form onSubmit={handleLogin} className="flex flex-col gap-3 w-full">
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-themeBlue/70 text-themeBlue text-sm border border-themeBlue/10 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Email"
            />
            <input
              type="text"
              className="w-full bg-transparent placeholder:text-themeBlue/70 text-themeBlue text-sm border border-themeBlue/10 rounded-md px-3 py-2 transition duration-300 ease focus:outline-none focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"
              placeholder="Password"
            />
            <div className=" ps-1 flex gap-1 items-center">
              <input
                id="auth-show-pass"
                type="checkbox"
                className="cursor-pointer"
              />
              <label
                htmlFor="auth-show-pass"
                className="text-[12px] cursor-pointer text-themeBlue/60"
              >
                show password
              </label>
            </div>
            <button
              type="submit"
              className="bg-themeBlue py-2 rounded-md text-white mt-5 cursor-pointer"
            >
              Login
            </button>
          </form>
        </div>
        <p className="text-xs text-gray-400">managed by whitematrix</p>
      </div>
    </div>
  );
}
