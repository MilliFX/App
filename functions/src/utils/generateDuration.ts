import moment from 'moment';

export const GenerateDuration = (duration: number = 30 ) => {
        //en
        moment.locale()

        var currentDate = moment();
        var daysAgo = currentDate.subtract(duration, 'days');

        var startDate: string = moment(currentDate).format("YYYY--MM-DD");
        var endDate: string = moment(daysAgo).format("YYYY--MM-DD");

        return {
            startDate: startDate,
            endDate: endDate
        }

}