const fs_extra = require('fs-extra');
const path = require('path');
const moment = require('moment');
const {pool} = require('../sql/connectToDatabase');
const {sentNotificationOnSetTime} = require('../controller/sentNotification');
const { getCommonKeys, setSQLBooleanValue } = require('./main');
const { autoVerifyNotification } = require('../controller/autoRunQuery');

const sendNotificationOnSetTime = async () => {
    console.log("send notification on specific time", new Date());
    try {
        // Fetch pending notifications
        const Notifications = await pool.query(`
            EXEC get_pending_background_notification
        `);

        // Fetch users with active status
        const users = await pool.query(`
            SELECT NotificationToken, BussinessName, RegisterMobile FROM tbl_users WHERE MasterAccount = 1 AND Status = 1
        `);

        // Iterate through notifications
        for (const notification of Notifications.recordset) {
            await sendNotificaton(notification, users.recordset);
            await pool.query(`
                UPDATE tbl_sent_background_notification 
                SET SentStatus = 1 
                WHERE SentBackgroundNotificationId = ${notification.SentBackgroundNotificationId}
                `);
            if(notification?.BellNotification){
                await addInnerNotification(notification);
            }
        }
    } catch (error) {
        console.log('send notification on specific time error:', error);
    }
}

const sendNotificaton = async (notification, users) => {
    for (const user of users) {
        if (user.NotificationToken) {
            await sentNotificationOnSetTime({
                body: {
                    Title: notification.Title,
                    Description: notification.Description,
                    NotificationToken: user.NotificationToken,
                    Image: notification.Image,
                    BussinessName: user.BussinessName,
                    RegisterMobile: user.RegisterMobile,
                    Link: notification.Link
                }
            });
        }
    }
}

const addInnerNotification = async (notification) => {
    const { IPAddress, ServerName, EntryTime } = getCommonKeys();
    const LinkType = notification.LinkType === 'App' ? 1 : 2;

    // Format the date using moment.js
    const formattedDate = moment(notification.SentTime).format('YYYY-MM-DD');
    const EndDate = moment(notification.SentTime).add(2, 'days').format('YYYY-MM-DD');

    const insertQuery = `INSERT INTO tbl_notification (Title,Description,Image,StartDate,EndDate,Status,Link,LinkType,IPAddress,ServerName,EntryTime) VALUES (
        N'${notification.Title}',
        N'${notification.Description}',
        '${notification.Image}', 
        '${formattedDate}', 
        '${EndDate}', 
        ${setSQLBooleanValue(true)},
        '${notification.Link}',
        '${LinkType}',
        '${IPAddress}',
        '${ServerName}',
        '${EntryTime}'
    )`;

    const result = await pool.query(insertQuery);
    await autoVerifyNotification();
};
module.exports = {
    sendNotificationOnSetTime
}