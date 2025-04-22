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

    interface IPathSegment {
        from?: number
        fromStation?: IStation
        to?: number
        toStation?: IStation
        line: string
        price: number
    }

    type IPath = IPathSegment[]
}

export {}
