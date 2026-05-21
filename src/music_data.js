// Audio data (6 second segments): every date is associated with a song title, Youtube video ID, start time.

function getTodayDateStr() {
    const today = new Date()
    const year = today.getFullYear()
    const month = (today.getMonth() + 1).toString().padStart(2, '0')
    const day = today.getDate().toString().padStart(2, '0')
    const dateStr = year + month + day
    return dateStr
}

const audioDataAll = [
    '20260521', 'Imagine Dragons: Believer', '7wtfhZwyrcc', 179.85,
    '20260522', 'Taylor Swift: Wildest Dreams', 'IdneKLhsWOQ', 99.65,
    '20260523', 'Led Zeppelin: Stairway to Heaven', 'X791IzOwt3Q', 192.4,
    '20260524', 'Coldplay: Viva La Vida', 'dvgZkm1xWPE', 177.6,
    '20260525', 'David Guetta: Titanium (feat. Sia)', 'JRfuAukYTKg', 71.5,    
    '20260526', 'Survivor: Eye of the Tiger', 'btPJPFnesV4', 8.5,
    '20260527', 'Queen: Bohemian Rhapsody', 'fJ9rUzIMcZQ', 84.5,
    '20260528', 'Dua Lipa: Love Again', 'BC19kwABFwc', 89.5,
    '20260529', "The Beatles:<br>Sgt. Pepper's Lonely Hearts Club Band", 'VtXl8xAPAtA', 64.5,
    '20260530', 'David Bowie: Starman', 't365MuktYQs', 54.75,
    '20260531', 'ABBA: Dancing Queen', 'xFrGuyw1V8s', 181.75,
    '20260601', 'Vance Joy: Riptide', 'uJ_1HMAGb4k', 165.25,
    '20260602', 'Santana: Maria Maria', 'nPLV7lGbmT4', 52.65,
    '20260603', 'Soundgarder: Black Hole Sun', '3mbBbFH9fAg', 113.75,
    '20260604', "Israel Kamakawiwo'ole:<br>Over The Rainbow", 'V1bFr2SWP1I', 39.6,
    '20260605', 'Cutting Crew:<br>(I Just) Died In Your Arms', '6dOwHzCHfgA', 18.2,
    '20260606', 'Garry Rafferty: Baker Street', 'Fo6aKnRnBxM', 107.25,
    '20260607', 'Gotye: Somebody That I Used To Know<br>(feat. Kimbra)', '8UVNT4wvIGY', 91.25,
    '20260608', 'Toni Braxton: Un-break My Heart', 'p2Rch6WvPJE', 61.35,
    '20260609', 'Oasis: Champagne Supernova', 'tI-5uv4wryI', 127.6,
    '20260610', 'Simon & Garfunkel: Mrs. Robinson', '9C1BCAgu2I8', 116.25,
    '20260611', 'Ed Sheeran: Shape of You', 'JGwWNGJdvx8', 135.95,
    '20260612', 'White Town: Your Woman', 'lVL-zZnD3VU', 83,
    '20260613', "Bee Gees: Stayin' Alive", 'fNFzfwLM72c', 41.75,
    '20260614', 'Cher: Believe', 'nZXRV4MezEw', 59,
    '20260615', 'Eminem ft. Rihanna: The Monster', 'EHkozMIXZ8w', 113.5,
    '20260616', "Beyoncé: Texas Hold 'Em", '238Z4YaAr1g', 39.25,
    '20260617', 'Madonna: Material Girl', '6p-lDYPR2P8', 98.85,
    '20260618', 'Kendrick Lamar: Not Like Us', 'H58vbez_m4E', 299.45,
    '20260619', 'Paula Abdul: Straight Up', 'El1kgCqD7Xk', 67.4,
    '20260620', "Bon Jovi: It's My Life", 'vx2u5uUu3DE', 58,
    '20260621', 'Elton John: Crocodile Rock', '75r0nQu-hMs', 130.1,
    '20260622', 'Duran Duran: Ordinary World', 'FqIACCH20JU', 54,
    '20260623', 'Nickelback: How You Remind Me', 'Aiay8I5IPB8', 20,
    '20260624', 'Pink Floyd: Brain Damage', 'QFdkM40KOhE', 96.5,
    '20260625', 'Eagles: Hotel California', 'dLl4PZtxia8', 0.25,
    '20260626', 'Amy Winehouse: Back To Black', 'TJAfLE39ZZ8', 76.5,
    '20260627', 'The Stranglers: Golden Brown', 'W2o_HupXq1g', 18.75,
    '20260628', 'The Cranberries: Zombie', '6Ejga4kJUts', 94.55,
    '20260629', 'Dire Straits: Money For Nothing', 'wTP2RUD_cL0', 134.5,
    '20260630', 'The Animals:<br>The House Of The Rising Sun', 'N4bFqW_eu2I', 62,
    '20260701', 'Dido: Thank You', '1TO48Cnl66w', 18.55,
    '20260702', 'The Verve: Bittersweet Symphony', '1lyu1KKwC74', 10.8,
    '20260703', 'Rick Astley: Never Gonna Give You Up', 'dQw4w9WgXcQ', 125.75,
    '20260704', 'Beyoncé:<br>Single Ladies (Put a Ring on It)', '4m1EFMoRFvY', 47.9,
    '20260705', 'Extreme: More Than Words', 'UrIiLvg58SY', 27,
    '20260706', 'John Denver:<br>Take Me Home, Country Roads', '1vrEljMfXYo', 30.5,
    '20260707', 'The Cardigans: Lovefool', 'NI6aOFI7hms', 171.2,
    '20260708', 'Nirvana: Smells Like Teen Spirit', 'hTWKbfoikeg', 7.6,
    '20260709', 'Irene Cara:<br>Flashdance... What a Feeling', 'ILWSp0m9G2U', 70,
    '20260710', 'Christina Perri: A Thousand Years', 'rtOvBOTyX00', 69.8,
    '20260711', 'The Rolling Stones: Paint It, Black', 'O4irXQhgMqg', 14,
    '20260712', 'Don McLean: American Pie', 'PRpiBpDy7MQ', 294.8,
    '20260713', 'Taylor Swift: Love Story', '8xg3vE8Ie_E', 77.35,
    '20260714', 'The Bangles: Eternal Flame', 'PSoOFn3wQV4', 9.3,
    '20260715', 'George Michael: Careless Whisper', 'izGwDsrQ1eQ', 14,
    '20260716', 'Whitney Houston: How Will I Know', 'm3-hY-hlhBg', 74.35,
    '20260717', 'Imagine Dragons: Demons', 'mWRsgZuwf_8', 178.8,
    '20260718', 'Pearl Jam: Black', 'qgaRVvAKoqQ', 254.3,
    '20260719', 'Berlin: Take My Breath Away', 'Bx51eegLTY8', 58.5,
    '20260720', 'Adele: Skyfall', 'q-gLRp5bSpw', 82.3,
    '20260721', 'Pharrell Williams: Happy', 'ZbZSe6N_BXs', 30,
    '20260722', 'U.S.A. For Africa: We Are the World', '9AjkUyX0rVw', 214.5,
    '20260723', 'a-ha: The Sun Always Shines on T.V.', 'a3ir9HC9vYg', 114.3,
    '20260724', 'Green Day: Good Riddance<br>(Time of Your Life)', 'CnQ8N1KacJc', 112,
    '20260725', 'Mr. C the Slide Man: Cha Cha Slide', 'wZv62ShoStY', 149.4,
    '20260726', 'Travis Scott: I Know?', 'X7aF3nZOS98', 33,
    '20260727', 'Adele: Hello', 'YQHsXMglC9A', 141.5,
    '20260728', 'R.E.M.: Losing My Religion', 'xwtdhWltSIg', 199,
    '20260729', "The Beatles: I've Just Seen A Face", 'm8LbJfC0SYM', 32.85,
    '20260730', 'Mark Ronson: Uptown Funk<br>(feat. Bruno Mars)', 'OPf0YbXqDm0', 15,
    '20260731', "Coolio: Gangsta's Paradise", 'fPO76Jlnz6c', 62.5,
    '20260801', 'SZA: Kill Bill', 'MSRcC626prw', 167.5,    '20260', 'SongTitle', 'videoID', 'startTime',
    '20260', 'SongTitle', 'videoID', 'startTime',
    '20260', 'SongTitle', 'videoID', 'startTime',
    '20260', 'SongTitle', 'videoID', 'startTime',
    '20260', 'SongTitle', 'videoID', 'startTime',
    '20260', 'SongTitle', 'videoID', 'startTime',
    '20260', 'SongTitle', 'videoID', 'startTime',





    '53583447', 'Eh|rqfì=#Mrohqh', '4:;963:4;:', 8.35, 14.25, // 20250114: Beyoncé: Jolene
     '53583455', 'Dghoh=#Vn|idoo', '5:67;3553', 81.1, 87.1, // 20250122: Adele: Skyfall, 273480220
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
    '53583539', 'Kduu|#Vw|ohv=#Zdwhuphorq#Vxjdu', '<789:9843', 45.85, 51.95, // 20250206 | Harry Styles: Watermelon Sugar | 945676510
    '5358353:', 'Nhqgulfn#Odpdu=#Sulgh', '64:94:555', 8.5, 14.5, // 20250207 | Kendrick Lamar: Pride | 317617222
    '5358353<', 'Grq#Wrolyhu=#Qr#Lghd', '95;848738', 102.35, 108.35, // 20250209 | Don Toliver: No Idea | 628515405
    '53583544', 'Gudnh=#Khdgolqhv', '58:794854', 10, 16, // 20250211 | Drake: Headlines | 257461521
    '53583545', 'Wdph#Lpsdod=?euAWkh#Ohvv#L#nqrz#Wkh#Ehwwhu', '589574665', 119, 125, // 20250212 | Tame Impala:<br>The Less I know The Better | 256241332
    '53583547', 'U1H1P1=#Pdq#Rq#Wkh#Prrq', '55397::56', 80, 86, // 20250214 | R.E.M.: Man On The Moon | 220647723
    '53583548', 'Fholqh#Glrq=?euAP|#Khduw#Zloo#Jr#Rq', '5895;4;<;', 20.4, 26.6, // 20250215 | Celine Dion:<br>My Heart Will Go On | 256281898
    '5358354;', 'Fkhu=#Eholhyh', '4969934;68', 58.5, 64.5, // 20250218 | Cher: Believe | 1636601835
    '5358354<', 'Slqn#Ior|g=?euADqrwkhu#Eulfn#lq#wkh#Zdoo/#Sw1#5', '588:78785', 1.2, 7.2, // 20250219 | Pink Floyd:<br>Another Brick in the Wall, Pt. 2 | 255745452
    '53583553', 'Fduo|#Udh#Mhsvhq=#Fdoo#Ph#Pd|eh', '58696895:', 20.25, 26.15, // 20250220 | Carly Rae Jepsen: Call Me Maybe | 253635627
    '53583554', 'Pdurrq#8=#Pryhv#Olnh#Mdjjhu?euA+ihdw1#Fkulvwlqd#Djxlohud,', '4<838;55', 43.1, 49.1, // 20250221 | Maroon 5: Moves Like Jagger<br>(feat. Christina Aguilera) | 19505822
    '53583555', 'Nhqgulfn#Odpdu=#Qrw#Olnh#Xv', '4;47:3<4;<', 162.6, 168.6, // 20250222 | Kendrick Lamar: Not Like Us | 1814709189
    '53583556', 'Pdf#Ploohu=#Frqjudwxodwlrqv#+ihdw1#Elodo,', '5;3<:;:84', 187.25, 193.25, // 20250223 | Mac Miller: Congratulations (feat. Bilal) | 280978751
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
    '53583648', 'Udglrkhdg=#Fuhhs', '43;3<:;334', 106, 112, // 20250315 | Radiohead: Creep | 1080978001
    '53583649', 'Wdlr#Fux}=#G|qdplwh', '47735:83<8', 24.4, 30.4, // 20250316 | Taio Cruz: Dynamite | 1440275095
    '5358364;', 'Wkh#Grruv=#Oljkw#P|#Iluh', '4<4<68<:33', 61.5, 67.5, // 20250318 | The Doors: Light My Fire | 1919359700
    '5358364<', 'Wrqhv#dqg#L=#Gdqfh#Prqnh|', '96598<737', 106, 112, // 20250319 | Tones and I: Dance Monkey | 632659404
    '53583653', 'Fud}|#Wrzq=#Exwwhuio|', '58683;876', 8.35, 14.35, // 20250320 | Crazy Town: Butterfly | 253508543
    '53583654', 'F|qwkld#Hulyr#+ihdw1#Duldqd#Judqgh,=?euAGhi|lqj#Judylw|', '4<97388<4<', 334.6, 340.6, // 20250321 | Cynthia Erivo (feat. Ariana Grande):<br>Defying Gravity | 1964055919
    '53583655', 'Plfkdho#Mdfnvrq=#Eloolh#Mhdq', '5:;83;:45', 20.5, 26.5, // 20250322 | Michael Jackson: Billie Jean | 278508712
    '53583656', 'Euxqr#Pduv=#Juhqdgh', '46<63353', 170.75, 176.75, // 20250323 | Bruno Mars: Grenade | 13930020
    '53583657', 'Ere#G|odq=#Eorzlq*#lq#wkh#Zlqg', '58959<563', 1.75, 7.75, // 20250324 | Bob Dylan: Blowin' in the Wind | 256269230
    '53583658', 'Sulqfh=#Sxusoh#Udlq', '755856474', 176, 182, // 20250325 | Prince: Purple Rain | 422523141
    '53583659', 'Wkh#Zhhnqg/#Sod|erl#Fduwl=#Wlphohvv', '4<5794<783', 115.5, 121.5, // 20250326 | The Weeknd, Playboi Carti: Timeless | 1924619450
    '5358365:', 'd0kd=#Wkh#Vxq#Dozd|v#Vklqhv#rq#WY', '4<8743;;8', 131.3, 137.3, // 20250327 | a-ha: The Sun Always Shines on TV | 195410885
    '5358365;', 'Lpdjlqh#Gudjrqv=#Udglrdfwlyh', '786:887<6', 121, 127, // 20250328 | Imagine Dragons: Radioactive | 453755493
    '5358365<', 'Txhhq=#Zh#Duh#wkh#Fkdpslrqv', '585847::6', 34.1, 40.1, // 20250329 | Queen: We Are the Champions | 252514773
    '53583663', 'U1H1P1=#Lw*v#wkh#Hqg#ri#wkh#Zruog?euADv#Zh#Nqrz#Lw#+Dqg#L#Ihho#Ilqh,', '589468835', 2.75, 8.75, // 20250330 | R.E.M.: It's the End of the World<br>As We Know It (And I Feel Fine) | 256135502
    '53583736', 'Wkh#8wk#Glphqvlrq=#Dtxdulrxv#2?euAOhw#Wkh#Vxqvklqh#Lq', '586;5:79;', 16.5, 22.5, // 20250403 | The 5th Dimension: Aquarious /<br>Let The Sunshine In | 253827468
    '53583737', 'Pduldk#Fduh|=#Zh#Ehorqj#Wrjhwkhu', '588:;6653', 181.5, 187.5, // 20250404 | Mariah Carey: We Belong Together | 255783320
    '53583738', 'Fuhhghqfh#Fohduzdwhu#Uhylydo=?euASurxg#Pdu|', '5865:;846', 10, 16, // 20250405 | Creedence Clearwater Revival:<br>Proud Mary | 253278513
    '53583739', 'Uhgqh{=#Frwwrq#H|h#Mrh', '585943:57', 0, 6, // 20250406 | Rednex: Cotton Eye Joe | 252610724
    '5358373:', 'Shduo#Mdp=#Eodfn', '58<873388', 145.5, 151.5, // 20250407 | Pearl Jam: Black | 259540055
    '5358373;', 'Vld=#Xqvwrssdeoh', '445:946538', 127, 133, // 20250408 | Sia: Unstoppable | 1127613205
    '5358373<', 'Wkh#Uroolqj#Vwrqhv=#Uxe|#Wxhvgd|', '588:954;5', 35, 41, // 20250409 | The Rolling Stones: Ruby Tuesday | 255762182
    '53583743', 'Vdow0Q0Shsd=#Zkdwwd#Pdq', '9344<48<4', 70.1, 76.1, // 20250410 | Salt-N-Pepa: Whatta Man | 601191591
    '53583744', 'Pxuud|#Khdg=#Rqh#Qljkw#lq#Edqjnrn', '663377796', 28.5, 34.5, // 20250411 | Murray Head: One Night in Bangkok | 330044463
    '53583745', 'Orv#Gho#Ulr=#Pdfduhqd', '55:47548;', 121, 127, // 20250412 | Los Del Rio: Macarena | 227142158
    '5358374<', 'Nlvv=#Fud}|#Fud}|#Qljkwv', '5864;3555', 46.5, 52.5, // 20250419 | Kiss: Crazy Crazy Nights | 253180222
    '53583753', 'Hduwk/#Zlqg#)#Iluh=#Vhswhpehu', '5893645;6', 19, 25, // 20250420 | Earth, Wind & Fire: September | 256031283
    '53583755', 'Vhdo=#Fud}|', '54986<<<6', 74.75, 80.75, // 20250422 | Seal: Crazy | 216539993
    '53583756', 'Frogsod|=#Wkh#Vflhqwlvw', '588::3849', 80, 86, // 20250423 | Coldplay: The Scientist | 255770516
    '53583757', 'Eh|rqfì=#Fud}|#Lq#Oryh?euA+ihdw1#MD\\0],', '589859;<:', 9, 15, // 20250424 | Beyoncé: Crazy In Love<br>(feat. JAY-Z) | 256526897
    '53583758', 'Fxue#\\rxu#Hqwkxvldvp#Wkhph', '58338;3:7', 2, 8, // 20250425 | Curb Your Enthusiasm Theme | 250058074
    '5358375;', 'Eu|dq#Dgdpv=#Vxpphu#ri#9<', '455338687<', 45.65, 51.65, // 20250428 | Bryan Adams: Summer of 69 | 1220053549
    '53583763', 'Vwdugxvw=#Pxvlf#Vrxqgv?euAEhwwhu#Zlwk#\\rx', '976337697', 112.25, 118.25, // 20250430 | Stardust: Music Sounds<br>Better With You | 643004364
    '53583837', 'XVD#Iru#Diulfd=?euAZh#Duh#wkh#Zruog', '4;:4563:3', 215.9, 221.9, // 20250504 | USA For Africa:<br>We Are the World | 187123070
    '53583838', 'Dhurvplwk=#L#Grq*w#Zdqqd#Plvv#d#Wklqj', '579;<69<8', 62.2, 68.2, // 20250505 | Aerosmith: I Don't Wanna Miss a Thing | 246893695
    '53583839', 'Mrkq#Ohjhqg=#Doo#Ri#Ph', '4469959:9', 82.85, 88.85, // 20250506 | John Legend: All Of Me | 113662676
    '5358383:', 'Zdon#Wkh#Prrq=?euAVkxw#Xs#dqg#Gdqfh', '49:485:9:', 15, 21, // 20250507 | Walk The Moon:<br>Shut Up and Dance | 167152767
    '5358383;', 'Mrkq#Ghqyhu=?euAWdnh#Ph#Krph/#Frxqwu|#Urdgv', '67799656<', 30, 36, // 20250508 | John Denver:<br>Take Me Home, Country Roads | 344663239
    '5358383<', 'Wkh#Srolfh=#Hyhu|#Euhdwk#\\rx#Wdnh', '585943943', 13, 19, // 20250509 | The Police: Every Breath You Take | 252610610
    '53583844', 'Dghoh=#Uroolqj#lq#wkh#Ghhs', '58773:<58', 4, 10, // 20250511 | Adele: Rolling in the Deep | 254407925
    '53583845', 'Sdxo#PfFduwqh|#)#Vwhylh#Zrqghu=?euAHerq|#dqg#Lyru|', '588;3:83;', 11.75, 17.75, // 20250512 | Paul McCartney & Stevie Wonder:<br>Ebony and Ivory | 255807508
    '53583846', 'Pduf|#Sod|jurxqg=#Vh{#)#Fdqg|', '5857;5373', 11.1, 17.1, // 20250513 | Marcy Playground: Sex & Candy | 252482040
    '53583847', 'Wkh#Yhuyh=#Elwwhuvzhhw#V|pskrq|', '5596<;;:4', 62.1, 68.1, // 20250514 | The Verve: Bittersweet Symphony | 226398871
    '53583849', 'Skduhoo#Zlooldpv=#Kdss|', '56<556;9;', 32, 38, // 20250516 | Pharell Williams: Happy | 239223868
    '5358384:', 'Udqg|#Qhzpdq=?euA\\rx*yh#Jrw#d#Iulhqg#lq#Ph', '5893;:675', 8.5, 14.5, // 20250517 | Randy Newman:<br>You've Got a Friend in Me | 256087342
    '5358384;', 'Sdxod#Degxo=#Vwudljkw#Xs', '58:77966', 60.8, 66.8, // 20250518 | Paula Abdul: Straight Up | 25744633
    '5358384<', 'Hg#Vkhhudq=#Wklqnlqj#Rxw#Orxg', '5479<6776', 96.15, 102.15, // 20250519 | Ed Sheeran: Thinking Out Loud | 214693443
    '53583853', 'Wkh#Frppxqdugv=?euAGrq*w#Ohdyh#Ph#Wklv#Zd|', '49:78;6;', 58, 64, // 20250520 | The Communards:<br>Don't Leave Me This Way | 16745838
    '53583854', 'H{wuhph=#Pruh#Wkdq#Zrugv', '5864;83;<', 20, 26, // 20250521 | Extreme: More Than Words | 253185089
    '53583855', 'Vlprq#)#Jduixqnho=#Puv1#Urelqvrq', '585;8<637', 10.5, 16.5, // 20250522 | Simon & Garfunkel: Mrs. Robinson | 252859304
    '53583856', 'Wzhqw|#Rqh#Slorwv=#Vwuhvvhg#Rxw', '5:4554<6:', 109.75, 115.75, // 20250523 | Twenty One Pilots: Stressed Out | 271221937
    '53583858', 'ixq1=#Zh#Duh#\\rxqj?euA+ihdw1#Mdqhooh#Prqäh,', '564;956<:', 76.5, 82.5, // 20250525 | fun.: We Are Young<br>(feat. Janelle Monáe) | 231862397
    '53583859', 'Juhhq#Gd|=#Jrrg#Ulggdqfh?euA+Wlph#ri#\\rxu#Olih,', '5895737;<', 133.75, 139.75, // 20250526 | Green Day: Good Riddance<br>(Time of Your Life) | 256240489
    '5358385:', 'Odxud#Eudqljdq=#Vhoi#Frqwuro', '44;746737', 101.5, 107.5, // 20250527 | Laura Branigan: Self Control | 118413404
    '53583864', 'Olssv#Lqf1=#Ixqn|wrzq', '6496<<;;9', 31.5, 37.5, // 20250531 | Lipps Inc.: Funkytown | 316399886
    '53583934', 'Phdw#Ordi=#L*g#Gr#Dq|wklqj#Iru#Oryh?euA+Exw#L#Zrq*w#Gr#Wkdw,', '58:3;5335', 80.5, 86.5, // 20250601 | Meat Loaf: I'd Do Anything For Love<br>(But I Won't Do That) | 257082002
    '53583935', 'Odv#Nhwfkxs=?euAWkh#Nhwfkxs#Vrqj#+Dvhuhmì,', '<<9395<38', 91.1, 97.1, // 20250602 | Las Ketchup:<br>The Ketchup Song (Aserejé) | 996062905
    '53583936', 'Txlqf|#Mrqhv=#Vrxo#Ervvd#Qryd', '58<37;465', 14, 20, // 20250603 | Quincy Jones: Soul Bossa Nova | 259048132
    '53583937', 'Hulf#Fodswrq=#Od|od', '58:3:;85:', 235.75, 241.75, // 20250604 | Eric Clapton: Layla | 257078527
    '53583938', 'Edkd#Phq=#Zkr#Ohw#Wkh#Grjv#Rxw', '58<399546', 8, 14, // 20250605 | Baha Men: Who Let The Dogs Out | 259066213
    '53583939', 'MD\\0]=#Hpsluh#Vwdwh#ri#Plqg?euA+ihdw1#Dolfld#Nh|v,', '48<846::3', 294.85, 300.85, // 20250606 | JAY-Z: Empire State of Mind<br>(feat. Alicia Keys) | 159513770
    '5358393:', 'Hxursh=#Wkh#Ilqdo#Frxqwgrzq', '5<535:4;:', 117.6, 123.6, // 20250607 | Europe: The Final Countdown | 292027187
    '5358393;', 'Rdvlv=#Fkdpsdjqh#Vxshuqryd', '5<4566844', 244.75, 250.75, // 20250608 | Oasis: Champagne Supernova | 291233511
    '53583943', 'Lpdjlqh#Gudjrqv=#Ghprqv', '5:4557<6;', 113.25, 119.25, // 20250610 | Imagine Dragons: Demons | 271224938
    '53583944', 'Vdqwdqd=#Vprrwk#+ihdw1#Ure#Wkrpdv,', '5874:4646', 2.25, 8.25, // 20250611 | Santana: Smooth (feat. Rob Thomas) | 254171313
    '53583945', 'Pdgrqqd=#Sdsd#Grq*w#Suhdfk', '73838874<', 146.65, 152.65, // 20250612 | Madonna: Papa Don't Preach | 405055419
    '53583946', 'Wkh#Fdugljdqv=#Oryhirro', '938489664', 45.35, 51.35, // 20250613 | The Cardigans: Lovefool | 605156331
    '53583948', 'Doo070Rqh=#L#Vzhdu', '564:39379', 66.25, 72.25, // 20250615 | All-4-One: I Swear | 231706046
    '53583949', 'Edfnvwuhhw#Er|v=#Hyhu|erg|', '5895;8:97', 9, 15, // 20250616 | Backstreet Boys: Everybody | 256285764
    '5358394:', 'Zklwqh|#Krxvwrq=#Krz#Zloo#L#Nqrz', '755<99334', 67.75, 73.75, // 20250617 | Whitney Houston: How Will I Know | 422966001
    '5358394;', 'Orx#Uhhg=#Shuihfw#Gd|', '5874;863<', 11.75, 17.75, // 20250618 | Lou Reed: Perfect Day | 254185309
    '53583953', 'XE73=#Uhg#Uhg#Zlqh', '58954389<', 20, 26, // 20250620 | UB40: Red Red Wine | 256210569
    '53583954', 'Fuhhghqfh#Fohduzdwhu#Uhylydo=?euAL#Sxw#D#Vshoo#Rq#\\rx', '58696<775', 14, 20, // 20250621 | Creedence Clearwater Revival:<br>I Put A Spell On You | 253639442
    '53583955', 'Orqgrqehdw=?euAL*yh#Ehhq#Wklqnlqj#Derxw#\\rx', '4;443;<437', 48.7, 54.7, // 20250622 | Londonbeat:<br>I've Been Thinking About You | 1811089104
    '53583956', 'Mrdq#Rveruqh=?euAZkdw#Li#Jrg#Zdv#Rqh#Ri#Xv', '8<4685<9', 79.13, 85.13, // 20250623 | Joan Osborne:<br>What If God Was One Of Us | 59135296
    '53583957', 'Uhg#Krw#Fklol#Shsshuv=?euAXqghu#Wkh#Eulgjh', '5:653659;', 86.3, 92.3, // 20250624 | Red Hot Chili Peppers:<br>Under The Bridge | 273203268
    '53583958', 'Olqnlq#Sdun=#Lq#wkh#Hqg', '54<3:7;46', 53.35, 59.35, // 20250625 | Linkin Park: In the End | 219074813
    '53583959', 'Pduldk#Fduh|=#Guhdp#Oryhu', '58:386334', 19.5, 25.5, // 20250626 | Mariah Carey: Dream Lover | 257053001
    '5358395:', 'Ehuolq=#Wdnh#P|#Euhdwk#Dzd|', '47338956:', 48.2, 54.2, // 20250627 | Berlin: Take My Breath Away | 140056237
    '5358395;', 'Vwhdp=?euAQd#Qd#Kh|#Kh|#Nlvv#Klp#Jrrge|h', '5868<98:;', 8.9, 14.9, // 20250628 | Steam:<br>Na Na Hey Hey Kiss Him Goodbye | 253596578
    '5358395<', 'Ghv*uhh=#Olih', '475;8:5968', 38.65, 44.65, // 20250629 | Des'ree: Life | 1428572635
    '53583963', 'Ilqh#\\rxqj#Fdqqledov=?euAVkh#Gulyhv#Ph#Fud}|', '<763<;49<', 55.75, 61.75, // 20250630 | Fine Young Cannibals:<br>She Drives Me Crazy | 943098169
    '53583:34', 'Edueud#Vwuhlvdqg=#Zrpdq#Lq#Oryh', '4<:5;8<45', 74.15, 80.15, // 20250701 | Barbra Streisand: Woman In Love | 197285912
    '53583:35', 'Dghoh=#Vrphrqh#Olnh#\\rx', '53<<46:;87', 74, 80, // 20250702 | Adele: Someone Like You | 2099137854
    '53583:36', 'Gdylg#Erzlh=#Vsdfh#Rgglw|', '559;<594;', 80.5, 86.5, // 20250703 | David Bowie: Space Oddity | 226892618
    '53583:37', 'Glfn#Gdoh=#Plvhuorx', '84;<8;94', 25, 31, // 20250704 | Dick Dale: Miserlou | 51895861
    '53583:39', 'Joruld#Jd|qru=#L#Zloo#Vxuylyh', '5864;3:8;', 0, 6, // 20250706 | Gloria Gaynor: I Will Survive | 253180758
    '53583:3:', 'Uhg#Krw#Fklol#Shsshuv=#Vfdu#Wlvvxh', '5:6536395', 54, 60, // 20250707 | Red Hot Chili Peppers: Scar Tissue | 273203062
    '53583:43', 'Jxqv#Q*#Urvhv=?euAVzhhw#Fklog#R*#Plqh', '5868<53<5', 14.8, 20.8, // 20250710 | Guns N' Roses:<br>Sweet Child O' Mine | 253592092
    '53583:58', 'Ol}}r=#Mxlfh', '8858:3<96', 65.7, 71.7, // 20250725: Lizzo: Juice, 552570963
    '53583:5;', 'E1r1E=#Qrwklq*#rq#\\rx?euA+ihdw1#Euxqr#Pduv,', '54745:;;4', 91.5, 97.5, // 20250728: B.o.B: Nothin' on You<br>(feat. Bruno Mars), 214127881
    '53583:63',  'Rdvlv=#Zrqghuzdoo', '5;6<:86;;', 113.15, 119.15, // 20250730: Oasis: Wonderwall, 283975388
    '53583;34', 'Frogsod|=#\\hoorz', '588::368;', 63, 69, // 20250801 | Coldplay: Yellow | 255770358
    '53583;37', 'V}d=#Rshq#Dupv#+ihdw1#Wudylv#Vfrww,', '46<9;;3;<<', 179, 185, // 20250804 | Sza: Open Arms (feat. Travis Scott) | 1396880899
    '53583;3:', 'Nhqgulfn#Odpdu=#Sulgh', '64:94:555', 8.5, 14.5, // 20250807 | Kendrick Lamar: Pride | 317617222
    '53583;3;', 'Ehh#Jhhv=#Vwd|lq#Dolyh', '588<<6:57', 12.65, 18.65, // 20250808 | Bee Gees: Stayin Alive | 255993724
    '53583;3<', 'Grq#Wrolyhu=#Qr#Lghd', '95;848738', 102.35, 108.35, // 20250809 | Don Toliver: No Idea | 628515405
    '53583;44', 'Gudnh=#Khdgolqhv', '58:794854', 10, 16, // 20250811 | Drake: Headlines | 257461521
    '53583;45', 'Wdph#Lpsdod=?euAWkh#Ohvv#L#nqrz#Wkh#Ehwwhu', '589574665', 119, 125, // 20250812 | Tame Impala:<br>The Less I know The Better | 256241332
    '53583;47', 'U1H1P1=#Pdq#Rq#Wkh#Prrq', '55397::56', 80, 86, // 20250814 | R.E.M.: Man On The Moon | 220647723
    '53583;48', 'Fholqh#Glrq=?euAP|#Khduw#Zloo#Jr#Rq', '5895;4;<;', 20.4, 26.6, // 20250815 | Celine Dion:<br>My Heart Will Go On | 256281898
    '53583;4:', 'Jhrujh#Plfkdho=#Fduhohvv#Zklvshu', '645;4453:', 14.25, 20.25, // 20250817 | George Michael: Careless Whisper | 312811207
    '53583;4<', 'Slqn#Ior|g=?euADqrwkhu#Eulfn#lq#wkh#Zdoo/#Sw1#5', '588:78785', 1.2, 7.2, // 20250819 | Pink Floyd:<br>Another Brick in the Wall, Pt. 2 | 255745452
    '53583;54', 'Pdurrq#8=#Pryhv#Olnh#Mdjjhu?euA+ihdw1#Fkulvwlqd#Djxlohud,', '4<838;55', 43.1, 49.1, // 20250821 | Maroon 5: Moves Like Jagger<br>(feat. Christina Aguilera) | 19505822
    '53583;56', 'Pdf#Ploohu=#Frqjudwxodwlrqv#+ihdw1#Elodo,', '5;3<:;:84', 187.25, 193.25, // 20250823 | Mac Miller: Congratulations (feat. Bilal) | 280978751
    '53583;58', 'Iohhwzrrg#Pdf=#Olwwoh#Olhv', '<5:<65953', 98.25, 104.25, // 20250825 | Fleetwood Mac: Little Lies | 927932620
    '53583;5:', 'Jrw|h=#Vrpherg|#Wkdw#L?euAXvhg#Wr#Nqrz#+ihdw1#Nlpeud,', '4;4<68;:', 91.25, 97.25, // 20250827 | Gotye: Somebody That I<br>Used To Know (feat. Kimbra) | 18193587
    '53583;63',  'Rdvlv=#Zrqghuzdoo', '5;6<:86;;', 113.15, 119.15, // 20250830: Oasis: Wonderwall, 283975388
    '53583;64', 'Vdqwdqd=#Pduld#Pduld?euA+ihdw1#Wkh#Surgxfw#J)E,', '5874:44:<', 17.4, 23.4, // 20250831: Santana: Maria Maria<br>(feat. The Product G&B), 254171179
    '53583<34', 'Frogsod|=#\\hoorz', '588::368;', 63, 69, // 20250901 | Coldplay: Yellow | 255770358
    '53583<36', 'Zklwqh|#Krxvwrq=#L#Zdqqd#Gdqfh?euAzlwk#Vrpherg|#+Zkr#Oryhv#Ph,', '586:<<:47', 186.25, 192.25, // 20250903 | Whitney Houston: I Wanna Dance<br>with Somebody (Who Loves Me) | 253799714
    '53583<37', 'V}d=#Rshq#Dupv#+ihdw1#Wudylv#Vfrww,', '46<9;;3;<<', 179, 185, // 20250904 | Sza: Open Arms (feat. Travis Scott) | 1396880899
    '53583<3:', 'Nhqgulfn#Odpdu=#Sulgh', '64:94:555', 8.5, 14.5, // 20250907 | Kendrick Lamar: Pride | 317617222
    '53583<3<', 'Grq#Wrolyhu=#Qr#Lghd', '95;848738', 102.35, 108.35, // 20250909 | Don Toliver: No Idea | 628515405
    '53583<43', 'Txhhq=#Erkhpldq#Ukdsvrg|', '5864995:6', 17.75, 23.75, // 20250910 | Queen: Bohemian Rhapsody | 253166273
    '53583<44', 'Gudnh=#Khdgolqhv', '58:794854', 10, 16, // 20250911 | Drake: Headlines | 257461521
    '53583<45', 'Wdph#Lpsdod=?euAWkh#Ohvv#L#nqrz#Wkh#Ehwwhu', '589574665', 119, 125, // 20250912 | Tame Impala:<br>The Less I know The Better | 256241332
    '53583<47', 'U1H1P1=#Pdq#Rq#Wkh#Prrq', '55397::56', 80, 86, // 20250914 | R.E.M.: Man On The Moon | 220647723
    '53583<48', 'Fholqh#Glrq=?euAP|#Khduw#Zloo#Jr#Rq', '5895;4;<;', 20.4, 26.6, // 20250915 | Celine Dion:<br>My Heart Will Go On | 256281898
    '53583<4:', 'Jhrujh#Plfkdho=#Fduhohvv#Zklvshu', '645;4453:', 14.25, 20.25, // 20250917 | George Michael: Careless Whisper | 312811207
    '53583<4<', 'Slqn#Ior|g=?euADqrwkhu#Eulfn#lq#wkh#Zdoo/#Sw1#5', '588:78785', 1.2, 7.2, // 20250919 | Pink Floyd:<br>Another Brick in the Wall, Pt. 2 | 255745452
    '53583<54', 'Pdurrq#8=#Pryhv#Olnh#Mdjjhu?euA+ihdw1#Fkulvwlqd#Djxlohud,', '4<838;55', 43.1, 49.1, // 20250921 | Maroon 5: Moves Like Jagger<br>(feat. Christina Aguilera) | 19505822
    '53583<56', 'Pdf#Ploohu=#Frqjudwxodwlrqv#+ihdw1#Elodo,', '5;3<:;:84', 187.25, 193.25, // 20250923 | Mac Miller: Congratulations (feat. Bilal) | 280978751
    '53583<58', 'Iohhwzrrg#Pdf=#Olwwoh#Olhv', '<5:<65953', 98.25, 104.25, // 20250925 | Fleetwood Mac: Little Lies | 927932620
    '53583<63',  'Rdvlv=#Zrqghuzdoo', '5;6<:86;;', 113.15, 119.15, // 20250930: Oasis: Wonderwall, 283975388
    '53584336', 'Grq#PfOhdq=#Dphulfdq#Slh', '45598:83:8', 300.6, 306.6, // 20251003 | Don McLean: American Pie | 1226575075
    '53584337', 'XVD#Iru#Diulfd=?euAZh#Duh#wkh#Zruog', '4;:4563:3', 215.9, 221.9, // 20251004 | USA For Africa:<br>We Are the World | 187123070
    '53584338', 'Dhurvplwk=#L#Grq*w#Zdqqd#Plvv#d#Wklqj', '579;<69<8', 62.2, 68.2, // 20251005 | Aerosmith: I Don't Wanna Miss a Thing | 246893695
    '53584339', 'Mrkq#Ohjhqg=#Doo#Ri#Ph', '4469959:9', 82.85, 88.85, // 20251006 | John Legend: All Of Me | 113662676
    '5358433:', 'Zdon#Wkh#Prrq=?euAVkxw#Xs#dqg#Gdqfh', '49:485:9:', 15, 21, // 20251007 | Walk The Moon:<br>Shut Up and Dance | 167152767
    '5358433;', 'Mrkq#Ghqyhu=?euAWdnh#Ph#Krph/#Frxqwu|#Urdgv', '67799656<', 30, 36, // 20251008 | John Denver:<br>Take Me Home, Country Roads | 344663239
    '5358433<', 'Wkh#Srolfh=#Hyhu|#Euhdwk#\\rx#Wdnh', '585943943', 13, 19, // 20251009 | The Police: Every Breath You Take | 252610610
    '53584344', 'Dghoh=#Uroolqj#lq#wkh#Ghhs', '58773:<58', 4, 10, // 20251011 | Adele: Rolling in the Deep | 254407925
    '53584345', 'Sdxo#PfFduwqh|#)#Vwhylh#Zrqghu=?euAHerq|#dqg#Lyru|', '588;3:83;', 11.75, 17.75, // 20251012 | Paul McCartney & Stevie Wonder:<br>Ebony and Ivory | 255807508
    '53584346', 'Pduf|#Sod|jurxqg=#Vh{#)#Fdqg|', '5857;5373', 11.1, 17.1, // 20251013 | Marcy Playground: Sex & Candy | 252482040
    '53584347', 'Wkh#Yhuyh=#Elwwhuvzhhw#V|pskrq|', '5596<;;:4', 62.1, 68.1, // 20251014 | The Verve: Bittersweet Symphony | 226398871
    '53584348', 'Luhqh#Fdud=#Iodvkgdqfh111#Zkdw#d#Ihholqj', '45<:7369;', 69.5, 75.5, // 20251015 | Irene Cara: Flashdance... What a Feeling | 129740368
    '53584349', 'Skduhoo#Zlooldpv=#Kdss|', '56<556;9;', 32, 38, // 20251016 | Pharell Williams: Happy | 239223868
    '5358434:', 'Udqg|#Qhzpdq=?euA\\rx*yh#Jrw#d#Iulhqg#lq#Ph', '5893;:675', 8.5, 14.5, // 20251017 | Randy Newman:<br>You've Got a Friend in Me | 256087342
    '5358434;', 'Sdxod#Degxo=#Vwudljkw#Xs', '58:77966', 60.8, 66.8, // 20251018 | Paula Abdul: Straight Up | 25744633
    '5358434<', 'Hg#Vkhhudq=#Wklqnlqj#Rxw#Orxg', '5479<6776', 96.15, 102.15, // 20251019 | Ed Sheeran: Thinking Out Loud | 214693443
    '53584353', 'Wkh#Frppxqdugv=?euAGrq*w#Ohdyh#Ph#Wklv#Zd|', '49:78;6;', 58, 64, // 20251020 | The Communards:<br>Don't Leave Me This Way | 16745838
    '53584354', 'H{wuhph=#Pruh#Wkdq#Zrugv', '5864;83;<', 20, 26, // 20251021 | Extreme: More Than Words | 253185089
    '53584355', 'Vlprq#)#Jduixqnho=#Puv1#Urelqvrq', '585;8<637', 10.5, 16.5, // 20251022 | Simon & Garfunkel: Mrs. Robinson | 252859304
    '53584356', 'Wzhqw|#Rqh#Slorwv=#Vwuhvvhg#Rxw', '5:4554<6:', 109.75, 115.75, // 20251023 | Twenty One Pilots: Stressed Out | 271221937
    '53584357', 'Gluh#Vwudlwv=#Prqh|#iru#Qrwklqj', '53<784346', 97, 103, // 20251024 | Dire Straits: Money for Nothing | 209451013
    '53584358', 'ixq1=#Zh#Duh#\\rxqj?euA+ihdw1#Mdqhooh#Prqäh,', '564;956<:', 76.5, 82.5, // 20251025 | fun.: We Are Young<br>(feat. Janelle Monáe) | 231862397
    '53584359', 'Juhhq#Gd|=#Jrrg#Ulggdqfh?euA+Wlph#ri#\\rxu#Olih,', '5895737;<', 133.75, 139.75, // 20251026 | Green Day: Good Riddance<br>(Time of Your Life) | 256240489
    '5358435:', 'Odxud#Eudqljdq=#Vhoi#Frqwuro', '44;746737', 101.5, 107.5, // 20251027 | Laura Branigan: Self Control | 118413404
    '5358435;', 'Glgr=#Wkdqn#\\rx', '44<993746', 2.2, 8.2, // 20251028 | Dido: Thank You | 119660413
    '5358435<', 'Uroolqj#Vwrqhv=#Sdlqw#Lw#Eodfn', '64::38564', 12.5, 18.5, // 20251029 | Rolling Stones: Paint It Black | 317705231
    '53584364', 'Olssv#Lqf1=#Ixqn|wrzq', '6496<<;;9', 31.5, 37.5, // 20251031 | Lipps Inc.: Funkytown | 316399886
    '53584434', 'Phdw#Ordi=#L*g#Gr#Dq|wklqj#Iru#Oryh?euA+Exw#L#Zrq*w#Gr#Wkdw,', '58:3;5335', 80.5, 86.5, // 20251101 | Meat Loaf: I'd Do Anything For Love<br>(But I Won't Do That) | 257082002
    '53584435', 'Odv#Nhwfkxs=?euAWkh#Nhwfkxs#Vrqj#+Dvhuhmì,', '<<9395<38', 91.1, 97.1, // 20251102 | Las Ketchup:<br>The Ketchup Song (Aserejé) | 996062905
    '53584436', 'Txlqf|#Mrqhv=#Vrxo#Ervvd#Qryd', '58<37;465', 14, 20, // 20251103 | Quincy Jones: Soul Bossa Nova | 259048132
    '53584437', 'Hulf#Fodswrq=#Od|od', '58:3:;85:', 235.75, 241.75, // 20251104 | Eric Clapton: Layla | 257078527
    '53584438', 'Edkd#Phq=#Zkr#Ohw#Wkh#Grjv#Rxw', '58<399546', 8, 14, // 20251105 | Baha Men: Who Let The Dogs Out | 259066213
    '53584439', 'MD\\0]=#Hpsluh#Vwdwh#ri#Plqg?euA+ihdw1#Dolfld#Nh|v,', '48<846::3', 294.85, 300.85, // 20251106 | JAY-Z: Empire State of Mind<br>(feat. Alicia Keys) | 159513770
    '5358443:', 'Hxursh=#Wkh#Ilqdo#Frxqwgrzq', '5<535:4;:', 117.6, 123.6, // 20251107 | Europe: The Final Countdown | 292027187
    '5358443;', 'Rdvlv=#Fkdpsdjqh#Vxshuqryd', '5<4566844', 244.75, 250.75, // 20251108 | Oasis: Champagne Supernova | 291233511
    '5358443<', 'Hdjohv=#Krwho#Fdoliruqld', '564;7<7;;', 0.25, 6.25, // 20251109 | Eagles: Hotel California | 231849488
    '53584443', 'Lpdjlqh#Gudjrqv=#Ghprqv', '5:4557<6;', 113.25, 119.25, // 20251110 | Imagine Dragons: Demons | 271224938
    '53584444', 'Vdqwdqd=#Vprrwk#+ihdw1#Ure#Wkrpdv,', '5874:4646', 2.25, 8.25, // 20251111 | Santana: Smooth (feat. Rob Thomas) | 254171313
    '53584445', 'Pdgrqqd=#Sdsd#Grq*w#Suhdfk', '73838874<', 146.65, 152.65, // 20251112 | Madonna: Papa Don't Preach | 405055419
    '53584446', 'Wkh#Fdugljdqv=#Oryhirro', '938489664', 45.35, 51.35, // 20251113 | The Cardigans: Lovefool | 605156331
    '53584448', 'Doo070Rqh=#L#Vzhdu', '564:39379', 66.25, 72.25, // 20251115 | All-4-One: I Swear | 231706046
    '53584449', 'Edfnvwuhhw#Er|v=#Hyhu|erg|', '5895;8:97', 9, 15, // 20251116 | Backstreet Boys: Everybody | 256285764
    '5358444:', 'Zklwqh|#Krxvwrq=#Krz#Zloo#L#Nqrz', '755<99334', 67.75, 73.75, // 20251117 | Whitney Houston: How Will I Know | 422966001
    '5358444;', 'Orx#Uhhg=#Shuihfw#Gd|', '5874;863<', 11.75, 17.75, // 20251118 | Lou Reed: Perfect Day | 254185309
    '5358444<', 'Qlfnhoedfn=#Krz#\\rx#Uhplqg#Ph', '547;3:48:', 16.85, 22.85, // 20251119 | Nickelback: How You Remind Me | 214807157
    '53584453', 'XE73=#Uhg#Uhg#Zlqh', '58954389<', 20, 26, // 20251120 | UB40: Red Red Wine | 256210569
    '53584454', 'Fuhhghqfh#Fohduzdwhu#Uhylydo=?euAL#Sxw#D#Vshoo#Rq#\\rx', '58696<775', 14, 20, // 20251121 | Creedence Clearwater Revival:<br>I Put A Spell On You | 253639442
    '53584455', 'Orqgrqehdw=?euAL*yh#Ehhq#Wklqnlqj#Derxw#\\rx', '4;443;<437', 48.7, 54.7, // 20251122 | Londonbeat:<br>I've Been Thinking About You | 1811089104
    '53584456', 'Mrdq#Rveruqh=?euAZkdw#Li#Jrg#Zdv#Rqh#Ri#Xv', '8<4685<9', 79.13, 85.13, // 20251123 | Joan Osborne:<br>What If God Was One Of Us | 59135296
    '53584457', 'Uhg#Krw#Fklol#Shsshuv=?euAXqghu#Wkh#Eulgjh', '5:653659;', 86.3, 92.3, // 20251124 | Red Hot Chili Peppers:<br>Under The Bridge | 273203268
    '53584458', 'Olqnlq#Sdun=#Lq#wkh#Hqg', '54<3:7;46', 53.35, 59.35, // 20251125 | Linkin Park: In the End | 219074813
    '53584459', 'Pduldk#Fduh|=#Guhdp#Oryhu', '58:386334', 19.5, 25.5, // 20251126 | Mariah Carey: Dream Lover | 257053001
    '5358445:', 'Ehuolq=#Wdnh#P|#Euhdwk#Dzd|', '47338956:', 48.2, 54.2, // 20251127 | Berlin: Take My Breath Away | 140056237
    '5358445;', 'Vwhdp=?euAQd#Qd#Kh|#Kh|#Nlvv#Klp#Jrrge|h', '5868<98:;', 8.9, 14.9, // 20251128 | Steam:<br>Na Na Hey Hey Kiss Him Goodbye | 253596578
    '5358445<', 'Ghv*uhh=#Olih', '475;8:5968', 38.65, 44.65, // 20251129 | Des'ree: Life | 1428572635
    '53584463', 'Ilqh#\\rxqj#Fdqqledov=?euAVkh#Gulyhv#Ph#Fud}|', '<763<;49<', 55.75, 61.75, // 20251130 | Fine Young Cannibals:<br>She Drives Me Crazy | 943098169
    '53584534', 'Edueud#Vwuhlvdqg=#Zrpdq#Lq#Oryh', '4<:5;8<45', 74.15, 80.15, // 20251201 | Barbra Streisand: Woman In Love | 197285912
    '53584535', 'Dghoh=#Vrphrqh#Olnh#\\rx', '53<<46:;87', 74, 80, // 20251202 | Adele: Someone Like You | 2099137854
    '53584536', 'Gdylg#Erzlh=#Vsdfh#Rgglw|', '559;<594;', 80.5, 86.5, // 20251203 | David Bowie: Space Oddity | 226892618
    '53584537', 'Glfn#Gdoh=#Plvhuorx', '84;<8;94', 25, 31, // 20251204 | Dick Dale: Miserlou | 51895861
    '53584539', 'Joruld#Jd|qru=#L#Zloo#Vxuylyh', '5864;3:8;', 0, 6, // 20251206 | Gloria Gaynor: I Will Survive | 253180758
    '5358453:', 'Uhg#Krw#Fklol#Shsshuv=#Vfdu#Wlvvxh', '5:6536395', 54, 60, // 20251207 | Red Hot Chili Peppers: Scar Tissue | 273203062
    '5358453;', 'Qhz#Rughu=#Wuxh#Idlwk', '488377787', 234.9, 240.9, // 20251208 | New Order: True Faith | 905488558
    '53584543', 'Jxqv#Q*#Urvhv=?euAVzhhw#Fklog#R*#Plqh', '5868<53<5', 14.8, 20.8, // 20251210 | Guns N' Roses:<br>Sweet Child O' Mine | 253592092
    '53584544', 'Wudylv#Vfrww=#L#NqrzB', '48:9648:;<', 31, 38, // 20251211: Travis Scott: I Know?, 1576315789
    '53584545', 'Dghoh=#Khoor', '58773:<73', 11.95, 17.65, // 20251212: Adele: Hello, 254407940
    '53584553', 'Wd|oru#Vzliw=?euAZloghvw#Guhdpv#+Wd|oru*v#Yhuvlrq,', '44594<75<;', 99.8, 105.88, // 20251220: Taylor Swift: Wildest Dreams (Taylor's Version), 1126194298
    '53584555', 'Dghoh=#Vn|idoo', '5:67;3553', 81.1, 87.1, // 20251222: Adele: Skyfall, 273480220
    '53584556', 'Hplqhp=?euAWkh#Prqvwhu#+ihdw1#Ulkdqqd,', '589589:<6', 50.6, 56.6, // 20251223: Eminem: The Monster (feat. Rihanna), 256256793
    '53584557', 'Plfkdho#Mdfnvrq=#Ehdw#Lw', '5:;83<675', 21.5, 27.5, // 20251224: Michael Jackson, Beat It, 278509342
    '53584558', 'Ol}}r=#Mxlfh', '8858:3<96', 65.7, 71.7, // 20251225: Lizzo: Juice, 552570963
    '5358455:', 'Eh|rqfì=#Vlqjoh#Odglhv?euA+Sxw#d#Ulqj#rq#Lw,', '5898597;9', 0.75, 6.75, // 20251227: Beyoncé: Single Ladies<br>(Put a Ring on It), 256526486
    '5358455;', 'E1r1E=#Qrwklq*#rq#\\rx?euA+ihdw1#Euxqr#Pduv,', '54745:;;4', 91.5, 97.5, // 20251228: B.o.B: Nothin' on You<br>(feat. Bruno Mars), 214127881
    '53584563',  'Rdvlv=#Zrqghuzdoo', '5;6<:86;;', 113.15, 119.15, // 20251230: Oasis: Wonderwall, 283975388
    '53584564', 'Vdqwdqd=#Pduld#Pduld?euA+ihdw1#Wkh#Surgxfw#J)E,', '5874:44:<', 17.4, 23.4, // 20251231: Santana: Maria Maria<br>(feat. The Product G&B), 254171179
    '53593434', 'Iohhwzrrg#Pdf=#Olwwoh#Olhv', '<5:<65953', 98.25, 104.25, // 20260101 | Fleetwood Mac: Little Lies | 927932620
    '53593435', 'Gxudq#Gxudq=#Ruglqdu|#Zruog', '895787676', 17.9, 23.9, // 20260102 | Duran Duran: Ordinary World | 562454343
    '53593438', 'Frogsod|=#Ylyd#Od#Ylgd', '588::363<', 177.75, 183.15, // 20260105: Coldplay: Viva La Vida, 255770309
]

function getAudioData(dateStr) {
    const audioIndex = audioDataAll.findIndex(value => value == dateStr)
    const songTitle = audioDataAll[audioIndex + 1]
    const youtubeId = audioDataAll[audioIndex + 2]
    const startTime = audioDataAll[audioIndex + 3]
    const endTime = startTime + 6
    return [songTitle, youtubeId, startTime, endTime]
}
