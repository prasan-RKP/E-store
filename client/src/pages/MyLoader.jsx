import React from "react";
import { Loader } from "lucide-react";
import { motion } from "framer-motion";

const MyLoader = () => {
  return (
    // loader 1
    <div className="flex justify-center items-center h-screen bg-black">
      <div className="flex space-x-2 text-white text-4xl font-bold">
        {["L", "U", "X", "E"].map((letter, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.2,
              repeat: Infinity,
              repeatType: "mirror",
            }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </div>

    //loader2
//     <div className="flex flex-col items-center justify-center h-screen bg-black">
//   <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
//   <p className="mt-4 text-indigo-400 font-bold text-xl tracking-widest">LUXE</p>
// </div>

  /// loader 3

//   <div className="flex justify-center items-center h-screen bg-[#0f0f0f]">
//   <h1 className="text-4xl font-bold text-white relative shimmer-text">LUXE</h1>
// </div>

//loader 4

// <div className="flex justify-center items-center min-h-screen bg-black text-black">
    //   <svg height={0} width={0} viewBox="0 0 64 64" className="absolute">
    //     <defs>
    //       <linearGradient gradientUnits="userSpaceOnUse" y2={2} x2={0} y1={62} x1={0} id="b">
    //         <stop stopColor="#000000" />
    //         <stop stopColor="#666666" offset={1} />
    //       </linearGradient>
    //       <linearGradient gradientUnits="userSpaceOnUse" y2={0} x2={0} y1={64} x1={0} id="c">
    //         <stop stopColor="#FFFFFF" />
    //         <stop stopColor="#CCCCCC" offset={1} />
    //         <animateTransform
    //           repeatCount="indefinite"
    //           keySplines=".42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1;.42,0,.58,1"
    //           keyTimes="0; 0.125; 0.25; 0.375; 0.5; 0.625; 0.75; 0.875; 1"
    //           dur="8s"
    //           values="0 32 32;-270 32 32;-270 32 32;-540 32 32;-540 32 32;-810 32 32;-810 32 32;-1080 32 32;-1080 32 32"
    //           type="rotate"
    //           attributeName="gradientTransform"
    //         />
    //       </linearGradient>
    //       <linearGradient gradientUnits="userSpaceOnUse" y2={2} x2={0} y1={62} x1={0} id="d">
    //         <stop stopColor="#111111" />
    //         <stop stopColor="#777777" offset={1} />
    //       </linearGradient>
    //     </defs>
    //   </svg>

    //   <div className="flex gap-4">
    //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height={64} width={64}
    //       className="inline-block animate-[dashArray_2s_ease-in-out_infinite,dashOffset_2s_linear_infinite]">
    //       <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={8} stroke="url(#b)"
    //         d="M 54.722656,3.9726563 A 2.0002,2.0002 0 0 0 54.941406,4 h 5.007813 C 58.955121,17.046124 49.099667,27.677057 36.121094,29.580078 a 2.0002,2.0002 0 0 0 -1.708985,1.978516 V 60 H 29.587891 V 31.558594 A 2.0002,2.0002 0 0 0 27.878906,29.580078 C 14.900333,27.677057 5.0448787,17.046124 4.0507812,4 H 9.28125 c 1.231666,11.63657 10.984383,20.554048 22.6875,20.734375 a 2.0002,2.0002 0 0 0 0.02344,0 c 11.806958,0.04283 21.70649,-9.003371 22.730469,-20.7617187 z"
    //         pathLength={360} />
    //     </svg>

    //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height={64} width={64}
    //       className="inline-block animate-[spinDashArray_2s_ease-in-out_infinite,spin_8s_ease-in-out_infinite,dashOffset_2s_linear_infinite] origin-center">
    //       <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={10} stroke="url(#c)"
    //         d="M 32 32 m 0 -27 a 27 27 0 1 1 0 54 a 27 27 0 1 1 0 -54"
    //         pathLength={360} />
    //     </svg>

    //     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 64 64" height={64} width={64}
    //       className="inline-block animate-[dashArray_2s_ease-in-out_infinite,dashOffset_2s_linear_infinite]">
    //       <path strokeLinejoin="round" strokeLinecap="round" strokeWidth={8} stroke="url(#d)"
    //         d="M 4,4 h 4.6230469 v 25.919922 c -0.00276,11.916203 9.8364941,21.550422 21.7500001,21.296875 11.616666,-0.240651 21.014356,-9.63894 21.253906,-21.25586 a 2.0002,2.0002 0 0 0 0,-0.04102 V 4 H 56.25 v 25.919922 c 0,14.33873 -11.581192,25.919922 -25.919922,25.919922 a 2.0002,2.0002 0 0 0 -0.0293,0 C 15.812309,56.052941 3.998433,44.409961 4,29.919922 Z"
    //         pathLength={360} />
    //     </svg>
    //   </div>

    //   <style>{`
    //     @keyframes dashArray {
    //       0% { stroke-dasharray: 0 1 359 0; }
    //       50% { stroke-dasharray: 0 359 1 0; }
    //       100% { stroke-dasharray: 359 1 0 0; }
    //     }
    //     @keyframes spinDashArray {
    //       0% { stroke-dasharray: 270 90; }
    //       50% { stroke-dasharray: 0 360; }
    //       100% { stroke-dasharray: 270 90; }
    //     }
    //     @keyframes dashOffset {
    //       0% { stroke-dashoffset: 365; }
    //       100% { stroke-dashoffset: 5; }
    //     }
    //     @keyframes spin {
    //       0% { rotate: 0deg; }
    //       12.5%, 25% { rotate: 270deg; }
    //       37.5%, 50% { rotate: 540deg; }
    //       62.5%, 75% { rotate: 810deg; }
    //       87.5%, 100% { rotate: 1080deg; }
    //     }
    //   `}</style>
    // </div>







  );
};

export default MyLoader;
