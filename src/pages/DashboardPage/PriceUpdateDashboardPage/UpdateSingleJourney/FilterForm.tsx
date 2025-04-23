import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import SelectSearchInput from '@/components/common/SelectSearchInput'

type FilterFormProps = {
    axios: AxiosInstance
    handleSearch: () => Promise<void>
    selectedLine: number
    setSelectedLine: (value: number) => void
    selectedStation: number
    setSelectedStation: (value: number) => void
}

const FilterForm = ({ axios, handleSearch, selectedLine, setSelectedLine, selectedStation, setSelectedStation }: FilterFormProps) => {
    const fetchAllLinesQuery = useQuery({
        queryKey: ['lines-all'],
        queryFn: () => axios.get<IResponseData<ILine[]>>('/stations/metro-lines'),
        refetchOnWindowFocus: false,
        refetchInterval: 10000,
        enabled: true,
        select: res => res.data
    })
    const lines = fetchAllLinesQuery.data?.data || []
    const stations = useMemo(() => lines.find(l => l.lineId === Number(selectedLine))?.stations ?? [], [selectedLine, lines])

    return (
        <div className="flex h-[98px] w-full gap-10 rounded-lg border-2 border-solid p-5">
            <div className="ml-[10px] grid flex-1 grid-cols-[1fr] items-center text-lg">
                <SelectSearchInput
                    fieldName="station"
                    placeholder="Chọn tuyến"
                    options={lines.map(line => ({
                        value: line.lineId,
                        label: line.lineName
                    }))}
                    error=""
                    value={selectedLine}
                    onChange={(value: string | number) => setSelectedLine(value as number)}
                    onFocus={() => {}}
                    labelClassName="bg-white"
                    selectClassName="py-[9px] leading-normal"
                />
            </div>
            <div className="border-secondary w-[2px] border-l-2 border-solid"></div>
            <div className="grid flex-1 grid-cols-[1fr] items-center text-lg">
                <SelectSearchInput
                    fieldName="station"
                    placeholder="Chọn nhà ga"
                    options={(stations as IStation[]).map(station => ({
                        value: station.stationId,
                        label: station.stationName
                    }))}
                    error=""
                    value={selectedStation}
                    onChange={(value: string | number) => setSelectedStation(value as number)}
                    onFocus={() => {}}
                    labelClassName="bg-white"
                    selectClassName="py-[9px] leading-normal"
                />
            </div>

            <div className="border-secondary w-[2px] border-l-2 border-solid"></div>
            <button
                className="bg-primary text-ivory hover:bg-primary/90 flex w-[200px] cursor-pointer items-center justify-center rounded font-semibold tracking-widest uppercase disabled:cursor-not-allowed disabled:border-gray-600 disabled:bg-gray-100 disabled:text-gray-600"
                onClick={handleSearch}
                disabled={!selectedLine}
            >
                Tìm giá vé
            </button>
        </div>
    )
}

export default FilterForm
