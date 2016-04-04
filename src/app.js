user1 = new User('User1');
user2 = new User('User2');
user1Chat = new ChatApp(user1.getName(),user2.getName());
user2Chat = new ChatApp(user2.getName(),user1.getName());
user1Chat.init();
user2Chat.init();
