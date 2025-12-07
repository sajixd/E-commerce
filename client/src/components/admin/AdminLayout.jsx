import React from 'react';
import AdminSidebar from './AdminSidebar';

const AdminLayout = ({ children }) => {
      return (
            <div className="min-h-screen bg-background text-foreground">
                  <AdminSidebar />
                  <div className="md:ml-64 p-4 md:p-8 transition-all duration-300">
                        <div className="max-w-7xl mx-auto">
                              {children}
                        </div>
                  </div>
            </div>
      );
};

export default AdminLayout;
