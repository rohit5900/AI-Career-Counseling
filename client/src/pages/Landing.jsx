import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import HowToUse from '../components/HowToUse';
import SystemStatus from '../components/SystemStatus';
import TargetAudience from '../components/TargetAudience';
import DemoPreview from '../components/DemoPreview';
import SystemInfo from '../components/SystemInfo';
import TrustSection from '../components/TrustSection';

const Landing = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustSection />
      <SystemStatus />
      <TargetAudience />
      <DemoPreview />
      <HowToUse />
      <About />
      <SystemInfo />
    </>
  );
};

export default Landing;
