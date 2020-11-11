const tables = {
    users: 'users',
    pods: 'pods',
    pod_users: 'pod_users',
    activities: 'activities',
    user_activities: 'user_activities',
    notifications: 'notifications'
}

//users: || user_uuid || email || firstname || lastname || google_id || facebook_id || riskLevel ||

//pods: || pod_uuid || name || pod_creator_id || 

//pod_users: || pod_uuid || user_uuid || 

//activities: || activity_id || name || date || indoor || socialinteraction || proximity || peoplepresent ||

//user_activities: || user_uuid || activity_id ||

//notifications: || notification_uuid || user_uuid || message || created_date || sender_id || accepted

module.exports = tables;