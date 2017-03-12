const expect = require('expect');
const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();
    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Jen',
      room: 'React Course'
    },{
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
      var users = new Users();
      var user = {
        id: 123,
        name: 'Andrew',
        room: 'The Office Fans'
      }
      var resUser = users.addUser(user.id, user.name, user.room);

      expect(users.users).toEqual([user]);
  });

  it('should names for users in node course', () => {
    var userList = users.getUserList('Node Course');

    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should names for users in react course', () => {
    var userList = users.getUserList('React Course');

    expect(userList).toEqual(['Jen']);
  });

  it('should remove a user', () => {
      var userId = '1';
      var user = users.removeUser(userId);

      expect(user.id).toBe(userId);
      expect(users.users.length).toBe(2);
    });

  it('should not remove user', () => {
    users.removeUser('1000');
    expect(users.users).toEqual([{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    },{
      id: '2',
      name: 'Jen',
      room: 'React Course'
    },{
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }]);
  });

  it('should find user', () => {
    var user = users.getUser('1');
    expect(user).toEqual({
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    });
  });

  it('should not find user', () => {
    var user = users.getUser('1000');
    expect(user).toNotExist();
  });

});
