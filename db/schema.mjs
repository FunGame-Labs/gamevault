export const POLYBASE_SCHEMA = `
@public
collection File {  
  id: string;
  title: string;
  description: string;
  date: string;
  file: string;
  owner: string;

  constructor (id: string, title: string, description: string, date: string, file: string, owner: string) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.date = date;
    this.file = file;
    this.owner = owner;
  }

  @index([date, desc]);
}
`
