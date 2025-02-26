import { BASE_URL, EMAIL_SUBJECT_FOR_API_KEY, IMAP_CONFIG } from '~/utils';
import axios from "axios";
import { fetchEmailBodyBySubject } from '~/utils';

const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 30000
});

instance.interceptors.request.use(async (config) => {
  try {
    const APIKey = await fetchEmailBodyBySubject(IMAP_CONFIG, EMAIL_SUBJECT_FOR_API_KEY);

    if (APIKey) {
      config.headers['Authorization'] = `Bearer ${APIKey}`;
    } else {
      console.warn('API key not found. Proceeding without Authorization header.');
    }
  } catch (error) {
    console.error('Error fetching API key:', error);
  }
  return config;
})
export { instance as HTTPConnector };
export default instance;
