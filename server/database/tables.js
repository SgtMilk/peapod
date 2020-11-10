const tables = {
    users: 'users',
    pods: 'pods',
    pod_users: 'pod_users',
    activities: 'activities',
    user_activities: 'user_activities',
}

//users: || user_uuid || email || firstname || lastname || google_id || facebook_id || riskLevel ||

//pods: || pod_uuid || name ||

//pod_users: || pod_uuid || user_uuid ||

//activities: || activity_id || name || date || indoor || socialinteraction || proximity || peoplepresent ||

//user_activities: || user_uuid || activity_id ||

module.exports = tables;