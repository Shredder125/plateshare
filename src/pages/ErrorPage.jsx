import { Link } from "react-router-dom";

export default function ErrorPage() {
  return (
    <div className="relative flex flex-col items-center justify-center h-screen overflow-hidden bg-gray-950 text-center">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-700 via-purple-600 to-pink-600 opacity-30 blur-3xl animate-pulse-bg"></div>
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-500 rounded-full opacity-50 animate-pulse-bg"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>
      <div className="z-10">
        <h1 className="text-[8rem] md:text-[12rem] font-extrabold text-white animate-glitch">
          404
        </h1>
        <h2 className="text-3xl md:text-4xl text-blue-400 font-bold tracking-widest mb-4 animate-pulse-bg">
          PAGE NOT FOUND
        </h2>
        <p className="text-gray-300 text-lg mb-8">
          Looks like you took a wrong turn in the matrix.
        </p>
        <Link
          to="/"
          className="px-8 py-3 text-lg font-semibold text-white bg-blue-600 rounded-xl shadow-lg hover:bg-blue-500 transition transform hover:scale-105 hover:shadow-blue-400/50"
        >
          Go Back Home
        </Link>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-[4px] bg-gradient-to-r from-blue-600 via-cyan-400 to-blue-600 animate-pulse-bg" />
    </div>
  );
}
