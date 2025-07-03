import React, { useState, useEffect } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Autoplay,
  EffectCoverflow,
} from "swiper/modules";
import {
  FaShoppingBag,
  FaUsers,
  FaAward,
  FaShippingFast,
  FaHeart,
  FaGlobe,
  FaStar,
  FaQuoteLeft,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
  FaFacebook,
  FaArrowRight,
  FaCheckCircle,
  FaTruck,
  FaShieldAlt,
  FaClock,
} from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi";
import { BiTargetLock } from "react-icons/bi";
import { MdOutlineEco } from "react-icons/md";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const AboutPage = () => {
  const [activeTab, setActiveTab] = useState("mission");
  const [counters, setCounters] = useState({
    customers: 0,
    products: 0,
    years: 0,
    countries: 0,
  });

  // Animation variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const scaleOnHover = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 },
  };

  // Counter animation
  useEffect(() => {
    const animateCounters = () => {
      const targetValues = {
        customers: 50000,
        products: 10000,
        years: 15,
        countries: 25,
      };
      const duration = 2000;
      const steps = 60;
      const increment = duration / steps;

      let currentStep = 0;
      const timer = setInterval(() => {
        currentStep++;
        const progress = currentStep / steps;

        setCounters({
          customers: Math.floor(targetValues.customers * progress),
          products: Math.floor(targetValues.products * progress),
          years: Math.floor(targetValues.years * progress),
          countries: Math.floor(targetValues.countries * progress),
        });

        if (currentStep >= steps) {
          clearInterval(timer);
          setCounters(targetValues);
        }
      }, increment);

      return () => clearInterval(timer);
    };

    const timer = setTimeout(animateCounters, 500);
    return () => clearTimeout(timer);
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "CEO & Founder",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face",
      bio: "Visionary leader with 15+ years in e-commerce",
      social: { linkedin: "#", twitter: "#", instagram: "#" },
    },
    {
      name: "Michael Chen",
      role: "CTO",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face",
      bio: "Tech innovator passionate about user experience",
      social: { linkedin: "#", twitter: "#", instagram: "#" },
    },
    {
      name: "Emily Rodriguez",
      role: "Head of Design",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face",
      bio: "Creative designer with an eye for beautiful interfaces",
      social: { linkedin: "#", twitter: "#", instagram: "#" },
    },
    {
      name: "David Kim",
      role: "Marketing Director",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face",
      bio: "Growth hacker and brand storytelling expert",
      social: { linkedin: "#", twitter: "#", instagram: "#" },
    },
  ];

  // Testimonials data
  const testimonials = [
    {
      name: "Jessica Williams",
      role: "Happy Customer",
      content:
        "This platform transformed my shopping experience. The quality and service are unmatched!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Mark Thompson",
      role: "Business Owner",
      content:
        "As a seller, I've found the perfect platform to grow my business. Highly recommended!",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
    },
    {
      name: "Anna Garcia",
      role: "Fashion Enthusiast",
      content:
        "The curated collection and fast shipping make this my go-to shopping destination.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
    },
  ];

  // Values data
  const values = [
    {
      icon: <FaHeart className="text-4xl text-primary" />,
      title: "Customer First",
      description: "Every decision we make puts our customers at the center",
    },
    {
      icon: <HiOutlineSparkles className="text-4xl text-secondary" />,
      title: "Innovation",
      description:
        "Constantly pushing boundaries to deliver cutting-edge solutions",
    },
    {
      icon: <FaShieldAlt className="text-4xl text-accent" />,
      title: "Trust & Security",
      description:
        "Your data and transactions are protected with industry-leading security",
    },
    {
      icon: <MdOutlineEco className="text-4xl text-success" />,
      title: "Sustainability",
      description:
        "Committed to environmentally responsible business practices",
    },
  ];

  return (
    <div className="min-h-screen bg-base-100">
      {/* Hero Section */}
      <motion.section
        className="hero min-h-screen bg-gradient-to-br from-primary/10 via-secondary/5 to-accent/10 relative overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content text-center max-w-6xl mx-auto px-4">
          <motion.div
            className="max-w-4xl"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.h1
              className="text-6xl md:text-8xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent mb-6"
              variants={fadeInUp}
              
            >
              Our Story
            </motion.h1>
            <motion.p
              className="text-xl md:text-2xl mb-8 text-base-content/80 leading-relaxed"
              variants={fadeInUp}
            >
              Revolutionizing e-commerce with passion, innovation, and an
              unwavering commitment to excellence
            </motion.p>
            <motion.div
              className="flex flex-wrap justify-center gap-4"
              variants={fadeInUp}
            >
              <motion.button
                className="btn btn-primary btn-lg"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("next-section").scrollIntoView({
                    behavior: "smooth",
                    block: "start",
                  });
                }}
                {...scaleOnHover}
              >
                <FaArrowRight className="mr-2" />
                Discover More
              </motion.button>
              <motion.button
                className="btn btn-outline btn-lg"
                {...scaleOnHover}
                onClick={(e)=> {
                e.preventDefault();
                document.getElementById('meet-team').scrollIntoView({
                  behavior: 'smooth',
                  block: 'start'
                })
              }}
              >
                <FaUsers className="mr-2" />
                Meet Our Team
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Floating Elements */}
        <motion.div
          className="absolute top-20 left-10 text-primary/20"
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <FaShoppingBag className="text-6xl" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-10 text-secondary/20"
          animate={{ y: [10, -10, 10] }}
          transition={{ duration: 4, repeat: Infinity }}
        >
          <FaGlobe className="text-8xl" />
        </motion.div>
      </motion.section>

      {/* Stats Section */}
      <motion.section
        className="py-20 bg-base-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="stat bg-base-100 rounded-xl shadow-lg p-6">
                <div className="stat-figure text-primary">
                  <FaUsers className="text-4xl" />
                </div>
                <div className="stat-title">Happy Customers</div>
                <div className="stat-value text-primary">
                  {counters.customers.toLocaleString()}+
                </div>
              </div>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="stat bg-base-100 rounded-xl shadow-lg p-6">
                <div className="stat-figure text-secondary">
                  <FaShoppingBag className="text-4xl" />
                </div>
                <div className="stat-title">Products Sold</div>
                <div className="stat-value text-secondary">
                  {counters.products.toLocaleString()}+
                </div>
              </div>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="stat bg-base-100 rounded-xl shadow-lg p-6">
                <div className="stat-figure text-accent">
                  <FaAward className="text-4xl" />
                </div>
                <div className="stat-title">Years Experience</div>
                <div className="stat-value text-accent">{counters.years}+</div>
              </div>
            </motion.div>
            <motion.div className="text-center" variants={fadeInUp}>
              <div className="stat bg-base-100 rounded-xl shadow-lg p-6">
                <div className="stat-figure text-success">
                  <FaGlobe className="text-4xl" />
                </div>
                <div className="stat-title">Countries Served</div>
                <div className="stat-value text-success">
                  {counters.countries}+
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Mission, Vision, Values Tabs */}
      <motion.section
        className="py-20 bg-base-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
           id="next-section"
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            {...fadeInUp}
          >
            What Drives Us
          </motion.h2>

          <div className="tabs tabs-boxed justify-center mb-12 bg-base-200 p-2">
            {["mission", "vision", "values"].map((tab) => (
              <button
                key={tab}
                className={`tab tab-lg ${
                  activeTab === tab ? "tab-active" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            {activeTab === "mission" && (
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-6">
                  <BiTargetLock className="text-6xl text-primary" />
                </div>
                <h3 className="text-3xl font-bold mb-6">Our Mission</h3>
                <p className="text-lg leading-relaxed text-base-content/80">
                  To democratize commerce by providing a platform where anyone
                  can buy and sell with confidence. We believe in creating
                  opportunities, fostering connections, and making quality
                  products accessible to everyone, everywhere.
                </p>
              </div>
            )}

            {activeTab === "vision" && (
              <div className="max-w-4xl mx-auto">
                <div className="flex justify-center mb-6">
                  <HiOutlineSparkles className="text-6xl text-secondary" />
                </div>
                <h3 className="text-3xl font-bold mb-6">Our Vision</h3>
                <p className="text-lg leading-relaxed text-base-content/80">
                  To be the world's most trusted and innovative e-commerce
                  platform, where technology meets humanity. We envision a
                  future where shopping is not just transactional, but
                  transformational – creating value for businesses, consumers,
                  and communities alike.
                </p>
              </div>
            )}

            {activeTab === "values" && (
              <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    className="card bg-base-200 shadow-lg p-6 text-center"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex justify-center mb-4">{value.icon}</div>
                    <h4 className="text-xl font-bold mb-2">{value.title}</h4>
                    <p className="text-base-content/70">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </motion.section>

      {/* Team Section */}
      <motion.section
        className="py-20 bg-base-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
          id="meet-team"
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent"
            {...fadeInUp}
          >
            Meet Our Team
          </motion.h2>

          <Swiper
            modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            breakpoints={{
              640: { slidesPerView: 2 },
              768: { slidesPerView: 3 },
              1024: { slidesPerView: 4 },
            }}
            className="team-swiper pb-12"
          >
            {teamMembers.map((member, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="card bg-base-100 shadow-xl"
                  whileHover={{ y: -10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <figure className="px-6 pt-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="rounded-xl w-32 h-32 object-cover mx-auto"
                    />
                  </figure>
                  <div className="card-body text-center">
                    <h3 className="card-title justify-center text-lg">
                      {member.name}
                    </h3>
                    <p className="text-primary font-semibold">{member.role}</p>
                    <p className="text-sm text-base-content/70 mb-4">
                      {member.bio}
                    </p>
                    <div className="flex justify-center gap-3">
                      <a
                        href={member.social.linkedin}
                        className="btn btn-ghost btn-sm btn-circle"
                      >
                        <FaLinkedin className="text-blue-600" />
                      </a>
                      <a
                        href={member.social.twitter}
                        className="btn btn-ghost btn-sm btn-circle"
                      >
                        <FaTwitter className="text-blue-400" />
                      </a>
                      <a
                        href={member.social.instagram}
                        className="btn btn-ghost btn-sm btn-circle"
                      >
                        <FaInstagram className="text-pink-600" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section
        className="py-20 bg-base-100"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-secondary to-accent bg-clip-text text-transparent"
            {...fadeInUp}
          >
            What Our Customers Say
          </motion.h2>

          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000 }}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
            }}
            className="testimonials-swiper pb-12"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <motion.div
                  className="card bg-base-200 shadow-lg h-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="card-body">
                    <FaQuoteLeft className="text-2xl text-primary mb-4" />
                    <p className="text-base-content/80 mb-6 leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center gap-4 mt-auto">
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-base-content/60">
                          {testimonial.role}
                        </p>
                        <div className="flex gap-1 mt-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <FaStar
                              key={i}
                              className="text-yellow-400 text-xs"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-base-200"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 max-w-6xl">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-12 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
            {...fadeInUp}
          >
            Why Choose Us
          </motion.h2>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                icon: <FaTruck />,
                title: "Fast Shipping",
                desc: "Lightning-fast delivery worldwide",
              },
              {
                icon: <FaShieldAlt />,
                title: "Secure Payment",
                desc: "Bank-level security for all transactions",
              },
              {
                icon: <FaClock />,
                title: "24/7 Support",
                desc: "Round-the-clock customer assistance",
              },
              {
                icon: <FaCheckCircle />,
                title: "Quality Guarantee",
                desc: "100% satisfaction or money back",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="card bg-base-100 shadow-lg text-center p-6"
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="text-4xl text-primary mb-4 flex justify-center">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-base-content/70">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-primary via-secondary to-accent text-primary-content"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <motion.h2
            className="text-4xl md:text-5xl font-bold mb-6"
            {...fadeInUp}
          >
            Ready to Start Your Journey?
          </motion.h2>
          <motion.p className="text-xl mb-8 opacity-90" {...fadeInUp}>
            Join thousands of satisfied customers and experience the future of
            e-commerce today
          </motion.p>
          <motion.div
            className="flex flex-wrap justify-center gap-4"
            {...fadeInUp}
          >
            <motion.button
              className="btn btn-lg bg-white text-primary hover:bg-base-100"
              {...scaleOnHover}
            >
              <FaShoppingBag className="mr-2" />
              Start Shopping
            </motion.button>
            <motion.button
              className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary"
              {...scaleOnHover}
            >
              <FaUsers className="mr-2" />
              Join Our Community
            </motion.button>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default AboutPage;
