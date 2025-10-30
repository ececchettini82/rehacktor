import GenresDropdown from "./GenresDropdown";
export default function Sidebar() {
    return (
        <aside className="md:w-80 w-full flex-shrink-0 bg-gray-100 border-r border-gray-200 p-4">
            <div className="sticky top-32 z-10">
                <GenresDropdown />
            </div>
        </aside>
    )
}