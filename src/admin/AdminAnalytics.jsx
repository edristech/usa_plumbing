import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

const statuses = ['new', 'contacted', 'scheduled', 'completed', 'cancelled']

function ChartCard({ title, children, empty }) {
  return (
    <div className="border border-line bg-white p-5">
      <h3 className="font-display text-xl font-semibold">{title}</h3>

      {empty ? (
        <p className="flex h-56 items-center justify-center text-sm text-muted">
          No data available for this period
        </p>
      ) : (
        <div className="mt-5 h-56">{children}</div>
      )}
    </div>
  )
}

export default function AdminAnalytics({
  data,
  range,
  onRangeChange,
  loading,
}) {
  // Prevent the Admin page from crashing when the API returns null/undefined.
  const analytics = data || {
    requestsOverTime: [],
    byStatus: [],
    emergency: null,
    byService: [],
  }

  const statusData = statuses.map(
    (status) =>
      analytics.byStatus?.find((item) => item.status === status) || {
        status,
        count: 0,
      }
  )

  const emergencyData = analytics.emergency
    ? [
        {
          label: 'Emergency',
          count: Number(analytics.emergency.emergency || 0),
        },
        {
          label: 'Non-emergency',
          count: Number(analytics.emergency.nonEmergency || 0),
        },
      ]
    : []

  const hasData = (items) =>
    Array.isArray(items) && items.some((item) => Number(item.count) > 0)

  return (
    <section id="analytics" className="mt-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-copper">
            Performance
          </p>

          <h2 className="mt-2 font-display text-3xl font-semibold">
            Analytics
          </h2>
        </div>

        <select
          aria-label="Analytics date range"
          className="border border-line bg-white px-3 py-2 text-sm"
          value={range}
          onChange={(event) => onRangeChange(event.target.value)}
        >
          <option value="today">Today</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
          <option value="all">All Time</option>
        </select>
      </div>

      {loading ? (
        <div className="mt-5 border border-line bg-white p-10 text-center text-sm text-muted">
          Loading analytics...
        </div>
      ) : (
        <div className="mt-5 grid gap-5 xl:grid-cols-2">
          <ChartCard
            title="Service Requests Over Time"
            empty={!hasData(analytics.requestsOverTime)}
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={analytics.requestsOverTime}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#d8d7d2"
                />

                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 11 }}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11 }}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#c65a32"
                  strokeWidth={3}
                  dot={{ r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Requests by Status"
            empty={!hasData(statusData)}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={statusData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#d8d7d2"
                />

                <XAxis
                  dataKey="status"
                  tick={{ fontSize: 11 }}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11 }}
                />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#17364b"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Emergency Requests"
            empty={!hasData(emergencyData)}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={emergencyData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#d8d7d2"
                />

                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 11 }}
                />

                <YAxis
                  allowDecimals={false}
                  tick={{ fontSize: 11 }}
                />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#a84625"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard
            title="Most Requested Services"
            empty={!hasData(analytics.byService)}
          >
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={analytics.byService}
                layout="vertical"
                margin={{ left: 20 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#d8d7d2"
                />

                <XAxis
                  type="number"
                  allowDecimals={false}
                  tick={{ fontSize: 11 }}
                />

                <YAxis
                  type="category"
                  dataKey="service"
                  width={110}
                  tick={{ fontSize: 11 }}
                />

                <Tooltip />

                <Bar
                  dataKey="count"
                  fill="#c65a32"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      )}
    </section>
  )
}