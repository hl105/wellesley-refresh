export function formatDayOfWeek(dayOfWeek: number) {
    switch (dayOfWeek) {
    	case 0: return "Sunday"; break;
        case 1: return "Monday"; break;
        case 2: return "Tuesday"; break;
        case 3: return "Wednesday"; break;
        case 4: return "Thursday"; break;
        case 5: return "Friday"; break;
        case 6: return "Saturday"; break;
    }
}

export function formatMonth(month: number) {
	switch (month) {
    	case 0: return "Jan"; break;
        case 1: return "Feb"; break;
        case 2: return "Mar"; break;
        case 3: return "Apr"; break;
        case 4: return "May"; break;
        case 5: return "Jun"; break;
        case 6: return "Jul"; break;
        case 7: return "Aug"; break;
        case 8: return "Sep"; break;
        case 9: return "Oct"; break;
        case 10: return "Nov"; break;
        case 11: return "Dec"; break;
    }
}

export function formatDate(dateString: string) {
    const [year, month, day] = dateString.split('-').map(Number);
    const date = new Date(year, month - 1, day);
	return `${formatDayOfWeek(date.getDay())}, ${formatMonth(date.getMonth())}. ${date.getDate()}`;
}