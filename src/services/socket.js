import { BASE_URL } from '../utils/routes';
import { io } from 'socket.io-client';

const socket = io(BASE_URL);
export default socket;
