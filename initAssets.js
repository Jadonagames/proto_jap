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
    };

    // Music and Sounds
    Sound.list["jadona"] = new Sound("./sounds/jadona.mp3");

    Sound.list["explosion"] = new Sound("./sounds/explosion.mp3");
    Sound.list["bonus"] = new Sound("./sounds/bonus.mp3");

    Sound.list["music"] = new Sound("./sounds/music/Galastarz.mp3", "m", true);




    // Char.list.push("")

}

LoadAssets();