export default function User({ user, onUpdate, onDelete }) {
    return (
      <tr className="bg-white border-b border-gray-300">
        <td className="border border-gray-300 px-4 py-2 text-center">{user.id}</td>
        <td className="border border-gray-300 px-4 py-2 text-center">{user.name}</td>
        <td className="border border-gray-300 px-4 py-2 text-center">{user.email}</td>
        <td className="border border-gray-300 px-4 py-2 text-center">
          <button
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 mr-2"
            onClick={(e) => onUpdate(e, user.id)}
          >
            Update
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={(e) => onDelete(e, user.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    );
  }
  