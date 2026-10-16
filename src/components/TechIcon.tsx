'use client';

import React from 'react';
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiLaravel,
  SiMongodb,
  SiRedis,
  SiPostgresql,
  SiWordpress,
  SiGit,
  SiGithub,
  SiDocker,
  SiVercel,
  SiNetlify,
  SiFigma,
  SiAmazonwebservices,
  SiBootstrap,
  SiGraphql,
  SiPostman,
} from 'react-icons/si';
import { Code2 } from 'lucide-react';

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
  colored?: boolean;
}

export default function TechIcon({
  name,
  className = 'w-5 h-5',
  size = 20,
  colored = true,
}: TechIconProps) {
  const normalized = name.toLowerCase();

  // Match icon based on normalized name
  if (normalized.includes('next')) {
    return <SiNextdotjs size={size} className={className} aria-label={name} />;
  }
  if (normalized.includes('react')) {
    return (
      <SiReact
        size={size}
        className={`${className} ${colored ? 'text-[#61DAFB]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('typescript') || normalized === 'ts') {
    return (
      <SiTypescript
        size={size}
        className={`${className} ${colored ? 'text-[#3178C6]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('javascript') || normalized === 'js') {
    return (
      <SiJavascript
        size={size}
        className={`${className} ${colored ? 'text-[#F7DF1E]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('tailwind')) {
    return (
      <SiTailwindcss
        size={size}
        className={`${className} ${colored ? 'text-[#06B6D4]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('html')) {
    return (
      <SiHtml5
        size={size}
        className={`${className} ${colored ? 'text-[#E34F26]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('css')) {
    return (
      <SiCss3
        size={size}
        className={`${className} ${colored ? 'text-[#1572B6]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('node')) {
    return (
      <SiNodedotjs
        size={size}
        className={`${className} ${colored ? 'text-[#5FA04E]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('express')) {
    return <SiExpress size={size} className={className} aria-label={name} />;
  }
  if (normalized.includes('php')) {
    return (
      <SiPhp
        size={size}
        className={`${className} ${colored ? 'text-[#777BB4]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('laravel')) {
    return (
      <SiLaravel
        size={size}
        className={`${className} ${colored ? 'text-[#FF2D20]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('mongo')) {
    return (
      <SiMongodb
        size={size}
        className={`${className} ${colored ? 'text-[#47A248]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('redis')) {
    return (
      <SiRedis
        size={size}
        className={`${className} ${colored ? 'text-[#DC382D]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('postgres') || normalized.includes('sql')) {
    return (
      <SiPostgresql
        size={size}
        className={`${className} ${colored ? 'text-[#4169E1]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('wordpress')) {
    return (
      <SiWordpress
        size={size}
        className={`${className} ${colored ? 'text-[#21759B]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('docker')) {
    return (
      <SiDocker
        size={size}
        className={`${className} ${colored ? 'text-[#2496ED]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('github')) {
    return <SiGithub size={size} className={className} aria-label={name} />;
  }
  if (normalized.includes('git')) {
    return (
      <SiGit
        size={size}
        className={`${className} ${colored ? 'text-[#F05032]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('vercel')) {
    return <SiVercel size={size} className={className} aria-label={name} />;
  }
  if (normalized.includes('netlify')) {
    return (
      <SiNetlify
        size={size}
        className={`${className} ${colored ? 'text-[#00C7B7]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('figma')) {
    return (
      <SiFigma
        size={size}
        className={`${className} ${colored ? 'text-[#F24E1E]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('aws') || normalized.includes('amazon')) {
    return (
      <SiAmazonwebservices
        size={size}
        className={`${className} ${colored ? 'text-[#FF9900]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('bootstrap')) {
    return (
      <SiBootstrap
        size={size}
        className={`${className} ${colored ? 'text-[#7952B3]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('graphql')) {
    return (
      <SiGraphql
        size={size}
        className={`${className} ${colored ? 'text-[#E10098]' : ''}`}
        aria-label={name}
      />
    );
  }
  if (normalized.includes('postman') || normalized.includes('api')) {
    return (
      <SiPostman
        size={size}
        className={`${className} ${colored ? 'text-[#FF6C37]' : ''}`}
        aria-label={name}
      />
    );
  }

  // Fallback to Code2 icon with amber styling
  return (
    <Code2
      size={size}
      className={`${className} text-[#FFB020]`}
      aria-label={name}
    />
  );
}
