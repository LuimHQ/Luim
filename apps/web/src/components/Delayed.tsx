'use client';
import React, { useState, useEffect } from 'react';

type Props = {
  children: React.ReactNode;
  waitBeforeShow?: number;
};

const Delayed = ({ children, waitBeforeShow = 200 }: Props) => {
  const [isShown, setIsShown] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsShown(true);
    }, waitBeforeShow);
    return () => clearTimeout(timer);
  }, [waitBeforeShow]);

  return (
    <>
      <div className={!isShown ? 'block' : 'hidden'}>
        <p className='text-slate-500 font-semibold'>Loading...</p>
      </div>
      <div style={{ display: isShown ? 'block' : 'none' }}>
        {children}
      </div>
    </>
  );
};

export default Delayed;
