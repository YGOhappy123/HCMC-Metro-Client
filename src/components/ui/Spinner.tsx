function Spinner() {
    return (
        <div className="bg-[radial-gradient(farthest-side,var(--color-brand-600)_94%,transparent)_top/10px_10px_no-repeat, conic-gradient(transparent_30%,var(--color-brand-600))] mx-auto my-12 aspect-square w-16 animate-[spin_1.5s_linear_infinite] rounded-full [-webkit-mask:radial-gradient(farthest-side,transparent_calc(100%-10px),#000_0)]"></div>
    )
}

export default Spinner
