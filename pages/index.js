import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

const Home = () => {

  
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <Link href={"/customer"}>customer</Link>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Home;
