class project{
  let id;
  let name;
  let description;
  let date expectedDone = new Date();
  let date actualDone = new Date();
  let milestoneList = [];

  constructor(){
    //set the id of the project
    //not sure how to do that right now
  }

  constructor(name, description){
    this.name = name;
    this.description = description;
  }

  constructor(name, description){
    this.name = name;
    this.description = description;
    this.milestoneList = //new array
  }

  constructor(name, description, id, milestoneList)
    this.name = name;
    this.description = description;
    this.id = id;
    this.milestoneList = milestoneList;
  }

  get milestoneList(milestoneList){
    return this.milestoneList;
  }

  set milestoneList(milestoneList){
    this.milestoneList = milestoneList;
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

  get description(description){
    return  this.description;
  }

  set description(description){
    this.description = description;
  }

  get expectedDone(expectedDone){
    return this.expectedDone;
  }

  set expectedDone(expectedDone){
    this.expectedDone = expectedDone;
  }

  get actualDone(actualDone){
    return this.actualDone;
  }

  set actualDone(actualDone){
    this.actualDone = actualDone;
  }
