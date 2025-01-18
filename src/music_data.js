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

const audioDataAll = [
    '53583438', 'Frogsod|=#Ylyd#Od#Ylgd', '588::363<', 177.75, 183.15, // 20250105: Coldplay: Viva La Vida, 255770309
    '53583439', 'Frogsod|=#Ylyd#Od#Ylgd', '588::363<', 177.75, 183.15, // 20250106: Coldplay: Viva La Vida, 255770309
    '5358343:', 'Gdylg#Jxhwwd=#Wlwdqlxp#+ihdw1#Vld,', '549873;:8', 71.5, 77.5, // 20250107: David Guetta: Titanium (feat. Sia), 216540875
    '5358343;', 'Euxqr#Pduv=#Frxqw#rq#Ph', '589377;64', 20, 26, // 20250108: Bruno Mars: Count on Me, 256044831
    '5358343<', 'Wkh#Zklwh#Vwulshv=#Vhyhq#Qdwlrq#Dup|', '5;5877597', 19.6, 25.6, // 20250109: The White Stripes: Seven Nation Army, 282544264
    '53583443', 'GM#Fdvshu#0#Wkh#Fkd#Fkd#Volgh#+M1H1J#Hglw,', '47:89647', 133.25, 139, // 20250110: DJ Casper: The Cha Cha Slide (J.E.G Edit), 14756314
    '53583444', 'Wudylv#Vfrww=#L#NqrzB', '48:9648:;<', 31, 38, // 20250111: Travis Scott: I Know?, 1576315789
    '53583445', 'Dghoh=#Khoor', '58773:<73', 11.95, 17.65, // 20250112: Adele: Hello, 254407940
    '53583446', 'U1H1P1=#Orvlqj#P|#Uholjlrq', '5<474969:', 44, 49.4, // 20250113: R.E.M.: Losing My Religion, 291416367
    '53583447', 'Eh|rqfì=#Mrohqh', '4:;963:4;:', 8.35, 14.25, // 20250114: Beyoncé: Jolene
    '53583448', 'Hg#Vkhhudq=#Vkdsh#ri#\\rx', '634494456', 130.25, 135.35, // 20250115: Ed Sheeran: Shape of You, 301161123
    '53583449', 'Pdun#Urqvrq=?euAXswrzq#Ixqn#+ihdw1#Euxqr#Pduv,', '59886853;', 15, 21, // 20250116: Mark Ronson: Uptown Funk (feat. Bruno Mars), 265535208
    '5358344:', 'Duhwkd#Iudqnolq=#Uhvshfw', '7::43:9:<', 109, 114.75, // 20250117: Aretha Franklin: Respect
    '5358344;', 'V}d=#Nloo#Eloo', '46<9;;37;8', 108.35, 113.9, // 20250118: SZA: Kill Bill
    '5358344<', 'Hooh#Nlqj=#H{*v#)#Rk*v', '49;;94;6;', 13.9, 19.4, // 20250119: Elle King: Ex's & Oh's, 168861838
    '53583453', 'Wd|oru#Vzliw=?euAZloghvw#Guhdpv#+Wd|oru*v#Yhuvlrq,', '44594<75<;', 99.8, 105.88, // 20250120: Taylor Swift: Wildest Dreams (Taylor's Version), 1126194298
    '53583454', 'Lpdjlqh#Gudjrqv=#Eholhyhu#+ihdw1#Olo#Zd|qh,', '8888;7586', 183.6, 189.6,// 20250121: Imagine Dragons: Believer (feat. Lil Wayne), 555584253
    '53583455', 'Dghoh=#Vn|idoo', '5:67;3553', 81.1, 87.1, // 20250122: Adele: Skyfall, 273480220
    '53583456', 'Hplqhp=?euAWkh#Prqvwhu#+ihdw1#Ulkdqqd,', '589589:<6', 50.6, 56.6, // 20250123: Eminem: The Monster (feat. Rihanna), 256256793
    '53583457', 'Plfkdho#Mdfnvrq=#Ehdw#Lw', '5:;83<675', 21.5, 27.5, // 20250124: Michael Jackson, Beat It, 278509342
    '53583458', 'Ol}}r=#Mxlfh', '8858:3<96', 65.7, 71.7, // 20250125: Lizzo: Juice, 552570963
    '53583459', // 20250126: 
    '5358345:', // 20250127: 
    '5358345;', // 20250128: 
    '5358345<', // 20250129: 
    '53583463', // 20250130: 
    '53583464', // 20250131: 
]

function getAudioData(dateStr) {
    const audioIndex = audioDataAll.findIndex(value => value == shiftAscii(dateStr, 3))
    const songTitle = shiftAscii(audioDataAll[audioIndex + 1], -3)
    const soundcloudLink = 'https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/' + shiftAscii(audioDataAll[audioIndex + 2], -3) + '&auto_play=false'
    const startTime = audioDataAll[audioIndex + 3]
    const endTime = audioDataAll[audioIndex + 4]
    return [songTitle, soundcloudLink, startTime, endTime]
}

function shiftAscii(str, shift) {
    return str.split('').map((char) => String.fromCharCode(char.charCodeAt(0) + shift)).join('');
}