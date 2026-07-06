import API from "./api";

const taskService = () => {
    const resource = "/api/tasks";

    const getAll = async (
        page = 1,
        limit = 10,
        completed = undefined
    ) => {
        try {
            const response = await API.get(`${resource}`, {
                params: {
                    page,
                    limit,
                    // search,
                    completed,
                },
            });

            return response.data;
        } catch (error) {
            throw error;
        }
    };

    const getStatistic = async () => {
        try {
            const response = await API.get(resource + `/statistic`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }



    const getById = async (id) => {
        try {
            const response = await API.get(resource + `${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const create = async ({ title, description, category }) => {
        try {
            const response = await API.post("/api/tasks", {
                title,
                description,
                category,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }
    const update = async ({ id, title, description, completed }) => {
        try {
            const response = await API.put(`/api/tasks/${id}`, {
                title,
                description,
                completed,
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    const deleteTask = async ({ id }) => {
        try {
            const response = await API.delete(`/api/tasks/${id}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    return {
        deleteTask,
        getStatistic,
        create,
        update,
        getById,
        getAll,
    };
};
export default taskService;
