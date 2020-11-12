const tables = {
    users: 'users',
    pods: 'pods',
    pod_users: 'pod_users',
    activities: 'activities',
    user_activities: 'user_activities',
    notifications: 'notifications'
}

//users: || user_uuid || email || firstname || lastname || google_id || facebook_id || riskLevel ||

//pods: || pod_uuid || name || pod_creator_id || created_date

//pod_users: || pod_uuid || user_uuid || 

//activities: || activity_id || user_uuid || name || date || indoor || socialinteraction || proximity || peoplepresent ||

//notifications: || notification_uuid || user_uuid || pod_uuid || sender_uuid || message || created_date || accepted || 

module.exports = tables;