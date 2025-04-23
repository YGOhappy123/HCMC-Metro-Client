import { Skeleton } from '@/components/ui/Skeleton'
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer, CartesianGrid } from 'recharts'

interface OriginsChartProps {
    data:
        | {
              name: string
              value: number
          }[]
        | undefined
    title?: string
    loading?: boolean
}

export default function OriginsChart({ data, title, loading }: OriginsChartProps) {
    const COLORS = ['#0077B6', '#588157']

    return (
        <div className="border-primary flex min-h-[150px] cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 p-6 shadow-md">
            <h2 className="text-accent text-2xl font-semibold">{title || 'Biều đồ tỉ lệ vé bán ra'}</h2>

            {loading ? (
                <Skeleton className="h-[250px] w-full rounded-xl" />
            ) : (
                <ResponsiveContainer width="100%" height={500}>
                    <PieChart>
                        <CartesianGrid strokeDasharray="3 3" />
                        <Pie data={data} dataKey="value" nameKey="name" cx="50%" cy="50%" fill="#8884d8" label>
                            {(data ?? []).map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}
