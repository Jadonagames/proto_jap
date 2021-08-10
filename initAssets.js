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

    Sound.list["kana_a"] = new Sound("./sounds/kana/a.mp3");
    Sound.list["kana_i"] = new Sound("./sounds/kana/i.mp3");
    Sound.list["kana_u"] = new Sound("./sounds/kana/u.mp3");
    Sound.list["kana_e"] = new Sound("./sounds/kana/e.mp3");
    Sound.list["kana_o"] = new Sound("./sounds/kana/o.mp3");

    Sound.list["kana_ka"] = new Sound("./sounds/kana/ka.mp3");
    Sound.list["kana_ki"] = new Sound("./sounds/kana/ki.mp3");
    Sound.list["kana_ku"] = new Sound("./sounds/kana/ku.mp3");
    Sound.list["kana_ke"] = new Sound("./sounds/kana/ke.mp3");
    Sound.list["kana_ko"] = new Sound("./sounds/kana/ko.mp3");

    Sound.list["kana_sa"] = new Sound("./sounds/kana/sa.mp3");
    Sound.list["kana_shi"] = new Sound("./sounds/kana/shi.mp3");
    Sound.list["kana_su"] = new Sound("./sounds/kana/su.mp3");
    Sound.list["kana_se"] = new Sound("./sounds/kana/se.mp3");
    Sound.list["kana_so"] = new Sound("./sounds/kana/so.mp3");

    Sound.list["kana_ta"] = new Sound("./sounds/kana/ta.mp3");
    Sound.list["kana_chi"] = new Sound("./sounds/kana/chi.mp3");
    Sound.list["kana_tsu"] = new Sound("./sounds/kana/tsu.mp3");
    Sound.list["kana_te"] = new Sound("./sounds/kana/te.mp3");
    Sound.list["kana_to"] = new Sound("./sounds/kana/to.mp3");

    Sound.list["kana_na"] = new Sound("./sounds/kana/na.mp3");
    Sound.list["kana_ni"] = new Sound("./sounds/kana/ni.mp3");
    Sound.list["kana_nu"] = new Sound("./sounds/kana/nu.mp3");
    Sound.list["kana_ne"] = new Sound("./sounds/kana/ne.mp3");
    Sound.list["kana_no"] = new Sound("./sounds/kana/no.mp3");

    Sound.list["kana_ha"] = new Sound("./sounds/kana/ha.mp3");
    Sound.list["kana_hi"] = new Sound("./sounds/kana/hi.mp3");
    Sound.list["kana_fu"] = new Sound("./sounds/kana/fu.mp3");
    Sound.list["kana_he"] = new Sound("./sounds/kana/he.mp3");
    Sound.list["kana_ho"] = new Sound("./sounds/kana/ho.mp3");

    Sound.list["kana_ma"] = new Sound("./sounds/kana/ma.mp3");
    Sound.list["kana_mi"] = new Sound("./sounds/kana/mi.mp3");
    Sound.list["kana_mu"] = new Sound("./sounds/kana/mu.mp3");
    Sound.list["kana_me"] = new Sound("./sounds/kana/me.mp3");
    Sound.list["kana_mo"] = new Sound("./sounds/kana/mo.mp3");

    Sound.list["kana_ya"] = new Sound("./sounds/kana/ya.mp3");
    Sound.list["kana_yu"] = new Sound("./sounds/kana/yu.mp3");
    Sound.list["kana_yo"] = new Sound("./sounds/kana/yo.mp3");

    Sound.list["kana_ra"] = new Sound("./sounds/kana/ra.mp3");
    Sound.list["kana_ri"] = new Sound("./sounds/kana/ri.mp3");
    Sound.list["kana_ru"] = new Sound("./sounds/kana/ru.mp3");
    Sound.list["kana_re"] = new Sound("./sounds/kana/re.mp3");
    Sound.list["kana_ro"] = new Sound("./sounds/kana/ro.mp3");

    Sound.list["kana_wa"] = new Sound("./sounds/kana/wa.mp3");
    Sound.list["kana_wo"] = new Sound("./sounds/kana/wo.mp3");

    Sound.list["kana_n"] = new Sound("./sounds/kana/n.mp3");

    Sound.list["kana_ga"] = new Sound("./sounds/kana/ga.mp3");
    Sound.list["kana_gi"] = new Sound("./sounds/kana/gi.mp3");
    Sound.list["kana_gu"] = new Sound("./sounds/kana/gu.mp3");
    Sound.list["kana_ge"] = new Sound("./sounds/kana/ge.mp3");
    Sound.list["kana_go"] = new Sound("./sounds/kana/go.mp3");

    Sound.list["kana_za"] = new Sound("./sounds/kana/za.mp3");
    Sound.list["kana_ji"] = new Sound("./sounds/kana/ji.mp3");
    Sound.list["kana_zu"] = new Sound("./sounds/kana/zu.mp3");
    Sound.list["kana_ze"] = new Sound("./sounds/kana/ze.mp3");
    Sound.list["kana_zo"] = new Sound("./sounds/kana/zo.mp3");

    Sound.list["kana_da"] = new Sound("./sounds/kana/da.mp3");
    Sound.list["kana_di"] = new Sound("./sounds/kana/ji.mp3");
    Sound.list["kana_du"] = new Sound("./sounds/kana/zu.mp3");
    Sound.list["kana_de"] = new Sound("./sounds/kana/de.mp3");
    Sound.list["kana_do"] = new Sound("./sounds/kana/do.mp3");

    Sound.list["kana_ba"] = new Sound("./sounds/kana/ba.mp3");
    Sound.list["kana_bi"] = new Sound("./sounds/kana/bi.mp3");
    Sound.list["kana_bu"] = new Sound("./sounds/kana/bu.mp3");
    Sound.list["kana_be"] = new Sound("./sounds/kana/be.mp3");
    Sound.list["kana_bo"] = new Sound("./sounds/kana/bo.mp3");

    Sound.list["kana_pa"] = new Sound("./sounds/kana/pa.mp3");
    Sound.list["kana_pi"] = new Sound("./sounds/kana/pi.mp3");
    Sound.list["kana_pu"] = new Sound("./sounds/kana/pu.mp3");
    Sound.list["kana_pe"] = new Sound("./sounds/kana/pe.mp3");
    Sound.list["kana_po"] = new Sound("./sounds/kana/po.mp3");

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
    let row = pFile.split(/\r\n|\n/);
    for (let i = 0; i < row.length; i++) {
        row[i] = row[i].split('\t');
        translationEn[row[i][0]] = row[i][1];
        translationFr[row[i][0]] = row[i][2];
        translationJp[row[i][0]] = row[i][3];
    }
    // console.table(translationEn);
    // console.table(translationFr);
    // console.table(translationJp);
    LANG = translationEn;
    console.log("translation loaded !!!");
    ASSETS_COUNTER++;
    if (ASSETS_COUNTER == 2) {
        ASSETS_READY = true;
    }
}

LoadAssets();