export default function LinkCounter() {
    let count = 0;

    function incrementCounter() {
        count++;
        // console.log(count);
        return count
    }

    return incrementCounter;
}