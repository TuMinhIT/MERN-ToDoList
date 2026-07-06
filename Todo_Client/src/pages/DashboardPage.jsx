import { useState, useEffect } from "react";
import Layout from "./Layout";
import AddTaskModal from "../components/AddTaskModal";
import taskService from "../services/taskService";
import { IoMdAdd } from "react-icons/io";
import StatisticsCards from "../components/StatisticsCards";
import TasksList from "../components/TasksList";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "../components/Spinner";
import { BiLeftArrowAlt, BiRightArrowAlt } from "react-icons/bi";

const DashboardPage = ({ isActive }) => {

  const _service = taskService();
  const queryClient = useQueryClient();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [tasks, setTasks] = useState([])

  const { data, isLoading, error } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => _service.getAll(page, 5, isActive),
  });

  const pagination = data?.data?.pagination
  useEffect(() => {
    queryClient.invalidateQueries({ queryKey: ["tasks"] });
  }, [isActive, page]);

  useEffect(() => {
    if (data?.data?.tasks) {
      setTasks(data.data.tasks);
    } else {
      setTasks([]);
    }
  }, [data]);


  return (
    <>
      {isLoading && <Spinner />}
      <div className="space-y-6">
        {/* Statistics Cards */}
        <StatisticsCards />

        {tasks && <>
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold text-gray-900">
              Tổng số ({pagination?.total || 0})
            </h2>

            <button
              onClick={() => setIsAddModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
            >
              <IoMdAdd />
              <span>Thêm mới</span>
            </button>
          </div>

          {/* Tasks List */}
          <TasksList Tasks={tasks} />

          {/* Pagination Controls */}
          {pagination && pagination.totalPages > 1 && (
            <div className="flex justify-center items-center mt-6 space-x-4">
              <button
                disabled={page === 1}
                onClick={() => setPage((old) => Math.max(old - 1, 1))}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <BiLeftArrowAlt />
              </button>
              <span className="text-gray-600 font-medium">
                Trang {page} / {pagination.totalPages}
              </span>
              <button
                disabled={page === pagination.totalPages}
                onClick={() => setPage((old) => (old < pagination.totalPages ? old + 1 : old))}
                className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <BiRightArrowAlt />
              </button>
            </div>
          )}

        </>}



        {/* Add Task Modal */}
        {isAddModalOpen && (
          <AddTaskModal onClose={() => setIsAddModalOpen(false)} />
        )}
      </div>
    </>
  );
};

export default DashboardPage;
