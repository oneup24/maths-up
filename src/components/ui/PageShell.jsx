import React from 'react';

export default function PageShell({children,className='',maxWidth='max-w-lg',lgMaxWidth='lg:max-w-3xl'}){
  return(
    <div className={"min-h-screen bg-white p-4 pb-24 lg:pb-8 "+className}>
      <div className={maxWidth+" "+lgMaxWidth+" mx-auto"}>
        {children}
      </div>
    </div>
  );
}
