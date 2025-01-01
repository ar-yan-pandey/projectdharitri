'use client';

import NewsManagement from '../../../components/NewsManagement';
import AdminSidebar from '../../../components/admin/AdminSidebar';

export default function NewsPage() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <div className="fixed inset-y-0">
        <AdminSidebar />
      </div>
      <main className="flex-1 ml-64 p-8">
        <NewsManagement />
      </main>
    </div>
  );
}
