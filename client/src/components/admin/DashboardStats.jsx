import React from 'react';

const DashboardStats = () => {
      return (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-blue-100 p-4 rounded shadow text-center">
                        <h3 className="text-lg font-semibold text-blue-800">Total Sales</h3>
                        <p className="text-2xl font-bold">$10,245</p>
                  </div>
                  <div className="bg-green-100 p-4 rounded shadow text-center">
                        <h3 className="text-lg font-semibold text-green-800">New Orders</h3>
                        <p className="text-2xl font-bold">15</p>
                  </div>
                  <div className="bg-yellow-100 p-4 rounded shadow text-center">
                        <h3 className="text-lg font-semibold text-yellow-800">Producs</h3>
                        <p className="text-2xl font-bold">45</p>
                  </div>
                  <div className="bg-purple-100 p-4 rounded shadow text-center">
                        <h3 className="text-lg font-semibold text-purple-800">Users</h3>
                        <p className="text-2xl font-bold">120</p>
                  </div>
            </div>
      );
};

export default DashboardStats;
