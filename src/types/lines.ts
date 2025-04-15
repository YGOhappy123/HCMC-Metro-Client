declare global {
    interface ILine {
        lineId: number
        lineName: string
        distance: number
        stations?: IStation[] | number[] | (Partial<IStation> & { position: number })[]
    }

    interface IStation {
        stationId: number
        stationName: string
        location: string
        lines?: ILine[] | Partial<ILine>[]
    }
}

export {}
