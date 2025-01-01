import React, { useState } from 'react';
import DonateModal from './DonateModal';

interface DonateCardProps {
  amount: number;
  description: string;
}

const DonateCard: React.FC<DonateCardProps> = ({ amount, description }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div 
        className="card cursor-pointer transform hover:scale-105 transition-all duration-300"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="text-3xl font-bold text-primary mb-2">₹{amount}</div>
        <p className="text-gray-600">{description}</p>
      </div>

      <DonateModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        amount={amount}
      />
    </>
  );
};

export default DonateCard;
