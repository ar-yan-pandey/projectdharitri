'use client';

import { useState } from 'react';
import { FaLinkedin, FaInstagram } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio: string;
  linkedin?: string;
  instagram?: string;
}

const team: TeamMember[] = [
  {
    name: 'Soham Dey',
    role: 'Lead Actionist',
    image: '/team/placeholder.png',
    bio: 'Leading the team with innovation and dedication to revolutionize cattle healthcare.',
    linkedin: '#',
    instagram: '#'
  },
  {
    name: 'Palak Karn',
    role: 'Actionist',
    image: '/team/placeholder.png',
    bio: 'Passionate about creating impactful solutions for agricultural communities.',
    linkedin: '#',
    instagram: '#'
  },
  {
    name: 'Suparna Raha',
    role: 'Actionist',
    image: '/team/placeholder.png',
    bio: 'Dedicated to improving animal welfare through technology.',
    linkedin: '#',
    instagram: '#'
  },
  {
    name: 'Sudip Debnath',
    role: 'Actionist',
    image: '/team/placeholder.png',
    bio: 'Bringing innovative ideas to transform traditional farming practices.',
    linkedin: '#',
    instagram: '#'
  },
  {
    name: 'Paree Bagla',
    role: 'Actionist',
    image: '/team/placeholder.png',
    bio: 'Focused on creating sustainable solutions for farmers.',
    linkedin: '#',
    instagram: '#'
  },
  {
    name: 'Aryan Raj',
    role: 'Actionist',
    image: '/team/placeholder.png',
    bio: 'Working towards bridging technology and agriculture.',
    linkedin: '#',
    instagram: '#'
  },
  {
    name: 'Sagnik Sarkar',
    role: 'Actionist',
    image: '/team/placeholder.png',
    bio: 'Committed to making a difference in rural farming communities.',
    linkedin: '#',
    instagram: '#'
  }
];

const TeamSection = () => {
  const [hoveredMember, setHoveredMember] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const memberVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <div className="p-6 rounded-lg bg-gradient-to-br from-green-50/50 to-white">
      <h2 className="text-2xl font-semibold mb-6 text-green-700">Our Team</h2>
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {team.map((member, index) => (
          <motion.div
            key={member.name}
            variants={memberVariants}
            className={`relative group ${
              index === 0 ? 'md:col-span-2 lg:col-span-3' : ''
            }`}
            onHoverStart={() => setHoveredMember(member.name)}
            onHoverEnd={() => setHoveredMember(null)}
          >
            <div 
              className={`
                text-center p-6 rounded-lg bg-white shadow-sm 
                group-hover:shadow-lg transition-all duration-300
                ${index === 0 ? 'bg-gradient-to-r from-green-50 to-white' : ''}
              `}
            >
              <motion.div 
                className="w-24 h-24 mx-auto mb-4 rounded-full bg-green-100 flex items-center justify-center overflow-hidden"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </motion.div>

              <motion.h3 
                className="text-lg font-semibold text-green-800"
                whileHover={{ scale: 1.05 }}
              >
                {member.name}
              </motion.h3>
              
              <p className={`text-sm mb-3 ${
                index === 0 ? 'text-green-600 font-medium' : 'text-gray-600'
              }`}>
                {member.role}
              </p>

              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ 
                  opacity: hoveredMember === member.name ? 1 : 0,
                  height: hoveredMember === member.name ? 'auto' : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <p className="text-sm text-gray-600 mb-4">{member.bio}</p>
                <div className="flex justify-center space-x-4">
                  {member.linkedin && (
                    <a 
                      href={member.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <FaLinkedin className="w-5 h-5" />
                    </a>
                  )}
                  {member.instagram && (
                    <a 
                      href={member.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-gray-600 hover:text-green-600 transition-colors"
                    >
                      <FaInstagram className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default TeamSection;
