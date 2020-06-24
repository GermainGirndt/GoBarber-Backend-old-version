import Appointment from '../models/Appointment';
import AppointmentsRespository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';

/**
 *
 * [x] Information reception
 * [/] Errors/Exceptions
 * [x] Repository access
 */

interface Request {
    provider: string;
    date: Date;
}

/**
 *
 * Dependency inversion (SOLID)
 *
 * if serves has an external dependency (eg. repositories)
 * We should not make another repository in the class.
 * Instead, we should receive the repository in the class and return it.
 *
 */

class CreateAppointmentService {
    private appointmentsRepository: AppointmentsRespository;

    constructor(appointmentsRepository: AppointmentsRespository) {
        this.appointmentsRepository = appointmentsRepository;
    }

    public execute({ date, provider }: Request): Appointment {
        // startOfHour brings the Data object back to the hour beguin
        const appointmentDate = startOfHour(date);
        console.log('here');
        console.log(date);

        const findAppointmentInSameDate = this.appointmentsRepository.findByDate(
            appointmentDate,
        );

        console.log(findAppointmentInSameDate);

        if (findAppointmentInSameDate) {
            throw Error('This appointment is already booked');
        }

        const appointment = this.appointmentsRepository.create({
            provider,
            date: appointmentDate,
        });
        return appointment;
    }
}
export default CreateAppointmentService;
