export const add_minutes = (dt, minutes) => {
    return new Date(dt.getTime() + minutes * 60000);
}