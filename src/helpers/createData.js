export const createDataUser = (
  _id,
  username,
  profileImage,
  email,
  role,
  verified,
  registeredWorkshops,
  createdWorkshops,
  attendanceHistory,
  active,
  request
) => {
  return {
    _id,
    username,
    profileImage,
    email,
    role,
    verified,
    registeredWorkshops,
    createdWorkshops,
    attendanceHistory,
    active,
    request,
  };
};

export const createDataWorkshop = (
  _id,
  title,
  description,
  date,
  startTime,
  endTime,
  imageBanner,
  speakers,
  attendees,
  status,
  comments,
  urlVideo,
  urlZoom,
  active,
  createdBy,
  likes,
  registeredUsers
) => {
  return {
    _id,
    title,
    description,
    date,
    startTime,
    endTime,
    imageBanner,
    speakers,
    attendees,
    status,
    comments,
    urlVideo,
    urlZoom,
    active,
    createdBy,
    likes,
    registeredUsers,
  };
};

export const createDataEvent = (
  _id,
  title,
  description,
  date,
  startTime,
  endTime,
  imageBanner,
  likes,
  active,
  status
) => {
  return {
    _id,
    title,
    description,
    date,
    startTime,
    endTime,
    imageBanner,
    likes,
    active,
    status,
  };
};

export const createDataRequest = (_id, user, roleRequest, workshopRequest, adminNote) => {
  return {
    _id,
    user,
    roleRequest,
    workshopRequest,
    adminNote
  };
};
