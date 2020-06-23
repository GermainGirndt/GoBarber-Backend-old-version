import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

const appointmentsRouter = Router();

const appointmentsRepository = new AppointmentsRepository();

// route gets '/appointments' from index.ts
appointmentsRouter.post('/', (request, response) => {
    console.log(`Incoming request:`);
    console.log(request.method);
    console.log(request.body);
    const { provider, date } = request.body;

    // parseISO converts String to Date (JS)
    // startOfHour brings the Data object back to the hour beguin
    const parsedDate = startOfHour(parseISO(date));
    console.log('here');
    console.log(parsedDate);

    const findAppointmentInSameDate = appointmentsRepository.findByDate(
        parsedDate,
    );

    console.log(findAppointmentInSameDate);

    if (findAppointmentInSameDate) {
        return response
            .status(400)
            .json({ message: 'This appointment is already booked' });
    }

    const appointment = appointmentsRepository.create(provider, parsedDate);

    return response.json(appointment);
});

export default appointmentsRouter;
