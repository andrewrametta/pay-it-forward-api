INSERT INTO messages
    (id, conversations_id, user_id, text, timestamp, message_status)
    VALUES
    (1,1,4,'I saw the couch you posted','2021-03-05 00:00:01','not seen'),
    (2,1,1,'It is still available','2021-03-05 00:00:02','not seen'),
    (3,1,4,'Can I come see it?','2021-03-05 00:00:03','not seen'),
    (4,1,1,'Sure, what day works for you?','2021-03-05 00:00:04','not seen'),
    (5,1,4,'I think I can do Monday','2021-03-05 00:00:06','not seen'),
    (6,1,1,'OK, see you then','2021-03-05 00:00:07','not seen');
ALTER SEQUENCE "messages_id_seq" RESTART WITH 7;