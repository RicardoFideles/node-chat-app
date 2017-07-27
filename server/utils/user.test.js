const expect = require('expect');
const {Users} = require('./users');


describe('Users', () => {
    var users;
    beforeEach(() => {
        users = new Users();
        users.users = [{
            id : 1,
            name: 'Mike',
            room : 'Game place'
        },
        {
            id : 2,
            name: 'Jhon',
            room : 'News place'
        },
        {
            id : 3,
            name: 'Ruan',
            room : 'Game place'
        }];
    });
    it('shoud add new user', () => {
        var users = new Users();
        var user = {
            id : 12,
            name :  'Jhon', 
            room : 'Game place'
        }
        var res = users.addUser(user.id, user.name, user.room);
        expect(users.users.length).toBe(1);
        expect(users.users).toEqual([user]);
    });

    it('should return names for Game place', () =>{
        var usersList = users.getUserList('Game place');
        expect(usersList.length).toBe(2);
        expect(usersList).toEqual(['Mike','Ruan']);
    });

    it('should return Mike User', () =>{
        var user = users.getUser(1);
        expect(user).toEqual(users.users[0]);
        expect(user.id).toBe(1);
    });

    it('should not find User', () =>{
        var user = users.getUser(5);
        expect(user).toNotExist();
    });

    it('shoud remove a user ', () => {
        var userId = 1;
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('shoud not remove a user ', () => {
        var userId = 99;
        var user = users.removeUser(userId);
        expect(user).toNotExist();
        expect(users.users.length).toBe(3);
    });
});