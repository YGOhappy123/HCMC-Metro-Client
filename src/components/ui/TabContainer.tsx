import TabItem from './TabItem'

type TabContainerProps = {
    tabs: string[]
    activeIndex: number
    onChange: (index: number) => void
}

function TabContainer({ tabs, activeIndex, onChange }: TabContainerProps) {
    return (
        <ul className="flex list-none items-center justify-around rounded-[7px] p-1">
            {tabs.map((tab, index) => (
                <TabItem key={index} isActive={index === activeIndex} onClick={() => onChange(index)}>
                    {tab}
                </TabItem>
            ))}
        </ul>
    )
}

export default TabContainer
