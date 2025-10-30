export const italianDate = (dataGame, time = false) => {
    const data = new Date(dataGame);
    const options= {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }
    if(time){
        options.hour = '2-digit';
        options.minute = '2-digit';
        options.second = '2-digit';
    }

    return data.toLocaleDateString('it-IT', options)
};