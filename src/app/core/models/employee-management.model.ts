export interface IEmployeeQuery {
    offset?: number;
    limit?: number;
    skip?: number;
    order?: string;
    where?: {};
}

export class EmployeeQuery implements IEmployeeQuery {
    constructor (
      public offset?: number,
      public limit?: number,
      public skip?: number,
      public order?: string,
      public where?: {},
    ) {
      this.offset = offset ? offset : 0;
      this.limit = limit ? limit : null;
      this.skip = skip ? skip : null;
      this.order = order ? order : null;
      this.where = where ? where : {};
    }
  
}