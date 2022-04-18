import { createAction } from '../../utils/reducer/reducer.utils';
import { USER_CONTEXT_TYPES } from './user-types';

export const setCurrentUser = (user) => 
    createAction(USER_CONTEXT_TYPES.SET_CURRENT_USER, user);
