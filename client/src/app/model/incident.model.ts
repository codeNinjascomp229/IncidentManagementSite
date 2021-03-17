export class Incident {
    constructor(
        public id?: number,
      public incidentNo?: number,
      public priority?: string,
      public description?: string,
      public narrative?: string[],
      public customerInfo?: string,
      public status: string ="NEW",
      public date: string = Date(),
      public duration?: number,
      public comment?: string[],
      public assigne?: string,
      public resolution?: string
      ) { }
  }
  