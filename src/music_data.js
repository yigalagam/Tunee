// Audio data: every date is associated with a song title, soundcloud track number, start time and end time.

function getTodayDateStr() {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    const dateStr = year + month + day
    return dateStr
}

const audioDataAll = {
    '20250104': ['Coldplay: Viva La Vida', '255770309', 177.5, 184],
    '20250105': [],
    '20250106': [],
    '20250107': [],
    '20250108': [],
    '20250109': [],
    '20250110': [],
    '20250111': [],
    '20250112': [],
    '20250113': [],
    '20250114': [],
    '20250115': [],
    '20250116': [],
    '20250117': [],
    '20250118': [],
}

function getAudioData(dateStr) {
    const audioData = audioDataAll[dateStr]
    const songTitle = audioData[0]
    const soundcloudLink = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + audioData[1]
    const startTime = audioData[2]
    const endTime = audioData[3]
    return [songTitle, soundcloudLink, startTime, endTime]
}