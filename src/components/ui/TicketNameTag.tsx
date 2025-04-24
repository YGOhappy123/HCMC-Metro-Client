const TicketNameTag = ({ ticketName }: { ticketName: string }) => {
    const classMap: Record<string, string> = {
        'Vé 1 ngày': 'table-tag-cyan',
        'Vé 3 ngày': 'table-tag-indigo',
        'Vé tháng phổ thông': 'table-tag-fuchsia',
        'Vé tháng HSSV': 'table-tag-emerald'
    }

    return (
        <div className="flex justify-center">
            <div className={classMap[ticketName] || ''}>{ticketName}</div>
        </div>
    )
}

export default TicketNameTag
