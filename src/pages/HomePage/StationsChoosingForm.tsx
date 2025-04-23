import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { PAYMENT_METHOD_MAPPING } from '@/utils/paymentMethodMapping'
import SelectInput from '@/components/common/SelectInput'
import SelectSearchInput from '@/components/common/SelectSearchInput'
import useAxiosIns from '@/hooks/useAxiosIns'

type StationsChoosingFormProps = {
    setPath: (value: IPath) => void
}

const StationsChoosingForm = ({ setPath }: StationsChoosingFormProps) => {
    const axios = useAxiosIns()
    const [entryStation, setEntryStation] = useState<number>(0)
    const [exitStation, setExitStation] = useState<number>(0)
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('cash')

    const fetchAllStationsQuery = useQuery({
        queryKey: ['stations-all'],
        queryFn: () => axios.get<IResponseData<IStation[]>>('/stations/metro-stations'),
        refetchOnWindowFocus: false,
        refetchInterval: 10000,
        enabled: true,
        select: res => res.data
    })
    const stations = fetchAllStationsQuery.data?.data || []

    const handleSearch = async () => {
        if (!entryStation || !exitStation || entryStation === exitStation) return
        const res = await axios.get<IResponseData<IPath>>(`/stations/metro-path?start=${entryStation}&end=${exitStation}&method=${paymentMethod}`)
        setPath(res?.data?.data ?? [])
    }

    return (
        <div className="flex h-[98px] w-full gap-10 rounded-full border-2 border-solid border-[#9C9C9C] bg-[#FFFBF2] p-5 text-[#4D4D4D]">
            <div className="ml-[10px] grid flex-1 grid-cols-[1fr] items-center text-lg">
                <SelectSearchInput
                    fieldName="station"
                    placeholder="Chọn ga xuất phát"
                    options={stations.map(station => ({ value: station.stationId, label: station.stationName }))}
                    error=""
                    value={entryStation}
                    onChange={(value: string | number) => setEntryStation(value as number)}
                    onFocus={() => {}}
                    labelClassName="bg-[#FFFBF2]"
                    selectClassName="py-[9px] rounded-md leading-normal"
                />
            </div>
            <div className="border-secondary w-[2px] border-l-2 border-solid"></div>
            <div className="grid flex-1 grid-cols-[1fr] items-center text-lg">
                <SelectSearchInput
                    fieldName="station"
                    placeholder="Chọn ga đich đến"
                    options={stations.map(station => ({ value: station.stationId, label: station.stationName }))}
                    error=""
                    value={exitStation}
                    onChange={(value: string | number) => setExitStation(value as number)}
                    onFocus={() => {}}
                    labelClassName="bg-[#FFFBF2]"
                    selectClassName="py-[9px] rounded-md leading-normal"
                />
            </div>
            <div className="border-secondary w-[2px] border-l-2 border-solid"></div>
            <div className="grid flex-1 grid-cols-[1fr] items-center text-lg">
                <SelectInput
                    fieldName="station"
                    placeholder="Chọn phương thức thanh toán"
                    options={Object.entries(PAYMENT_METHOD_MAPPING).map(([method, mappedMethod]) => ({
                        label: mappedMethod,
                        value: method
                    }))}
                    error=""
                    value={paymentMethod}
                    havingDefaultOptions={false}
                    onChange={(value: string | number) => setPaymentMethod(value as PaymentMethod)}
                    onFocus={() => {}}
                    labelClassName="bg-[#FFFBF2]"
                    selectClassName="py-[9px] rounded-md leading-normal"
                />
            </div>
            <button
                className="bg-primary text-ivory hover:bg-primary/90 flex w-[200px] cursor-pointer items-center justify-center rounded-full font-semibold tracking-widest uppercase disabled:cursor-not-allowed disabled:border-gray-600 disabled:bg-gray-100 disabled:text-gray-600"
                onClick={handleSearch}
                disabled={!entryStation || !exitStation || entryStation === exitStation}
            >
                Tìm lộ trình
            </button>
        </div>
    )
}
export default StationsChoosingForm
