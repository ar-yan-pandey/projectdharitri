'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';
import { BsGrid1X2Fill, BsPeopleFill, BsBoxFill, BsNewspaper, BsCashCoin, BsHospital } from 'react-icons/bs';

const AdminSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (path: string) => pathname === path;

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/auth');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <aside className="w-64 bg-white shadow-lg h-screen fixed left-0 top-0 flex flex-col">
      <div className="p-6 border-b">
        <h2 className="text-2xl font-bold text-primary bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          Admin Panel
        </h2>
      </div>
      <nav className="mt-6 px-4 flex-grow">
        <ul className="space-y-3">
          <li>
            <Link
              href="/admin/dashboard"
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive('/admin/dashboard')
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BsGrid1X2Fill className="w-5 h-5" />
              <span className="ml-3 font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/users"
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive('/admin/users')
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BsPeopleFill className="w-5 h-5" />
              <span className="ml-3 font-medium">Users</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/donations"
              className={`flex items-center px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive('/admin/donations')
                  ? 'bg-primary text-white shadow-md'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <BsCashCoin className="w-5 h-5" />
              <span className="ml-3 font-medium">Donations</span>
            </Link>
          </li>
          <li>
            <Link
              href="/admin/products"
              className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
                pathname === '/admin/products' ? 'bg-gray-100' : ''
              }`}
            >
              <BsBoxFill className="w-5 h-5" />
              Products
            </Link>
          </li>
          <li>
            <Link
              href="/admin/news"
              className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
                pathname === '/admin/news' ? 'bg-gray-100' : ''
              }`}
            >
              <BsNewspaper className="w-5 h-5" />
              News
            </Link>
          </li>
          <li>
            <Link
              href="/admin/vets"
              className={`flex items-center gap-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg ${
                pathname === '/admin/vets' ? 'bg-gray-100' : ''
              }`}
            >
              <BsHospital className="w-5 h-5" />
              Vets
            </Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t">
        <button
          onClick={handleSignOut}
          className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-red-600 hover:text-white hover:bg-red-500 rounded-lg transition-all duration-200"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span className="ml-3">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;