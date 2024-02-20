import SidebarItem from "./SidebarItem";

const Sidebar = () => {
    return (
        <div className="bg-white" id="sidebar-wrapper">
            <div className="sidebar-heading d-flex flex-nowrap align-items-center gap-2 p-4">
                <img src="/public/vite.svg" height="30px" alt=""/>
                <div>
                    <h5 className="text-md fw-bold text-nowrap mb-1">Blog</h5>
                    <p className="text-xs text-nowrap mb-0">Website</p>
                </div>
            </div>
            <div className="sidebar">
                <h5 className="sidebar-menu">MENU</h5>
                <SidebarItem title="Dashboard" icon="bi bi-house-door" link="/user" end={true} />
                <SidebarItem title="Kategori" icon="bi bi-bookmarks" link="/user/category" />
                <SidebarItem title="Post" icon="bi bi-journal-bookmark" link="/user/post" />
            </div>
        </div>
    );
}

export default Sidebar;