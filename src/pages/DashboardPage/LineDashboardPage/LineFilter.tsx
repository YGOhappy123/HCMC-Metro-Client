// import { useEffect, useState } from 'react'
// import { PopoverContent } from '@/components/ui/Popover'
// import { LineSortAndFilterParams } from '@/services/lineService'

// import Button from '@/components/common/Button'
// import TextInput from '@/components/common/TextInput'
// import SelectInput from '@/components/common/SelectInput'

// type LineFilterProps = {
//     setHavingFilters: (value: boolean) => void
//     onChange: (params: LineSortAndFilterParams) => void
//     onSearch: () => void
//     onReset: () => void
// }

// const LineFilter = ({ setHavingFilters, onChange, onSearch, onReset }: LineFilterProps) => {
//     const [searchName, setSearchName] = useState<string>('')
//     const [searchStation, setSearchStation] = useState<string>('')
//     const [sort, setSort] = useState<string>('-name')



//     useEffect(() => {
//         onChange({ searchName, searchStation, /*sort*/ })
//     }, [searchName, searchStation, /*sort*/])

//     const handleSearch = () => {
//         onSearch()

//         if (!searchName && !searchStation /*&& sort === '-createdAt'*/) {
//             setHavingFilters(false)
//         } else {
//             setHavingFilters(true)
//         }
//     }

//     const handleReset = () => {
//         setSearchName('')
//         setSearchStation('')
//         setSort('-name')
//         setHavingFilters(false)
//         onReset()
//     }

//     return (
//         <PopoverContent className="w-[400px] bg-white">
//             <div className="mb-4 flex items-center justify-between">
//                 {/* <Button text="Tìm kiếm" variant="gradient" className="border-primary rounded-2xl px-3 py-1.5 text-xs" onClick={handleSearch} /> */}
//                 <Button text="Đặt lại" variant="danger" className="rounded-2xl px-3 py-1.5 text-xs" onClick={handleReset} />
//             </div>
//             <form>
//                 <div className="mb-4">
//                     <TextInput
//                         fieldName="name"
//                         placeholder="Lọc theo tên"
//                         error=""
//                         value={searchName}
//                         onChange={(value: string) => setSearchName(value)}
//                         onFocus={() => { }}
//                         labelClassName="bg-white"
//                         inputClassName="leading-2"
//                     />
//                 </div>
//                 <div className="mb-4">
//                     <TextInput
//                         fieldName="location"
//                         placeholder="Lọc theo vị trí"
//                         error=""
//                         value={searchStation}
//                         onChange={(value: string) => setSearchStation(value)}
//                         onFocus={() => { }}
//                         labelClassName="bg-white"
//                         inputClassName="leading-2"
//                     />
//                 </div>
//                 {/* <div>
//                     <SelectInput
//                         fieldName="sort"
//                         placeholder="Sắp xếp theo"
//                         options={[
//                             { value: '-name', label: 'Tên nhà ga giảm dần' },
//                             { value: '+name', label: 'Tên nhà ga tăng dần' }
//                         ]}
//                         error=""
//                         value={sort}
//                         onChange={(value: string | number) => setSort(value as string)}
//                         onFocus={() => { }}
//                         labelClassName="bg-white"
//                         selectClassName="py-[9px]"
//                     />
//                 </div> */}
//             </form>
//         </PopoverContent>
//     )
// }

// export default LineFilter
