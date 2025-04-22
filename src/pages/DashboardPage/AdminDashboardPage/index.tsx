import { useState } from 'react';
import { Dialog, DialogTrigger } from '@/components/ui/Dialog';
import { Popover, PopoverTrigger } from '@/components/ui/Popover';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight } from '@fortawesome/free-solid-svg-icons';

import AdminTable from '@/pages/DashboardPage/AdminDashboardPage/AdminTable';
import CreateAdminDialog from '@/pages/DashboardPage/AdminDashboardPage/CreateAdminDialog';
import AdminFilter from '@/pages/DashboardPage/AdminDashboardPage/AdminFilter';
import adminService from '@/services/adminService';

const AdminDashboardPage = () => {
  const {
    admins,
    total,
    page,
    limit,
    setPage,
    createNewAdminMutation,
    buildQuery,
    onFilterSearch,
    onResetFilterSearch,
  } = adminService({ enableFetching: true });

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [havingFilters, setHavingFilters] = useState(false);

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between p-4">
        <h2 className="font-oswald flex items-center gap-4 text-3xl font-bold text-black/30 uppercase">
          <span>
            Quản lý hệ thống <FontAwesomeIcon icon={faCaretRight} />
          </span>
          <span className="text-primary">Quản lý Admin</span>
        </h2>
        <div className="flex justify-center gap-4">
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative flex min-w-[120px] cursor-pointer items-center justify-center rounded-md border-2 border-solid border-black bg-black/10 px-6 py-3 font-medium text-black hover:opacity-90">
                Tìm kiếm
                {havingFilters && <div className="absolute top-2 right-2 h-2 w-2 rounded-full bg-red-600"></div>}
              </div>
            </PopoverTrigger>
            <AdminFilter
              setHavingFilters={setHavingFilters}
              onChange={buildQuery}
              onSearch={onFilterSearch}
              onReset={onResetFilterSearch}
            />
          </Popover>

          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger>
              <div className="border-primary bg-primary min-w-[120px] cursor-pointer rounded-md border-2 border-solid px-6 py-3 font-medium text-white hover:opacity-90">
                Thêm nhân viên
              </div>
            </DialogTrigger>
            <CreateAdminDialog
              isOpen={isAddModalOpen}
              closeDialog={() => setIsAddModalOpen(false)}
              createAdminMutation={createNewAdminMutation}
            />
          </Dialog>
        </div>
      </div>

      <AdminTable
      admins={admins}
      total={total}
      page={page}
      limit={limit}
      setPage={setPage}
      />
    </div>
  );
};

export default AdminDashboardPage;