import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import axios from 'axios';
import Loading from '../../components/student/Loading';
import { toast } from 'react-toastify';

const StudentsEnrolled = () => {
  const [enroledStudents, setEnroledStudents] = useState(null);
  const { backendUrl, getToken, isEducator } = useContext(AppContext);

  const fetchEnrolledStudents = async () => {
    try {
      const token = await getToken();
      const { data } = await axios.get(`${backendUrl}/api/educator/enrolled-students`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log("Fetched enrolled students:", data.enrolledStudents); // Debug log

      if (data.success) {
        setEnroledStudents(data.enrolledStudents.reverse());
      } else {
        toast.error(data.message);
        setEnroledStudents([]);
      }
    } catch (error) {
      toast.error(error.message);
      setEnroledStudents([]);
    }
  };

  useEffect(() => {
    if (isEducator !== null) fetchEnrolledStudents();
  }, [isEducator]);

  if (enroledStudents === null) return <Loading />;

  if (enroledStudents.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <p className="text-xl font-semibold">No students have enrolled yet.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-start justify-between md:p-8 md:pb-0 p-4 pt-8 pb-0">
      <div className="flex flex-col items-center max-w-4xl w-full overflow-hidden rounded-md border shadow-limeGlow border-limeAccent">
        <table className="table-fixed md:table-auto w-full overflow-hidden pb-4">
          <thead className="text-white border-b text-sm text-left border-limeAccent">
            <tr>
              <th className="px-4 py-3 font-semibold">#</th>
              <th className="px-4 py-3 font-semibold">Student Name</th>
              <th className="px-4 py-3 font-semibold">Course Title</th>
              <th className="px-4 py-3 font-semibold hidden sm:table-cell">Date</th>
            </tr>
          </thead>
          <tbody className="text-white">
            {enroledStudents.map((item, index) => (
              <tr key={index} className="border-b border-limeAccent">
                <td className="px-4 py-3 text-center">{index + 1}</td>
                <td className="md:px-4 py-3 px-2 flex items-center space-x-3">
                  <img
                    src={item?.student?.imageUrl || 'https://via.placeholder.com/40'}
                    alt="student"
                    className="w-9 h-9 rounded-full"
                  />
                  <span className="truncate">{item?.student?.name || 'Unnamed'}</span>
                </td>
                <td className="px-4 py-3 truncate">{item.courseTitle || 'Untitled Course'}</td>
                <td className="px-4 py-3 hidden sm:table-cell">
                  {item.purchaseDate ? new Date(item.purchaseDate).toLocaleDateString() : 'N/A'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentsEnrolled;
