import { Link } from "react-router-dom";

export default function HomeCard() {
  return (
    <div className="min-h-screen bg-gray-100">

      {/* HERO */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Organize Your Life, One Task at a Time
        </h1>
        <p className="text-lg md:text-xl mb-6 text-gray-200">
          A simple and powerful task manager to boost your productivity.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            to="/task/add"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white hover:border hover:border-white transition"
          >
            Add Task
          </Link>

          <Link
            to="/task/all"
            className="border border-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            View Tasks
          </Link>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
          Why Use This App?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Easy Task Management</h3>
            <p className="text-gray-600">
              Create, update, and delete tasks effortlessly with a clean interface.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Stay Organized</h3>
            <p className="text-gray-600">
              Keep track of deadlines and never miss an important task again.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition">
            <h3 className="text-xl font-semibold mb-2">Fast & Secure</h3>
            <p className="text-gray-600">
              Your data is secure and accessible anytime, anywhere.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="bg-white py-16 text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">
          Ready to get productive?
        </h2>
        <p className="text-gray-600 mb-6">
          Start adding tasks and take control of your day.
        </p>

        <Link
          to="/task/add"
          className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          Get Started
        </Link>
      </section>

    </div>
  );
}