import React from 'react';
import { getProfileData } from '@/lib/data';
import ContactForm from '@/components/ContactForm';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

import { constructMetadata } from '@/lib/seo';

export const metadata = constructMetadata({
  title: 'Contact Hussnain Ahmed — Full-Stack Developer Inquiries',
  description:
    'Get in touch with Hussnain Ahmed for freelance projects, remote web development positions, and full-stack engineering collaborations.',
  path: '/contact',
});

export default async function ContactPage() {
  const profile = await getProfileData();

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
      <div>
        <span className="text-xs font-mono-code uppercase tracking-wider text-[#FFB020]">
          Get In Touch
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#F7F7F2] font-['Outfit'] tracking-tight mt-1">
          Let's Start a Conversation
        </h1>
        <p className="text-sm text-[#A7ADB2] mt-2 max-w-xl">
          Whether you need a full-stack Next.js web application, e-commerce storefront, or custom backend services, I'm available to collaborate.
        </p>
      </div>

      {/* Contact Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <a
          href={`mailto:${profile.email}`}
          className="p-6 rounded-3xl bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/50 transition-all flex flex-col justify-between space-y-4 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#FFB020]/15 text-[#FFB020] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Mail className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#737B82] font-mono-code uppercase tracking-wider">Email</div>
            <div className="text-xs font-semibold text-[#F7F7F2] mt-0.5 truncate group-hover:text-[#FFD43B] transition-colors">
              {profile.email}
            </div>
          </div>
        </a>

        <a
          href={`tel:${(profile.phone || '').replace(/[^0-9+]/g, '')}`}
          className="p-6 rounded-3xl bg-[#171A1C] border border-[#2B3033] hover:border-[#FFB020]/50 transition-all flex flex-col justify-between space-y-4 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-[#FF8A24]/15 text-[#FF8A24] flex items-center justify-center group-hover:scale-110 transition-transform">
            <Phone className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#737B82] font-mono-code uppercase tracking-wider">Phone</div>
            <div className="text-xs font-semibold text-[#F7F7F2] mt-0.5 group-hover:text-[#FFD43B] transition-colors">
              {profile.phone || '+92 300 0000000'}
            </div>
          </div>
        </a>

        <div className="p-6 rounded-3xl bg-[#171A1C] border border-[#2B3033] flex flex-col justify-between space-y-4">
          <div className="w-10 h-10 rounded-2xl bg-[#FFD43B]/15 text-[#FFD43B] flex items-center justify-center">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <div className="text-xs text-[#737B82] font-mono-code uppercase tracking-wider">Location</div>
            <div className="text-xs font-semibold text-[#F7F7F2] mt-0.5">
              {profile.location}
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Contact Form */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-[#F7F7F2] font-['Outfit'] flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-[#FFB020]" />
          <span>Send a Direct Message</span>
        </h2>

        <ContactForm />
      </div>
    </div>
  );
}
