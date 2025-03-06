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
    '53583459', 'Euxfh#Vsulqjvwhhq=#Eruq#lq#wkh#X1V1D1', '58:36:654', 0, 6,// 20250126: Bruce Springsteen: Born in the U.S.A., 257037321
    '5358345:', 'Eh|rqfì=#Vlqjoh#Odglhv?euA+Sxw#d#Ulqj#rq#Lw,', '5898597;9', 0.75, 6.75, // 20250127: Beyoncé: Single Ladies<br>(Put a Ring on It), 256526486
    '5358345;', 'E1r1E=#Qrwklq*#rq#\\rx?euA+ihdw1#Euxqr#Pduv,', '54745:;;4', 91.5, 97.5, // 20250128: B.o.B: Nothin' on You<br>(feat. Bruno Mars), 214127881
    '5358345<', 'Pdgrqqd=#Pdwhuldo#Jluo', '547;3:3::', 50.1, 56.1, // 20250129: Madonna: Material Girl, 214807077
    '53583463',  'Rdvlv=#Zrqghuzdoo', '5;6<:86;;', 113.15, 119.15, // 20250130: Oasis: Wonderwall, 283975388
    '53583464', 'Vdqwdqd=#Pduld#Pduld?euA+ihdw1#Wkh#Surgxfw#J)E,', '5874:44:<', 17.4, 23.4, // 20250131: Santana: Maria Maria<br>(feat. The Product G&B), 254171179
    '53583534', 'Frogsod|=#\\hoorz', '588::368;', 63, 69, // 20250201 | Coldplay: Yellow | 255770358
    '53583535', 'Qluydqd=#Vphoov#Olnh#Whhq#Vslulw', '58;<87736', 7.6, 13.6, // 20250202 | Nirvana: Smells Like Teen Spirit | 258954403
    '53583536', 'Zklwqh|#Krxvwrq=#L#Zdqqd#Gdqfh?euAzlwk#Vrpherg|#+Zkr#Oryhv#Ph,', '586:<<:47', 186.25, 192.25, // 20250203 | Whitney Houston: I Wanna Dance<br>with Somebody (Who Loves Me) | 253799714
    '53583537', 'V}d=#Rshq#Dupv#+ihdw1#Wudylv#Vfrww,', '46<9;;3;<<', 179, 185, // 20250204 | Sza: Open Arms (feat. Travis Scott) | 1396880899
    '53583538', 'Ohg#]hssholq=#Vwdluzd|#wr#Khdyhq', '58954:;<5', 20, 26, // 20250205 | Led Zeppelin: Stairway to Heaven | 256217892
    '53583539', 'Kduu|#Vw|ohv=#Zdwhuphorq#Vxjdu', '<789:9843', 45.85, 51.95, // 20250206 | Harry Styles: Watermelon Sugar | 945676510
    '5358353:', 'Nhqgulfn#Odpdu=#Sulgh', '64:94:555', 8.5, 14.5, // 20250207 | Kendrick Lamar: Pride | 317617222
    '5358353;', 'Ehh#Jhhv=#Vwd|lq#Dolyh', '588<<6:57', 12.65, 18.65, // 20250208 | Bee Gees: Stayin Alive | 255993724
    '5358353<', 'Grq#Wrolyhu=#Qr#Lghd', '95;848738', 102.35, 108.35, // 20250209 | Don Toliver: No Idea | 628515405
    '53583543', 'Txhhq=#Erkhpldq#Ukdsvrg|', '5864995:6', 17.75, 23.75, // 20250210 | Queen: Bohemian Rhapsody | 253166273
    '53583544', 'Gudnh=#Khdgolqhv', '58:794854', 10, 16, // 20250211 | Drake: Headlines | 257461521
    '53583545', 'Wdph#Lpsdod=?euAWkh#Ohvv#L#nqrz#Wkh#Ehwwhu', '589574665', 119, 125, // 20250212 | Tame Impala:<br>The Less I know The Better | 256241332
    '53583546', 'Deed=#Gdqflqj#Txhhq', '5864;:666', 10.75, 16.75, // 20250213 | Abba: Dancing Queen | 253187333
    '53583547', 'U1H1P1=#Pdq#Rq#Wkh#Prrq', '55397::56', 80, 86, // 20250214 | R.E.M.: Man On The Moon | 220647723
    '53583548', 'Fholqh#Glrq=?euAP|#Khduw#Zloo#Jr#Rq', '5895;4;<;', 20.4, 26.6, // 20250215 | Celine Dion:<br>My Heart Will Go On | 256281898
    '53583549', 'Frrolr=#Jdqjvwd*v#Sdudglvh', '44;:4767<', 48.5, 54.5, // 20250216 | Coolio: Gangsta's Paradise | 118714349
    '5358354:', 'Jhrujh#Plfkdho=#Fduhohvv#Zklvshu', '645;4453:', 14.25, 20.25, // 20250217 | George Michael: Careless Whisper | 312811207
    '5358354;', 'Fkhu=#Eholhyh', '4969934;68', 58.5, 64.5, // 20250218 | Cher: Believe | 1636601835
    '5358354<', 'Slqn#Ior|g=?euADqrwkhu#Eulfn#lq#wkh#Zdoo/#Sw1#5', '588:78785', 1.2, 7.2, // 20250219 | Pink Floyd:<br>Another Brick in the Wall, Pt. 2 | 255745452
    '53583553', 'Fduo|#Udh#Mhsvhq=#Fdoo#Ph#Pd|eh', '58696895:', 20.25, 26.15, // 20250220 | Carly Rae Jepsen: Call Me Maybe | 253635627
    '53583554', 'Pdurrq#8=#Pryhv#Olnh#Mdjjhu?euA+ihdw1#Fkulvwlqd#Djxlohud,', '4<838;55', 43.1, 49.1, // 20250221 | Maroon 5: Moves Like Jagger<br>(feat. Christina Aguilera) | 19505822
    '53583555', 'Nhqgulfn#Odpdu=#Qrw#Olnh#Xv', '4;47:3<4;<', 162.6, 168.6, // 20250222 | Kendrick Lamar: Not Like Us | 1814709189
    '53583556', 'Pdf#Ploohu=#Frqjudwxodwlrqv#+ihdw1#Elodo,', '5;3<:;:84', 187.25, 193.25, // 20250223 | Mac Miller: Congratulations (feat. Bilal) | 280978751
    '53583557', 'Vxuylyru=#H|h#ri#wkh#Wljhu', '58746664:', 8, 14, // 20250224 | Survivor: Eye of the Tiger | 254133317
    '53583558', 'Iohhwzrrg#Pdf=#Olwwoh#Olhv', '<5:<65953', 98.25, 104.25, // 20250225 | Fleetwood Mac: Little Lies | 927932620
    '53583559', 'Gxudq#Gxudq=#Ruglqdu|#Zruog', '895787676', 17.9, 23.9, // 20250226 | Duran Duran: Ordinary World | 562454343
    '5358355:', 'Jrw|h=#Vrpherg|#Wkdw#L?euAXvhg#Wr#Nqrz#+ihdw1#Nlpeud,', '4;4<68;:', 91.25, 97.25, // 20250227 | Gotye: Somebody That I<br>Used To Know (feat. Kimbra) | 18193587
    '5358355;', 'Eh|rqfì=#Wh{dv#Krog#*Hp', '4:77688835', 39.25, 45.25, // 20250228 | Beyoncé: Texas Hold 'Em | 1744355502
    '53583634', 'Wrwr=#Diulfd', '5863<43;7', 9.25, 15.25, // 20250301 | Toto: Africa | 253091084
    '53583635', 'Vpdvk#Prxwk=#L*p#D#Eholhyhu', '585:;4:8:', 3.9, 9.9, // 20250302 | Smash Mouth: I'm A Believer | 252781757
    '53583636', 'Vwlqj=#Hqjolvkpdq#lq#Qhz#\\run', '5864<5887', 70, 76, // 20250303 | Sting: Englishman in New York | 253192554
    '53583637', 'Wd|oru#Vzliw=#Vkdnh#Lw#Rii?euA+Wd|oru*v#Yhuvlrq,', '4983734;:7', 5, 11, // 20250304 | Taylor Swift: Shake It Off<br>(Taylor's Version) | 1650401874
    '53583638', 'Fkulvwlqd#Shuul=#D#Wkrxvdqg#\\hduv', '99;43<58', 92, 98, // 20250305 | Christina Perri: A Thousand Years | 66810925
    '53583639', 'Oruhq#Doouhg=#Qhyhu#Hqrxjk', '84987664;', 63.5, 69.75, // 20250306 | Loren Allred: Never Enough | 516543318
    '5358363:', 'X5=#Qhz#\\hdu*v#Gd|', '4::399989', 94, 100, // 20250307 | U2: New Year's Day | 177066656
    '5358363;', 'Hplqhp=#Wkh#Uhdo#Volp#Vkdg|', '589589;;:', 7.75, 13.75, // 20250308 | Eminem: The Real Slim Shady | 256256887
    '5358363<', 'Ghhs#Eoxh#Vrphwklqj=?euAEuhdnidvw#dw#Wliidq|*v', '4:9569947', 56.5, 62.5, // 20250309 | Deep Blue Something:<br>Breakfast at Tiffany's | 176236614
    '53583643', 'Pdwdoolfd=#Qrwklqj#Hovh#Pdwwhuv', ':;;3;3<<3', 127.75, 133.75, // 20250310 | Matallica: Nothing Else Matters | 788080990
    '53583644', 'Qr#Grxew=#Grq*w#Vshdn', '7756846;3', 46.1, 52.1, // 20250311 | No Doubt: Don't Speak | 442351380
    '53583645', 'Gdylg#Jxhwwd#)#Odg|#Jdjd=?euAEdqj#Edqj#+P|#Ede|#Vkrw#Ph#Grzq,', '549:<6;;7', 53.25, 59.25, // 20250312 | David Guetta & Lady Gaga:<br>Bang Bang (My Baby Shot Me Down) | 216793884
    '53583646', 'F|suhvv#Kloo=#Lqvdqh#Lq#Wkh#Eudlq', '4<:3:73:3', 58.65, 64.65, // 20250313 | Cypress Hill: Insane In The Brain | 197074070
    '53583647', 'SV\\=#Jdqjqdp#Vw|oh', '96468536', 66.25, 72.25, // 20250314 | PSY: Gangnam Style | 63135203

    '53583734', 'Ulfn#Dvwoh|=#Qhyhu#Jrqqd#Jlyh#\\rx#Xs=?euAP|#Khduw#Zloo#Jr#Rq', '4575;9;948', 42.8, 48.7, // 20250401 | Rick Astley: Never Gonna Give You Up:<br>My Heart Will Go On | 1242868615
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