export class Incidents {

    constructor(
        public id?: number,
        public incidentNo?: number,
        public priority?: string,
        public description?: string,
        public narration?: string,
        public customerInfo?: string,
        public status?: string,
        public date?: string,
        public duration?: number,
        public comment?: string,
        public assigne?: string,
        public resolution?: string  
    ){ }
}
