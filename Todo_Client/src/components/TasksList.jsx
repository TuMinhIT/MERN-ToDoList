import TaskItem from "./TaskItem";
const TasksList = ({ Tasks }) => {
  return (
    <>
      <div className="sm:px-6 ">
        {Tasks.length === 0 ? (
          <div className="text-center py-6 sm:py-12">
            <svg
              className="w-16 h-16 text-gray-300 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Không có công việc nào! 🎉
            </h3>
            <p className="text-gray-500">Thêm công việc mới để bắt đầu.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Tasks.map((task) => (
              <TaskItem key={task._id} task={task} />
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default TasksList;
