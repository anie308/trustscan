export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Overview</h2>
        <p className="text-gray-600">Welcome to your TrustScan dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Total Products</h3>
          <p className="text-3xl font-bold text-blue-600 mt-2">260</p>
          <p className="text-sm text-gray-500 mt-1">+12% from last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Verified Scans</h3>
          <p className="text-3xl font-bold text-green-600 mt-2">260</p>
          <p className="text-sm text-gray-500 mt-1">+12% vs last month</p>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Active Lines</h3>
          <p className="text-3xl font-bold text-purple-600 mt-2">14</p>
          <p className="text-sm text-gray-500 mt-1">2 seasonal SKUs currently inactive</p>
        </div>
      </div>
    </div>
  )
}
