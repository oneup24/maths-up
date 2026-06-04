import React from 'react';

export default function PageShell({children,className='',maxWidth='max-w-lg'}){
  return(
    <div className={"min-h-screen p-4 pb-24 "+className} style={{background:'linear-gradient(160deg,#FFF4EC 0%,#FFF8F2 50%,#FFF1E6 100%)'}}>
      <div className={maxWidth+" mx-auto"}>
        {children}
      </div>
    </div>
  );
}
