'use client';

import { useEffect } from 'react';

export default function AngularUserPage() {
  useEffect(() => {
    // @ts-ignore
    import('mfAngular/UserDetailModule').then(({ mount }) => {
      mount('angular-user-root');
    });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Usuario desde Angular</h2>
      <div id="angular-user-root"></div>
    </div>
  );
}