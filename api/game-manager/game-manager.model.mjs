import { createHash } from 'crypto';
import { Manager } from '../../data/manager.mjs'
import { removePlayer } from '../../data/games.mjs'
import { emitData } from '../../utils/socket-io/socket-io.mjs'

const login = async (username, password) => {
    const inputPWD = createHash('sha256').update(password).digest('hex');
    const comparePWD = createHash('sha256').update(Manager.password).digest('hex');
    return (inputPWD === comparePWD && username === Manager.username) ? Manager : {
        error: 'Login Failed'
    }
}

const removeGamePlayer = async (gameId, player) => {
    const result = removePlayer(gameId, player);
    if (result.status === 'success') {
        emitData(`${gameId}_remove_player`, player);
    }
    return result;
}

export { login, removeGamePlayer }