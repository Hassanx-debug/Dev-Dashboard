import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { usePortfolio } from "../context/PortfolioContext";
import ParticleField from "../components/three/ParticleField";
import Cursor from "../components/ui/Cursor";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import Hero from "../components/sections/Hero";
import About from "../components/sections/About";
import Skills from "../components/sections/Skills";
import Projects from "../components/sections/Projects";
import Experience from "../components/sections/Experience";
import Certifications from "../components/sections/Certifications";
import Services from "../components/sections/Services";
import Testimonials from "../components/sections/Testimonials";
import Blog from "../components/sections/Blog";
import OpenTo from "../components/sections/OpenTo";
import Contact from "../components/sections/Contact";
import Resume from "../components/sections/Resume";
import AdminToolbar from "../components/admin/AdminToolbar";

export default function Portfolio() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAdmin } = useAuth();
  const { dispatch } = usePortfolio();

  const isAdminRoute = location.pathname.startsWith("/admin");

  // Validate admin auth on /admin route
  useEffect(() => {
    if (isAdminRoute && !isAdmin) {
      navigate("/");
    }
  }, [isAdminRoute, isAdmin, navigate]);

  // Telemetry: track section views on scroll intersection
  const sectionRefs = {
    hero: useRef(null),
    about: useRef(null),
    skills: useRef(null),
    projects: useRef(null),
    experience: useRef(null),
    certifications: useRef(null),
    services: useRef(null),
    testimonials: useRef(null),
    blog: useRef(null),
    availability: useRef(null),
    contact: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            dispatch({
              type: "TRACK_SECTION_VIEW",
              section: entry.target.id,
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleOpenDashboard = () => {
    navigate("/admin/dashboard");
  };

  return (
    <>
      <ParticleField />
      <Cursor />
      <Navbar />

      <main className="relative z-10">
        <div ref={sectionRefs.hero} id="hero"><Hero /></div>
        <div ref={sectionRefs.about} id="about"><About /></div>
        <div ref={sectionRefs.skills} id="skills"><Skills /></div>
        <div ref={sectionRefs.projects} id="projects"><Projects /></div>
        <div ref={sectionRefs.experience} id="experience"><Experience /></div>
        <div ref={sectionRefs.certifications} id="certifications"><Certifications /></div>
        <div ref={sectionRefs.services} id="services"><Services /></div>
        <div ref={sectionRefs.testimonials} id="testimonials"><Testimonials /></div>
        <div ref={sectionRefs.blog} id="blog"><Blog /></div>
        <div ref={sectionRefs.availability} id="availability"><OpenTo /></div>
        <div ref={sectionRefs.contact} id="contact"><Contact /></div>
        <div id="resume"><Resume /></div>
      </main>

      <Footer />

      {/* Admin Floating Control Dashboard Bar */}
      {isAdminRoute && isAdmin && (
        <AdminToolbar onOpenDashboard={handleOpenDashboard} />
      )}
    </>
  );
}