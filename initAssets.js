let SS;
let bImageLoaded = false;
let bSplashSoundReady = false;

let bSplashReady = false;

const h = "あ,い,う,え,お,か,き,く,け,こ,さ,し,す,せ,そ,た,ち,つ,て,と,な,に,ぬ,ね,の,は,ひ,ふ,へ,ほ,ま,み,む,め,も,や,ゆ,よ,ら,り,る,れ,ろ,わ,を,ん,が,ぎ,ぐ,げ,ご,ざ,じ,ず,ぜ,ぞ,だ,で,ど,ば,び,ぶ,べ,ぼ,ぱ,ぴ,ぷ,ぺ,ぽ";
const k = "ア,イ,ウ,エ,オ,カ,キ,ク,ケ,コ,サ,シ,ス,セ,ソ,タ,チ,ツ,テ,ト,ナ,ニ,ヌ,ネ,ノ,ハ,ヒ,フ,ヘ,ホ,マ,ミ,ム,メ,モ,ヤ,ユ,ヨ,ラ,リ,ル,レ,ロ,ワ,ヲ,ン,ガ,ギ,グ,ゲ,ゴ,ザ,ジ,ズ,ゼ,ゾ,ダ,デ,ド,バ,ビ,ブ,ベ,ボ,パ,ピ,プ,ペ,ポ";
const r = "a,i,u,e,o,ka,ki,ku,ke,ko,sa,shi,su,se,so,ta,chi,tsu,te,to,na,ni,nu,ne,no,ha,hi,fu,he,ho,ma,mi,mu,me,mo,ya,yu,yo,ra,ri,ru,re,ro,wa,wo,n,ga,gi,gu,ge,go,za,ji,zu,ze,zo,da,de,do,ba,bi,bu,be,bo,pa,pi,pu,pe,po";

const char = {
    h: h.split(","),
    k: k.split(","),
    r: r.split(",")
};

let tsvFile = "";
let translationEn = []; // 1
let translationFr = []; // 2
let translationJp = []; // 3
let LANG = [];
let ASSETS_COUNTER = 0;
let ASSETS_READY = false;

// ----------------------------------
// TODO Find a place for that :
let charNumbers = 4;
let learn = "r"
let choice = "h";
let rndArr = []; // Liste des choix 
let rndChoice = {}; // Le Bon choix
test(learn, choice, charNumbers);
// ----------------------------------


function LoadAssets() {

    // SpriteSheets
    SS = new Image();
    SS.src = "./images/SS.png";
    /* 
    *  Plus tard utiliser une image en format base64
    *  onlinepngtools.com/convert-png-to-base64 : 
    *  SS.src = "data:image/png;base64,blablablablabla;";
    */
    SS.onload = () => {
        console.log("image loaded !!!");
        ASSETS_COUNTER++;
        if (ASSETS_COUNTER == 2) {
            ASSETS_READY = true;
        }
    };

    // Music and Sounds
    Sound.list["jadona"] = new Sound("./sounds/jadona.mp3");

    Sound.list["explosion"] = new Sound("./sounds/explosion.mp3");
    Sound.list["bonus"] = new Sound("./sounds/bonus.mp3");

    Sound.list["music"] = new Sound("./sounds/music/Galastarz.mp3", "m", true);

    readTSVFile("./translation.tsv");
    // Char.list.push("")

}

function readTSVFile(pFile) {
    let rawFile = new XMLHttpRequest();
    rawFile.open("GET", pFile, true);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                tsvFile = rawFile.responseText;
                createTranslationArrays(tsvFile);
            }
        }
    }
    rawFile.send(null);
}

function createTranslationArrays(pFile) {

    let regexR = "/\r?\n/";
    let row = [];

    if (regexR) {
        console.log("regex R found");
        row = pFile.split('\r\n');
    } else {
        row = pFile.split('\n');
    }

    // console.log(row);
    for (let i = 0; i < row.length; i++) {
        // console.log(row[i]);
        // console.log(row[i].length);
        // console.log(row[i][3].length);
        // row[i].replace('/\r/gm', '');

        row[i] = row[i].split('\t');
        translationEn[row[i][0]] = row[i][1];
        translationFr[row[i][0]] = row[i][2];
        translationJp[row[i][0]] = row[i][3];
    }
    console.table(translationEn);
    console.table(translationFr);
    console.table(translationJp);
    LANG = translationEn;
    console.log("translation loaded !!!");
    // console.table(LANG);
    ASSETS_COUNTER++;
    if (ASSETS_COUNTER == 2) {
        ASSETS_READY = true;
    }
}

LoadAssets();