import { uuid } from 'uuidv4';

// Class with typescript type - interface
class Appointment {
    id: string;

    provider: string;

    date: Date;

    // Omit: Sends all parameters (arg 1), but the omitted (arg2)
    constructor({ provider, date }: Omit<Appointment, 'id'>) {
        this.id = uuid();
        this.provider = provider;
        this.date = date;
    }
}

export default Appointment;
