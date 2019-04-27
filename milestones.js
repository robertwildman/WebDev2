class milestones{
  let name;
  let description;
  let id;
  let pId;
  let date milestoneDue = new date();
  let date mactualDone = new Date();
  let p = new project();

  constructor(name, description, pId) {
    this.Name = name;
    this.description = description;
    this.pId = pId;
  }

  constructor(name, description, id, pId) {
    this.Name = name;
    this.description = description;
    this.id = id;
    this.pId = pId;
  }

  get pId(pId){
    return this.pId;
  }

  set pId(pId){
    this.pId = pId;
  }

  get name(name){
    return  this.name;
  }

  set name(name){
    this.name = name;
  }

  get id(id){
    return this.id;
  }

  set id(id){
    this.id = id;
  }

  get milestoneDue(milestoneDue){
    return this.milestoneDue;
  }

  set milestoneDue(milestoneDue){
    this.milestoneDue = milestoneDue;
  }

  get mactualDone(mactualDone){
    return this.mactualDone;
  }

  set mactualDone(mactualDone){
    this.mactualDone = mactualDone;
  }
}
