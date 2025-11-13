import { useSpring, useTrail, animated, config } from '@react-spring/web';
import { useState, useEffect } from 'react';
import { FaHandshake, FaHeart, FaUsers, FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

export default function AnimatedHero() {
  const navigate = useNavigate();
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    setTrigger(true);
  }, []);

  const mainSpring = useSpring({
    from: { opacity: 0, transform: 'translate3d(0, 40px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: config.molasses,
    delay: 200,
  });

  const titleSpring = useSpring({
    from: { opacity: 0, transform: 'translate3d(-60px, 0, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: config.gentle,
    delay: 400,
  });

  const subtitleSpring = useSpring({
    from: { opacity: 0, transform: 'translate3d(60px, 0, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: config.gentle,
    delay: 600,
  });

  const buttonSpring = useSpring({
    from: { opacity: 0, transform: 'scale(0.8)' },
    to: { opacity: 1, transform: 'scale(1)' },
    config: config.wobbly,
    delay: 800,
  });

  const stats = [
    { icon: <FaUsers />, label: 'Active Users', value: '5,000+' },
    { icon: <FaHeart />, label: 'Meals Shared', value: '12,000+' },
    { icon: <FaHandshake />, label: 'Lives Touched', value: '8,500+' },
  ];

  const trail = useTrail(stats.length, {
    from: { opacity: 0, transform: 'translate3d(0, 20px, 0)' },
    to: { opacity: 1, transform: 'translate3d(0, 0, 0)' },
    config: config.default,
    delay: 1000,
  });

  const floatingBox1 = useSpring({
    from: { transform: 'translate3d(0, 0px, 0)', opacity: 0.3 },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translate3d(0, -20px, 0)', opacity: 0.5 });
        await next({ transform: 'translate3d(0, 0px, 0)', opacity: 0.3 });
      }
    },
    config: { duration: 3000 },
  });

  const floatingBox2 = useSpring({
    from: { transform: 'translate3d(0, 0px, 0)', opacity: 0.3 },
    to: async (next) => {
      while (true) {
        await next({ transform: 'translate3d(0, 20px, 0)', opacity: 0.5 });
        await next({ transform: 'translate3d(0, 0px, 0)', opacity: 0.3 });
      }
    },
    config: { duration: 3500 },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl"></div>
      </div>

      <animated.div
        style={floatingBox1}
        className="absolute top-40 left-10 w-32 h-32 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-3xl border border-orange-500/20 backdrop-blur-sm hidden md:block"
      ></animated.div>

      <animated.div
        style={floatingBox2}
        className="absolute bottom-40 right-10 w-40 h-40 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-3xl border border-yellow-500/20 backdrop-blur-sm hidden md:block"
      ></animated.div>

      <animated.div style={mainSpring} className="relative max-w-6xl mx-auto px-4 py-20 md:py-32">
        <div className="text-center space-y-8">
          <animated.div style={titleSpring} className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-tight">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500">
                Share Food
              </span>
              <br />
              <span className="text-white">Change Lives Together</span>
            </h1>
          </animated.div>

          <animated.div style={subtitleSpring} className="space-y-4">
            <p className="text-lg sm:text-xl md:text-2xl text-gray-300 leading-relaxed max-w-3xl mx-auto">
              Join our community and make a difference. Share your extra food with those in need and build a stronger, more compassionate society.
            </p>
          </animated.div>

          <animated.div style={buttonSpring} className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-6">
            <button
              onClick={() => navigate('/available-foods')}
              className="group relative px-8 sm:px-10 py-4 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-bold text-base sm:text-lg shadow-2xl hover:shadow-orange-500/50 transition-all duration-300 hover:scale-110 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 justify-center">
                Explore Foods
                <FaArrowRight className="transform group-hover:translate-x-2 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <button
              onClick={() => navigate('/add-food')}
              className="px-8 sm:px-10 py-4 rounded-full border-2 border-orange-400 text-orange-400 font-bold text-base sm:text-lg hover:bg-orange-400/10 transition-all duration-300 hover:scale-110"
            >
              Share Food
            </button>
          </animated.div>
        </div>

        <animated.div className="mt-20 md:mt-32 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          {trail.map((style, index) => (
            <animated.div
              key={index}
              style={style}
              className="group relative p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-orange-500/20 backdrop-blur-xl hover:border-orange-500/50 transition-all duration-300 hover:scale-105 cursor-pointer"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-yellow-500/0 group-hover:from-orange-500/10 group-hover:via-orange-500/5 group-hover:to-yellow-500/10 rounded-2xl transition-all duration-300"></div>

              <div className="relative z-10 text-center space-y-3">
                <div className="w-14 h-14 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                  {stats[index].icon}
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                  {stats[index].value}
                </h3>
                <p className="text-gray-400 text-sm sm:text-base">{stats[index].label}</p>
              </div>
            </animated.div>
          ))}
        </animated.div>

        <animated.div
          style={{
            opacity: mainSpring.opacity,
            transform: mainSpring.transform,
          }}
          className="mt-16 md:mt-24 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-orange-500/10 via-yellow-500/10 to-orange-500/10 border border-orange-500/30 backdrop-blur-xl text-center"
        >
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-white">How PlateShare Works</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center font-bold text-lg">1</div>
              <p className="text-gray-300">Post your extra food</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center font-bold text-lg">2</div>
              <p className="text-gray-300">Get requests from users</p>
            </div>
            <div className="space-y-2">
              <div className="w-10 h-10 mx-auto rounded-full bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center font-bold text-lg">3</div>
              <p className="text-gray-300">Make an impact together</p>
            </div>
          </div>
        </animated.div>
      </animated.div>
    </div>
  );
}