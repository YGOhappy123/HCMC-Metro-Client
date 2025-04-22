type TabItemProps = {
    isActive: boolean
    onClick: () => void
    children: React.ReactNode
}

function TabItem({ isActive, onClick, children }: TabItemProps) {
    return (
        <li
            onClick={onClick}
            className={`border-primary w-3xs cursor-pointer rounded-[5px] border-2 px-4 py-2 text-center transition-colors duration-300 ${isActive ? 'bg-[var(--color-primary)] text-white' : 'text-primary hover:bg-blue-200'} `}
        >
            {children}
        </li>
    )
}

export default TabItem
