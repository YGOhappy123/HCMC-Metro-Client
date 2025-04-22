type TabItemProps = {
    isActive: boolean
    onClick: () => void
    children: React.ReactNode
}

function TabItem({ isActive, onClick, children }: TabItemProps) {
    return (
        <li
            onClick={onClick}
            className={`w-3xs cursor-pointer rounded-[5px] px-4 py-2 text-center transition-colors duration-300 ${isActive ? 'bg-[var(--color-primary)] text-white' : 'text-blue-700 hover:bg-blue-200'} `}
        >
            {children}
        </li>
    )
}

export default TabItem
