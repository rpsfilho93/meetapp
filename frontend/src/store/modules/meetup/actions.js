export function newMeetupRequest() {
  return {
    type: '@meetup/NEW_MEETUP_REQUEST',
  };
}

export function addMeetupRequest(data) {
  return {
    type: '@meetup/ADD_MEETUP_REQUEST',
    payload: { data },
  };
}

export function editMeetupRequest(data) {
  return {
    type: '@meetup/EDIT_MEETUP_REQUEST',
    payload: { data },
  };
}

export function cancelMeetupRequest(data) {
  return {
    type: '@meetup/CANCEL_MEETUP_REQUEST',
    payload: { data },
  };
}

export function updateMeetupRequest(data) {
  return {
    type: '@meetup/UPDATE_MEETUP_REQUEST',
    payload: { data },
  };
}

export function updateMeetupSuccess(data) {
  return {
    type: '@meetup/UPDATE_MEETUP_SUCCESS',
    payload: { data },
  };
}
