import { useState, useEffect } from 'react';
import { Sparkles, ChevronDown, Menu, X } from 'lucide-react';

// Main component
export default function AnimatedLandingPage() {
  const [scrollY, setScrollY] = useState(0);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-950 text-white overflow-hidden">
      {/* Mobile menu */}
      <div className="fixed top-0 left-0 right-0 z-50">
        <nav className="flex justify-between items-center p-6">
          <div className="flex items-center">
            <span className="text-2xl font-bold">NOVA</span>
          </div>
          
          <div className="md:hidden">
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-white"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Products</a>
            <a href="#" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </nav>
        
        {isMenuOpen && (
          <div className="md:hidden bg-black bg-opacity-95 p-6 flex flex-col space-y-4">
            <a href="#" className="hover:text-purple-400 transition-colors">Home</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Products</a>
            <a href="#" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
        )}
      </div>

      {/* Hero section with parallax effect */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 overflow-hidden">
        {/* Animated background stars */}
        <AnimatedStars />
        
        {/* Floating elements */}
        <div
          className="absolute"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <div className="relative">
            <div className="absolute -top-24 -left-24 w-32 h-32 bg-purple-600 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute top-20 -right-20 w-40 h-40 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>

        {/* Main heading with parallax effect */}
        <div 
          className="relative z-10 text-center"
          style={{
            transform: `translateY(${-scrollY * 0.5}px)`,
            transition: 'transform 0.1s ease-out',
          }}
        >
          <h1 className="mb-6 text-6xl font-bold tracking-tight">
            <span className="inline-block relative">
              The Future
              <FloatingSparkle top="-10px" right="-20px" delay="0s" />
            </span>
            <br />
            <span className="inline-block relative bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
              Is Now
              <FloatingSparkle top="0px" right="-30px" delay="1.5s" />
            </span>
          </h1>
          
          {/* Animated 3D Image in the middle */}
          <div className="relative w-64 h-64 mx-auto my-8">
            <AnimatedImageContainer />
          </div>
          
          <p className="mb-8 max-w-lg mx-auto text-gray-300 text-lg">
            Experience the next generation of digital innovation with our cutting-edge solutions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center justify-center group">
              Get Started
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <button className="px-8 py-3 border border-white border-opacity-30 rounded-full font-medium hover:bg-white hover:bg-opacity-10 transition-all">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center items-center animate-bounce">
          <ChevronDown size={24} />
        </div>
      </section>
      
      {/* Content section */}
      <section className="max-w-6xl mx-auto p-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Revolutionary Technology</h2>
            <p className="text-gray-300 mb-6">
              Our platform leverages cutting-edge AI and machine learning to deliver unparalleled performance and results. 
              Experience the power of next-generation technology.
            </p>
            <ul className="space-y-2">
              {["Advanced AI", "Cloud Integration", "Real-time Analytics"].map((feature, i) => (
                <li key={i} className="flex items-center">
                  <span className="mr-2 text-purple-400">✓</span> {feature}
                </li>
              ))}
            </ul>
          </div>
          
          <div className="relative">
            <div className="w-full h-64 md:h-80 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
              <div className="absolute inset-0 bg-black bg-opacity-30 backdrop-blur-sm rounded-lg" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full bg-white bg-opacity-10 flex items-center justify-center backdrop-blur-md relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-500 opacity-40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles size={32} />
                  </div>
                </div>
              </div>
            </div>
            
            <FloatingGlow />
          </div>
        </div>
      </section>
    </div>
  );
}

// Custom components
function AnimatedStars() {
  return (
    <div className="absolute inset-0">
      {[...Array(50)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-1 h-1 bg-white rounded-full"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.7 + 0.3,
            animation: `twinkle ${Math.random() * 5 + 3}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`
          }}
        />
      ))}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

function AnimatedImageContainer() {
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Effect to handle automatic gentle floating rotation
  useEffect(() => {
    let animationFrame;
    let angle = 0;
    
    const animate = () => {
      if (!isHovered) {
        angle += 0.005;
        setRotation({
          x: Math.sin(angle) * 10,
          y: Math.cos(angle) * 10
        });
      }
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  // Mouse move handler for 3D tilt effect
  const handleMouseMove = (e) => {
    if (!isHovered) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate rotation based on mouse position
    setRotation({
      x: -mouseY / 10,
      y: mouseX / 10
    });
  };

  return (
    <div
      className="relative w-full h-full perspective-1000"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Glow effects */}
      <div className="absolute inset-0 blur-xl">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-purple-500 rounded-full opacity-30 animate-pulse" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-blue-500 rounded-full opacity-30 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
      
      {/* 3D rotating container */}
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
          transition: isHovered ? 'none' : 'transform 0.05s ease-out',
        }}
      >
        {/* Product image with layered effect */}
        <div className="relative w-48 h-48">
          {/* Base product image */}
          <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl">
            <img 
              src="/fanta.jpg" 
              alt="Product" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" />
          </div>
          
          {/* Floating overlay elements */}
          <div className="absolute -right-4 -top-4 w-16 h-16 bg-purple-600 bg-opacity-50 rounded-full blur-md animate-float-slow" />
          <div className="absolute -left-4 -bottom-4 w-12 h-12 bg-blue-600 bg-opacity-50 rounded-full blur-md animate-float-medium" />
          
          {/* Particle effects */}
          <div className="absolute inset-0">
            {[...Array(10)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animation: `float-particle ${Math.random() * 3 + 3}s linear infinite`,
                  animationDelay: `${Math.random() * 2}s`
                }}
              />
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        @keyframes float-particle {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateY(-20px) translateX(${Math.random() * 10 - 5}px); opacity: 0; }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-medium {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }
      `}</style>
    </div>
  );
}

function FloatingSparkle({ top, right, delay }) {
  return (
    <div 
      className="absolute w-3 h-3 bg-purple-400 rounded-full opacity-70"
      style={{
        top,
        right,
        animation: 'float 4s ease-in-out infinite',
        animationDelay: delay
      }}
    >
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}

function FloatingGlow() {
  return (
    <div className="absolute -inset-4 -z-10">
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-600 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }} />
    </div>
  );
}