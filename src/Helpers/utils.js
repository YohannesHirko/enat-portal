export function getInitials(firstName, lastName) {
    const firstInitial = firstName.charAt(0).toUpperCase();
    const lastInitial = lastName.charAt(0).toUpperCase();
    return `${firstInitial}${lastInitial}`;
}
export function formatISODate(isoDate) {
    const date = new Date(isoDate);
    const options = {
        timeZone: `Europe/Moscow`,
        hour12: true,
        // year: "numeric",
        month: "numeric",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        // second: "numeric",
    };

    return date.toLocaleString("en-US", options);
}
export function calculateAge(dobString) {
    // Parse the input string into a Date object (assuming valid "YYYY-MM-DD" format)
    const dob = new Date(dobString);
    const today = new Date();

    // Calculate the difference in years
    let age = today.getFullYear() - dob.getFullYear();

    // Adjust if the birthday hasn't occurred yet this year
    const monthDifference = today.getMonth() - dob.getMonth();
    const dayDifference = today.getDate() - dob.getDate();

    if (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0)) {
        age--;
    }

    return age;
}
export const validateDOB = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);

    // Check if the date is valid and not in the future
    if (isNaN(birthDate.getTime()) || birthDate > today) {
        return "Invalid date of birth";
    }

    // Calculate age
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
        monthDiff < 0 ||
        (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
        return age - 1 >= 18 ? true : "Must be at least 18 years old";
    }

    // Check if the user is at least 18 years old
    return age >= 18 ? true : "Must be at least 18 years old";
};
