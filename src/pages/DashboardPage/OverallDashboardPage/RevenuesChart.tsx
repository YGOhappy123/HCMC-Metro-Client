import { Skeleton } from '@/components/ui/Skeleton'
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

interface RevenuesChartProps {
    data:
        | {
              name: string
              totalSales: number
              totalUnits: number
          }[]
        | undefined
    title?: string
    loading?: boolean
}

export default function RevenuesChart({ data, title, loading }: RevenuesChartProps) {
    const processedData = data?.map(dt => ({ ...dt, totalSales: dt.totalSales * 1000 }))

    return (
        <div className="border-primary flex h-full min-h-[150px] cursor-pointer flex-col items-center gap-4 rounded-2xl border-2 p-6 shadow-md">
            <h2 className="text-accent text-2xl font-semibold">{title || 'Biều đồ doanh thu'}</h2>

            {loading ? (
                <Skeleton className="h-[400px] w-full rounded-xl" />
            ) : (
                <ResponsiveContainer width="100%" height={500}>
                    <BarChart barSize={10} data={processedData} style={{ margin: '0 auto' }} barGap={8}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis yAxisId="left" orientation="left" stroke="#0077B6" />
                        <YAxis yAxisId="right" orientation="right" stroke="#588157" />
                        <Tooltip />
                        <Legend />
                        <Bar yAxisId="left" name="Doanh thu (Vnđ)" dataKey="totalSales" fill="#0077B6" barSize={15} />
                        <Bar yAxisId="right" name="Vé bán ra (Vé)" dataKey="totalUnits" fill="#588157" barSize={15} />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    )
}
