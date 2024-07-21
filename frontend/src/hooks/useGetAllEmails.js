import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setEmails } from '../redux/appSlice';

const useGetAllEmails = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/v1/email/getallemails", {
          withCredentials: true,
        });
        dispatch(setEmails(res.data.emails));
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };

    fetchEmails();
  }, [dispatch]);
};

export default useGetAllEmails;
