import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const ATTEMPTS_API = `${REMOTE_SERVER}/api/attempts`;

export const fetchAttemptsByUserAndQuiz = async (
  userId: string,
  quizId: string
) => {
  const { data } = await axiosWithCredentials.get(
    `${ATTEMPTS_API}/${userId}/${quizId}`
  );
  return data;
};

export const createAttempt = async (attempt: any) => {
  const { data } = await axiosWithCredentials.post(`${ATTEMPTS_API}`, attempt);
  return data;
};

export const getRecentAttemptForUser = async (
  userId: string,
  quizId: string
) => {
  const { data } = await axiosWithCredentials.get(
    `${ATTEMPTS_API}/${userId}/${quizId}/recent`
  );
  return data;
};
