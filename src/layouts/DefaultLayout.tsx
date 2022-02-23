import { ReactNode } from 'react';
import React from 'react';

export default function DefaultLayout({ children }: { children: ReactNode }) {
  return (
    <div className="bg-gray-100">
      <div className="container mx-auto p-8 ">
        <header>
          <p className="font-semibold text-6xl font-serif	">Frontend Technical Test</p>
        </header>
        {children}
      </div>
    </div>
  );
}
