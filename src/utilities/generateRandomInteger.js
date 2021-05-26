function generateRandomInterval(max, min) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
export default generateRandomInterval; // client-side
// module.exports = generateRandomInterval; // server-side