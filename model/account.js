class account{
  let id;
  let name;
  let username;
  let password;
  let projectlist [];

  constructor(){
    //random user id is given
  }

  constructor(name, username password){
    this.name = name;
    this.username username;
    this.password = password;
  }

  constructor(name, username, password, id, projectlist){
    this.name = name;
    this.username username;
    this.password = password;
    this.id= id;
    this.projectlist = projectlist;
  }

  get id(id){
    return this.id;
  }

  set id(id){
    this.id = id;
  }

  get name(name){
    return this.name;
  }

  set name(name){
    this.name = name;
  }

  get username(username){
    return this.username;
  }

  set username(username){
    this.username = username;
  }

  get password(password){
    return this.password;
  }

  set password(password){
    this.password = password;
  }

  get projectlist(projectlist){
    return this.projectlist;
  }

  set projectlist(projectlist){
    this.projectlist = projectlist;
  }
}
