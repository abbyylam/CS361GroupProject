exports.OnSQLError = (connection, error) => {
    console.error('Error');
    console.error(error);
    try {
        connection.end();
    } catch (err) {
        console.error('Error occurred on the disconnect');
        console.error(err);
    }
    process.exit(1);
}