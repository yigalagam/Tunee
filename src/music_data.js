// Audio data: every date is associated with a song title, soundcloud track number, start time and end time.
// Song information is scambled by adding 10 to ascii codes.

function getTodayDateStr() {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    const dateStr = year + month + day
    return dateStr
}

const audioDataAll = {
    '53583437': ["Frogsod|=#Ylyd#Od#Ylgd", '588::363<', 177.75, 184.25], // 20250105: Coldplay: Viva La Vida, 255770309
    '53583438': ['U1H1P1=#Orvlqj#P|#Uholjlrq', '5<474969:', 44, 49.5], // 20250105: R.E.M.: Losing My Religion, 291416367
    '53583439': ['GM#Fdvshu#0#Wkh#Fkd#Fkd#Volgh#+M1H1J#Hglw,', '47:89647', 133.25, 139], // 20250106: DJ Casper: The Cha Cha Slide (J.E.G Edit), 14756314
    '5358343:': ['Gdylg#Jxhwwd=#Wlwdqlxp#+ihdw1#Vld,', '549873;:8', 71.5, 77.5], // 20250107: David Guetta: Titanium (feat. Sia), 216540875
    '5358343;': [], // 20250108: 
    '5358343<': [], // 20250109: 
    '53583443': [], // 20250110: 
    '53583444': [], // 20250111: 
    '53583445': [], // 20250112: 
    '53583446': [], // 20250113: 
    '53583447': [], // 20250114: 
    '53583448': [], // 20250115: 
    '53583449': [], // 20250116: 
    '5358344:': [], // 20250117: 
    '5358344;': [], // 20250118: 
    '5358344<': [], // 20250119: 
    '53583453': [], // 20250120: 
    '53583454': [], // 20250121: 
    '53583455': [], // 20250122: 
    '53583456': [], // 20250123: 
    '53583457': [], // 20250124: 
    '53583458': [], // 20250125: 
    '53583459': [], // 20250126: 
    '5358345:': [], // 20250127: 
    '5358345;': [], // 20250128: 
    '5358345<': [], // 20250129: 
    '53583463': [], // 20250130: 
    '53583464': [], // 20250131: 
}

function getAudioData(dateStr) {
    const audioData = audioDataAll[shiftAscii(dateStr, 3)]
    const songTitle = shiftAscii(audioData[0], -3)
    const soundcloudLink = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + shiftAscii(audioData[1], -3)
    const startTime = audioData[2]
    const endTime = audioData[3]
    return [songTitle, soundcloudLink, startTime, endTime]
}

function shiftAscii(str, shift) {
    return str.split('').map((char) => String.fromCharCode(char.charCodeAt(0) + shift)).join('');
}