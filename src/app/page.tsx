'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();

  useEffect(() => {
    router.push('/neste-side'); // Desired rerouting path
  }, [router]);

  return null; // Add a loading spinner or message here if needed
}

  //Old code removable
//     return (
//    <div>
//       <h1>Hello, world!</h1> 
//     <a href="/neste-side">neste side</a>
//     </div>
//           )
// }
