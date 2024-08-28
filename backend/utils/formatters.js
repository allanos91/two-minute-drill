//formats the date

const formatDate = (date) => {
    const options = {
        timeZone: 'America/Los_Angeles', // This will handle PST/PDT conversion
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      };

    let newDate = date.toLocaleString('en-US', options)
    return newDate
}

module.exports = {
    formatDate
  };
