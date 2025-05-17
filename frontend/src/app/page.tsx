import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-full h-dvh flex">
      <div className="landing-leftside bg-[url(/landing-ksrtc-image.jpeg)] bg-center bg-cover bg-no-repeat">
        <div className="mt-10 ml-10 flex gap-5 items-center">
          <Image src="/logo.png" alt="logo" width={100} height={100} />
          <h6 className="text-2xl font-bold">KTRAC</h6>
        </div>
      </div>
      <div className="flex flex-col gap-8 justify-space-around items-center h-full w-1/2">
        <h5 className="text-red-600 text-900 text-[24px] mt-[50px]">Your Gateway to God’s Own Country</h5>
        <div className="flex flex-col items-center gap-8 rounded-md shadow-sm px-12 py-5 pb-10 mt-[100px]">
          <h6 className="text-themeBlue text-2xl font-semibold">Login</h6>
          <form className="flex flex-col gap-3">
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
            <button className="bg-themeBlue py-2 rounded-md text-white mt-5">
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
