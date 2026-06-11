export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Welcome to Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Add your cards here */}
        <div className="bg-white p-6 rounded-xl shadow-sm">Card 1</div>
        <div className="bg-white p-6 rounded-xl shadow-sm">Card 2</div>
        <div className="bg-white p-6 rounded-xl shadow-sm">Card 3</div>
        <div className="bg-white p-6 rounded-xl shadow-sm">Card 4</div>
      </div>
    </div>
  );
}