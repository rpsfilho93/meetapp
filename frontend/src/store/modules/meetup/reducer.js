import produce from 'immer';

const INITIAL_STATE = {
  info: null,
};

export default function meetup(state = { INITIAL_STATE }, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/NEW_MEETUP_REQUEST': {
        draft.info = null;
        break;
      }
      case '@meetup/EDIT_MEETUP_REQUEST': {
        draft.info = action.payload.data;
        break;
      }
      case '@meetup/UPDATE_MEETUP_SUCCESS': {
        draft.info = action.payload.data;
        break;
      }
      default:
    }
  });
}
