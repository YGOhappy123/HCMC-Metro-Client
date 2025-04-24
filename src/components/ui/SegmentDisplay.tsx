import { useMemo } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@tanstack/react-query'
import { twMerge } from 'tailwind-merge'
import useAxiosIns from '@/hooks/useAxiosIns'

type SegmentDisplayProps = {
    segment: IPathSegment
    index: number
}

export const SegmentDisplay = ({ segment, index }: SegmentDisplayProps) => {
    const axios = useAxiosIns()

    const fetchLineInfoQuery = useQuery({
        queryKey: ['line-info', segment.line],
        queryFn: () => axios.get<IResponseData<ILine[]>>(`/stations/metro-lines?filter=${JSON.stringify({ lineName: segment.line })}`),
        refetchOnWindowFocus: false,
        refetchInterval: 10000,
        enabled: true,
        select: res => res.data
    })
    const lineInfo = fetchLineInfoQuery.data?.data?.[0]
    const lineStations = lineInfo?.stations

    const activeStationIndexes = useMemo(() => {
        if (!lineInfo || !lineInfo.stations) return []

        const entryIndex = lineInfo.stations.findIndex(st => (st as IStation).stationId === segment.from)!
        const exitIndex = lineInfo.stations.findIndex(st => (st as IStation).stationId === segment.to)!
        const start = Math.min(entryIndex, exitIndex)
        const end = Math.max(entryIndex, exitIndex)
        return Array.from({ length: end - start + 1 }, (_, i) => i + start)
    }, [segment, lineInfo])

    return (
        <div className="w-full">
            {index === 0 && lineInfo && (
                <h4 className="mb-4 text-xl font-semibold">
                    <FontAwesomeIcon icon={faArrowRight} /> Xuất phát tại ga:{' '}
                    {(lineInfo.stations as IStation[])?.find(st => st.stationId === segment.from)!.stationName}
                </h4>
            )}
            {index > 0 && lineInfo && (
                <h4 className="mb-4 text-xl font-semibold">
                    <FontAwesomeIcon icon={faArrowRight} /> Chuyển tuyến tại ga:{' '}
                    {(lineInfo.stations as IStation[])?.find(st => st.stationId === segment.from)!.stationName}
                </h4>
            )}
            <h4 className="text-xl font-semibold">
                <FontAwesomeIcon icon={faArrowRight} /> Đoạn {(index + 1).toString().padStart(2, '0')}: {segment.line}. Giá tiền:{' '}
                {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(segment.price * 1000)}
            </h4>
            {lineInfo && (
                <div className="overflow-x-auto">
                    <ul className="steps py-5">
                        {(lineStations as IStation[])?.map((station, idx) => (
                            <li
                                className={twMerge(
                                    `step text-balance ${activeStationIndexes.includes(idx) ? 'step-secondary' : 'after:text-white!'}`
                                )}
                                key={station.stationId}
                            >
                                {station.stationName}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default SegmentDisplay
