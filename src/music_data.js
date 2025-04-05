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
    '53583648', 'Udglrkhdg=#Fuhhs', '43;3<:;334', 106, 112, // 20250315 | Radiohead: Creep | 1080978001
    '53583649', 'Wdlr#Fux}=#G|qdplwh', '47735:83<8', 24.4, 30.4, // 20250316 | Taio Cruz: Dynamite | 1440275095
    '5358364:', 'Ndw|#Shuu|=#Iluhzrun', '589583586', 16.25, 22.25, // 20250317 | Katy Perry: Firework | 256250253
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
    '53583664', 'Eulwqh|#Vshduv=#111Ede|#Rqh#Pruh#Wlph', '4653:767:6', 40.25, 46.25, // 20250331 | Britney Spears: ...Baby One More Time | 1320743473
    '53583734', 'Ulfn#Dvwoh|=#Qhyhu#Jrqqd#Jlyh#\\rx#Xs', '4575;9;948', 42.8, 48.7, // 20250401 | Rick Astley: Never Gonna Give You Up | 1242868615
    '53583735', 'Fxowxuh#Foxe=#Ndupd#Fkdphohrq', '48;593597', 49.25, 55.25, // 20250402 | Culture Club: Karma Chameleon | 158260264
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
    '53583746', 'Zklwh#Wrzq=#\\rxu#Zrpdq', '6<67369', 80.5, 86.5, // 20250413 | White Town: Your Woman | 3934036
    '53583747', 'Wkh#Dqlpdov=?euAWkh#Krxvh#ri#wkh#Ulvlqj#Vxq', '4<4:859;<', 27.5, 33.5, // 20250414 | The Animals:<br>The House of the Rising Sun | 191752689
    '53583748', 'Dp|#Zlqhkrxvh=#Edfn#Wr#Eodfn', '57:;6:8;4', 15.25, 21.25, // 20250415 | Amy Winehouse: Back To Black | 247837581
    '53583749', 'Dfh#Ri#Edvh=#Kdss|#Qdwlrq', '558377:89', 75.5, 81.5, // 20250416 | Ace Of Base: Happy Nation | 225044756
    '5358374:', 'Gdylg#Erzlh=#Vwdupdq', '79694<99', 54.75, 60.75, // 20250417 | David Bowie: Starman | 46361966
    '5358374;', 'Gxd#Olsd=#Oryh#Djdlq', ':;49:6<47', 82.8, 88.8, // 20250418 | Dua Lipa: Love Again | 781673914
    '5358374<', 'Nlvv=#Fud}|#Fud}|#Qljkwv', '5864;3555', 46.5, 52.5, // 20250419 | Kiss: Crazy Crazy Nights | 253180222
    '53583753', 'Hduwk/#Zlqg#)#Iluh=#Vhswhpehu', '5893645;6', 19, 25, // 20250420 | Earth, Wind & Fire: September | 256031283
    '53583754', 'Howrq#Mrkq=#Furfrgloh#Urfn', '5846;;798', 15, 21, // 20250421 | Elton John: Crocodile Rock | 251388465
    '53583755', 'Vhdo=#Fud}|', '54986<<<6', 74.75, 80.75, // 20250422 | Seal: Crazy | 216539993



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