import { BASIC_URL } from '../utils/routes';
import { io } from 'socket.io-client';

const socket = io(BASIC_URL);
export default socket;
