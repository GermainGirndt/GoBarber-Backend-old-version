import Appointment from '../models/Appointment';
import { isEqual } from 'date-fns';

interface CreateAppointmentDTO {
    provider: string;
    date: Date;
}

class AppointmentsRespository {
    private appointments: Appointment[];

    constructor() {
        this.appointments = [];
    }

    public all(): Appointment[] {
        return this.appointments;
    }

    public findByDate(date: Date): Appointment | null {
        // isEqual function -> check if dates are equal and returns true/false
        const findAppointment = this.appointments.find(appointment => {
            console.log(date);
            console.log(appointment);
            return isEqual(date, appointment.date);
        });

        console.log('find by date is being executed');

        // '||' behaves like an 'else'
        return findAppointment || null;
    }

    // defined typescript type with ': Appointment'
    public create({ provider, date }: CreateAppointmentDTO): Appointment {
        const appointment = new Appointment({ provider, date });

        this.appointments.push(appointment);

        console.log('New appointment saved');
        console.log(this.appointments);

        return appointment;
    }
}

export default AppointmentsRespository;
