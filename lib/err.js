export function checkGender(gender) {
    if (gender !== "male" && gender !== "female") {
        const err = new Error("Gender different male or female");
        throw err;
    }
    return gender;
}