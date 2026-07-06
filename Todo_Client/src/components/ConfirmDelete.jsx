export default function ConfirmDelete({ open, setOpen, onConfirm }) {
  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  return (
    <div>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/20 bg-opacity-40 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-2">Xác nhận xóa</h2>
            <p className="text-gray-600 mb-4">
              Bạn có chắc chắn muốn xóa? Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setOpen(false)}
              >
                Hủy
              </button>
              <button
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleConfirm}
              >
                Đồng ý
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
