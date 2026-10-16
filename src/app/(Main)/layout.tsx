import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { getProfileData, getSiteSettingsData } from '@/lib/data';

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [profile, siteSettings] = await Promise.all([
    getProfileData(),
    getSiteSettingsData(),
  ]);

  return (
    <div className="min-h-screen bg-[#0B0D0E] text-[#F7F7F2] flex flex-col relative selection:bg-[#FFB020] selection:text-[#0B0D0E]">
      {/* Warm amber atmospheric lighting orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[54rem] h-[32rem] bg-gradient-to-b from-[#FFB020]/10 via-[#FF8A24]/5 to-transparent rounded-full blur-[140px]" />
        <div className="absolute top-[35%] right-[-10rem] w-[34rem] h-[34rem] bg-[#FFB020]/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-10 left-[-10rem] w-[34rem] h-[34rem] bg-[#E96A16]/5 rounded-full blur-[150px]" />
      </div>

      {/* Refined Navigation Bar */}
      <Navbar
        brandName={profile.name || 'Hussnain Ahmed'}
        resumeUrl={profile.resumeUrl || '/cv/HUSSNAIN-AHMED-CV.pdf'}
      />

      {/* Main page content */}
      <main className="flex-1 pt-24 pb-12 relative z-10 w-full">
        {children}
      </main>

      {/* Unified Branded Footer */}
      <Footer
        brandName={profile.name || 'Hussnain Ahmed'}
        title={profile.title || profile.headline || 'Full-Stack Developer'}
        githubUrl={profile.githubUrl || 'https://github.com/hussnain-143'}
        linkedinUrl={profile.linkedinUrl || 'https://www.linkedin.com/in/hussnain-ahmed143/'}
        twitterUrl={profile.twitterUrl || ''}
        email={profile.email || 'hussnain.ahmed.dev@gmail.com'}
        footerText={siteSettings.footerText}
      />
    </div>
  );
}
