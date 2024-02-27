
let instance: any
export class Post{
  constructor(){
    if(!instance){
        instance = this
    }
    return instance
  }
  
  
}