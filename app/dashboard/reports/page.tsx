export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Reports</h2>
        <p className="text-gray-600">View analytics and reports for your products</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Product Analytics</h3>
          <p className="text-gray-600 mt-2">Track product performance and verification rates</p>
          <div className="mt-4">
            <div className="text-2xl font-bold text-blue-600">85%</div>
            <p className="text-sm text-gray-500">Verification Success Rate</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Scan Reports</h3>
          <p className="text-gray-600 mt-2">Monitor QR code scanning activity</p>
          <div className="mt-4">
            <div className="text-2xl font-bold text-green-600">1,247</div>
            <p className="text-sm text-gray-500">Total Scans This Month</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Geographic Data</h3>
          <p className="text-gray-600 mt-2">See where your products are being verified</p>
          <div className="mt-4">
            <div className="text-2xl font-bold text-purple-600">23</div>
            <p className="text-sm text-gray-500">Countries</p>
          </div>
        </div>
      </div>
    </div>
  )
}
