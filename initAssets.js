let SS;
let bImageLoaded = false;
let bSplashSoundReady = false;

let bSplashReady = false;

let KANA = [];
KANA["hira_a"] = {
    kana: "あ",
    roma: "a",
    imageData: [], // 3
    frames: [4, 4, 5]
};
KANA["hira_i"] = {
    kana: "い",
    roma: "i",
    imageData: [],
    frames: [3, 3]
};
KANA["hira_u"] = {
    kana: "う",
    roma: "u",
    imageData: [],
    frames: [3, 4]
};
KANA["hira_e"] = {
    kana: "え",
    roma: "e",
    imageData: [],
    frames: [3, 6]
};
KANA["hira_o"] = {
    kana: "お",
    roma: "o",
    imageData: [],
    frames: [3, 7, 3]
};
KANA["hira_ka"] = {
    kana: "か",
    roma: "ka",
    imageData: [],
    frames: [4, 3, 3]
};
KANA["hira_ki"] = {
    kana: "き",
    roma: "ki",
    imageData: [],
    frames: [3, 3, 4, 3]
};
KANA["hira_ku"] = {
    kana: "く",
    roma: "ku",
    imageData: [],
    frames: [5]
};
KANA["hira_ke"] = {
    kana: "け",
    roma: "ke",
    imageData: [],
    frames: [4, 3, 4]
};
KANA["hira_ko"] = {
    kana: "こ",
    roma: "ko",
    imageData: [],
    frames: [3, 3]
};
KANA["hira_sa"] = {
    kana: "さ",
    roma: "sa",
    imageData: [],
    frames: [3, 4, 3]
};
KANA["hira_shi"] = {
    kana: "し",
    roma: "shi",
    imageData: [],
    frames: [4]
};
KANA["hira_su"] = {
    kana: "す",
    roma: "su",
    imageData: [],
    frames: [3, 6]
};
KANA["hira_se"] = {
    kana: "せ",
    roma: "se",
    imageData: [],
    frames: [4, 4, 4]
};
KANA["hira_so"] = {
    kana: "そ",
    roma: "so",
    imageData: [],
    frames: [6]
};
KANA["hira_ta"] = {
    kana: "た",
    roma: "ta",
    imageData: [],
    frames: [3, 4, 3, 3]
};
KANA["hira_chi"] = {
    kana: "ち",
    roma: "chi",
    imageData: [],
    frames: [3, 5]
};
KANA["hira_tsu"] = {
    kana: "つ",
    roma: "tsu",
    imageData: [],
    frames: [4]
};
KANA["hira_te"] = {
    kana: "て",
    roma: "te",
    imageData: [],
    frames: [5]
};
KANA["hira_to"] = {
    kana: "と",
    roma: "to",
    imageData: [],
    frames: [3, 3]
};
KANA["hira_na"] = {
    kana: "な",
    roma: "na",
    imageData: [],
    frames: [3, 3, 3, 6]
};
KANA["hira_ni"] = {
    kana: "に",
    roma: "ni",
    imageData: [],
    frames: [4, 3, 3]
};
KANA["hira_nu"] = {
    kana: "ぬ",
    roma: "nu",
    imageData: [],
    frames: [3, 9]
};
KANA["hira_ne"] = {
    kana: "ね",
    roma: "ne",
    imageData: [],
    frames: [3, 9]
};
KANA["hira_no"] = {
    kana: "の",
    roma: "no",
    imageData: [],
    frames: [7]
};
KANA["hira_ha"] = {
    kana: "は",
    roma: "ha",
    imageData: [],
    frames: [4, 3, 5]
};
KANA["hira_hi"] = {
    kana: "ひ",
    roma: "hi",
    imageData: [],
    frames: [6]
};
KANA["hira_fu"] = {
    kana: "ふ",
    roma: "fu",
    imageData: [],
    frames: [3, 3, 3, 3]
};
KANA["hira_he"] = {
    kana: "へ",
    roma: "he",
    imageData: [],
    frames: [4]
};
KANA["hira_ho"] = {
    kana: "ほ",
    roma: "ho",
    imageData: [],
    frames: [4, 3, 3, 5]
};
KANA["hira_ma"] = {
    kana: "ま",
    roma: "ma",
    imageData: [],
    frames: [3, 3, 4]
};
KANA["hira_mi"] = {
    kana: "み",
    roma: "mi",
    imageData: [],
    frames: [6, 3]
};
KANA["hira_mu"] = {
    kana: "む",
    roma: "mu",
    imageData: [],
    frames: [3, 6, 3]
};
KANA["hira_me"] = {
    kana: "め",
    roma: "me",
    imageData: [],
    frames: [3, 6]
};
KANA["hira_mo"] = {
    kana: "も",
    roma: "mo",
    imageData: [],
    frames: [3, 3, 3]
};
KANA["hira_ya"] = {
    kana: "や",
    roma: "ya",
    imageData: [],
    frames: [4, 3, 3]
};
KANA["hira_yu"] = {
    kana: "ゆ",
    roma: "yu",
    imageData: [],
    frames: [5, 3]
};
KANA["hira_yo"] = {
    kana: "よ",
    roma: "yo",
    imageData: [],
    frames: [3, 5]
};
KANA["hira_ra"] = {
    kana: "ら",
    roma: "ra",
    imageData: [],
    frames: [3, 4]
};
KANA["hira_ri"] = {
    kana: "り",
    roma: "ri",
    imageData: [],
    frames: [3, 3]
};
KANA["hira_ru"] = {
    kana: "る",
    roma: "ru",
    imageData: [],
    frames: [7]
};
KANA["hira_re"] = {
    kana: "れ",
    roma: "re",
    imageData: [],
    frames: [3, 6]
};
KANA["hira_ro"] = {
    kana: "ろ",
    roma: "ro",
    imageData: [],
    frames: [6]
};
KANA["hira_wa"] = {
    kana: "わ",
    roma: "wa",
    imageData: [],
    frames: [3, 5]
};
KANA["hira_wo"] = {
    kana: "を",
    roma: "wo",
    imageData: [],
    frames: [3, 5, 4]
};
KANA["hira_n"] = {
    kana: "ん",
    roma: "n",
    imageData: [],
    frames: [6]
};


KANA["hira_ga"] = {
    kana: "が",
    roma: "ga",
    imageData: [],
    frames: [4, 3, 3, 3, 3]
};
KANA["hira_gi"] = {
    kana: "ぎ",
    roma: "gi",
    imageData: [],
    frames: [3, 3, 4, 3, 3, 3]
};
KANA["hira_gu"] = {
    kana: "ぐ",
    roma: "gu",
    imageData: [],
    frames: [5, 3, 3]
};
KANA["hira_ge"] = {
    kana: "げ",
    roma: "ge",
    imageData: [],
    frames: [4, 3, 4, 3, 3]
};
KANA["hira_go"] = {
    kana: "ご",
    roma: "go",
    imageData: [],
    frames: [3, 3, 3, 3]
};
KANA["hira_za"] = {
    kana: "ざ",
    roma: "za",
    imageData: [],
    frames: [3, 4, 3, 3, 3]
};
KANA["hira_ji"] = {
    kana: "じ",
    roma: "ji",
    imageData: [],
    frames: [4, 3, 3]
};
KANA["hira_zu"] = {
    kana: "ず",
    roma: "zu",
    imageData: [],
    frames: [3, 6, 3, 3]
};
KANA["hira_ze"] = {
    kana: "ぜ",
    roma: "ze",
    imageData: [],
    frames: [4, 4, 4, 3, 3]
};
KANA["hira_zo"] = {
    kana: "ぞ",
    roma: "zo",
    imageData: [],
    frames: [6, 3, 3]
};
KANA["hira_da"] = {
    kana: "だ",
    roma: "da",
    imageData: [],
    frames: [3, 4, 3, 3, 3, 3]
};
KANA["hira_di"] = {
    kana: "ぢ",
    roma: "di",
    imageData: [],
    frames: [3, 5, 3, 3]
};
KANA["hira_du"] = {
    kana: "づ",
    roma: "du",
    imageData: [],
    frames: [4, 3, 3]
};
KANA["hira_de"] = {
    kana: "で",
    roma: "de",
    imageData: [],
    frames: [5, 3, 3]
};
KANA["hira_do"] = {
    kana: "ど",
    roma: "do",
    imageData: [],
    frames: [3, 3, 3, 3]
};
KANA["hira_ba"] = {
    kana: "ば",
    roma: "ba",
    imageData: [],
    frames: [4, 3, 5, 3, 3]
};
KANA["hira_bi"] = {
    kana: "び",
    roma: "bi",
    imageData: [],
    frames: [6, 3, 3]
};
KANA["hira_bu"] = {
    kana: "ぶ",
    roma: "bu",
    imageData: [],
    frames: [3, 3, 3, 3, 3, 3]
};
KANA["hira_be"] = {
    kana: "べ",
    roma: "be",
    imageData: [],
    frames: [4, 3, 3]
};
KANA["hira_bo"] = {
    kana: "ぼ",
    roma: "bo",
    imageData: [],
    frames: [4, 3, 3, 5, 3, 3]
};
KANA["hira_pa"] = {
    kana: "ぱ",
    roma: "pa",
    imageData: [],
    frames: [4, 3, 5, 4]
};
KANA["hira_pi"] = {
    kana: "ぴ",
    roma: "pi",
    imageData: [],
    frames: [6, 4]
};
KANA["hira_pu"] = {
    kana: "ぷ",
    roma: "pu",
    imageData: [],
    frames: [3, 3, 3, 3, 4]
};
KANA["hira_pe"] = {
    kana: "ぺ",
    roma: "pe",
    imageData: [],
    frames: [4, 4]
};
KANA["hira_po"] = {
    kana: "ぽ",
    roma: "po",
    imageData: [],
    frames: [4, 3, 3, 5, 4]
};


KANA["kata_a"] = {
    kana: "ア",
    roma: "a",
    imageData: [],
    frames: [4, 3]
};
KANA["kata_i"] = {
    kana: "イ",
    roma: "i",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_u"] = {
    kana: "ウ",
    roma: "u",
    imageData: [],
    frames: [2, 3, 4]
};
KANA["kata_e"] = {
    kana: "エ",
    roma: "e",
    imageData: [],
    frames: [3, 3, 4]
};
KANA["kata_o"] = {
    kana: "オ",
    roma: "o",
    imageData: [],
    frames: [3, 4, 3]
};
KANA["kata_ka"] = {
    kana: "カ",
    roma: "ka",
    imageData: [],
    frames: [4, 3]
};
KANA["kata_ki"] = {
    kana: "キ",
    roma: "ki",
    imageData: [],
    frames: [3, 3, 3]
};
KANA["kata_ku"] = {
    kana: "ク",
    roma: "ku",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_ke"] = {
    kana: "ケ",
    roma: "ke",
    imageData: [],
    frames: [3, 3, 3]
};
KANA["kata_ko"] = {
    kana: "コ",
    roma: "ko",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_sa"] = {
    kana: "サ",
    roma: "sa",
    imageData: [],
    frames: [3, 3, 3]
};
KANA["kata_shi"] = {
    kana: "シ",
    roma: "shi",
    imageData: [],
    frames: [3, 3, 4]
};
KANA["kata_su"] = {
    kana: "ス",
    roma: "su",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_se"] = {
    kana: "セ",
    roma: "se",
    imageData: [],
    frames: [4, 3]
};
KANA["kata_so"] = {
    kana: "ソ",
    roma: "so",
    imageData: [],
    frames: [3, 4]
};
KANA["kata_ta"] = {
    kana: "タ",
    roma: "ta",
    imageData: [],
    frames: [3, 4, 3]
};
KANA["kata_chi"] = {
    kana: "チ",
    roma: "chi",
    imageData: [],
    frames: [3, 3, 3]
};
KANA["kata_tsu"] = {
    kana: "ツ",
    roma: "tsu",
    imageData: [],
    frames: [3, 3, 3]
};
KANA["kata_te"] = {
    kana: "テ",
    roma: "te",
    imageData: [],
    frames: [3, 3, 3]
};
KANA["kata_to"] = {
    kana: "ト",
    roma: "to",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_na"] = {
    kana: "ナ",
    roma: "na",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_ni"] = {
    kana: "ニ",
    roma: "ni",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_nu"] = {
    kana: "ヌ",
    roma: "nu",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_ne"] = {
    kana: "ネ",
    roma: "ne",
    imageData: [],
    frames: [3, 3, 3, 3]
};
KANA["kata_no"] = {
    kana: "ノ",
    roma: "no",
    imageData: [],
    frames: [3]
};
KANA["kata_ha"] = {
    kana: "ハ",
    roma: "ha",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_hi"] = {
    kana: "ヒ",
    roma: "hi",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_fu"] = {
    kana: "フ",
    roma: "fu",
    imageData: [],
    frames: [3]
};
KANA["kata_he"] = {
    kana: "ヘ",
    roma: "he",
    imageData: [],
    frames: [4]
};
KANA["kata_ho"] = {
    kana: "ホ",
    roma: "ho",
    imageData: [],
    frames: [3, 4, 3, 3]
};
KANA["kata_ma"] = {
    kana: "マ",
    roma: "ma",
    imageData: [],
    frames: [4, 3]
};
KANA["kata_mi"] = {
    kana: "ミ",
    roma: "mi",
    imageData: [],
    frames: [3, 3, 3]
};
KANA["kata_mu"] = {
    kana: "ム",
    roma: "mu",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_me"] = {
    kana: "メ",
    roma: "me",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_mo"] = {
    kana: "モ",
    roma: "mo",
    imageData: [],
    frames: [3, 3, 3]
};
KANA["kata_ya"] = {
    kana: "ヤ",
    roma: "ya",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_yu"] = {
    kana: "ユ",
    roma: "yu",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_yo"] = {
    kana: "ヨ",
    roma: "yo",
    imageData: [],
    frames: [3, 3, 3]
};
KANA["kata_ra"] = {
    kana: "ラ",
    roma: "ra",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_ri"] = {
    kana: "リ",
    roma: "ri",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_ru"] = {
    kana: "ル",
    roma: "ru",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_re"] = {
    kana: "レ",
    roma: "re",
    imageData: [],
    frames: [3]
};
KANA["kata_ro"] = {
    kana: "ロ",
    roma: "ro",
    imageData: [],
    frames: [3, 3, 3]
};
KANA["kata_wa"] = {
    kana: "ワ",
    roma: "wa",
    imageData: [],
    frames: [3, 3]
};
KANA["kata_wo"] = {
    kana: "ヲ",
    roma: "wo",
    imageData: [],
    frames: [3, 3, 3]
};
KANA["kata_n"] = {
    kana: "ン",
    roma: "n",
    imageData: [],
    frames: [3, 3]
};

KANA["kata_ga"] = {
    kana: "ガ",
    roma: "ga",
    imageData: [],
    frames: [4, 3, 3, 3]
};
KANA["kata_gi"] = {
    kana: "ギ",
    roma: "gi",
    imageData: [],
    frames: [3, 3, 3, 3, 3]
};
KANA["kata_gu"] = {
    kana: "グ",
    roma: "gu",
    imageData: [],
    frames: [3, 3, 3, 3]
};
KANA["kata_ge"] = {
    kana: "ゲ",
    roma: "ge",
    imageData: [],
    frames: [3, 3, 3, 3, 3]
};
KANA["kata_go"] = {
    kana: "ゴ",
    roma: "go",
    imageData: [],
    frames: [3, 3, 3, 3]
};
KANA["kata_za"] = {
    kana: "ザ",
    roma: "za",
    imageData: [],
    frames: [3, 3, 3, 3, 3]
};
KANA["kata_ji"] = {
    kana: "ジ",
    roma: "ji",
    imageData: [],
    frames: [3, 3, 4, 3, 3]
};
KANA["kata_zu"] = {
    kana: "ズ",
    roma: "zu",
    imageData: [],
    frames: [3, 3, 3, 3]
};
KANA["kata_ze"] = {
    kana: "ゼ",
    roma: "ze",
    imageData: [],
    frames: [4, 3, 3, 3]
};
KANA["kata_zo"] = {
    kana: "ゾ",
    roma: "zo",
    imageData: [],
    frames: [3, 4, 3, 3]
};
KANA["kata_da"] = {
    kana: "ダ",
    roma: "da",
    imageData: [],
    frames: [3, 4, 3, 3, 3]
};
KANA["kata_di"] = {
    kana: "ヂ",
    roma: "di",
    imageData: [],
    frames: [3, 3, 3, 3, 3]
};
KANA["kata_du"] = {
    kana: "ヅ",
    roma: "du",
    imageData: [],
    frames: [3, 3, 3, 3, 3]
};
KANA["kata_de"] = {
    kana: "デ",
    roma: "de",
    imageData: [],
    frames: [3, 3, 3, 3, 3]
};
KANA["kata_do"] = {
    kana: "ド",
    roma: "do",
    imageData: [],
    frames: [3, 3, 3, 3]
};
KANA["kata_ba"] = {
    kana: "バ",
    roma: "ba",
    imageData: [],
    frames: [3, 3, 3, 3]
};
KANA["kata_bi"] = {
    kana: "ビ",
    roma: "bi",
    imageData: [],
    frames: [3, 3, 3, 3]
};
KANA["kata_bu"] = {
    kana: "ブ",
    roma: "bu",
    imageData: [],
    frames: [3, 3, 3]
};
KANA["kata_be"] = {
    kana: "ベ",
    roma: "be",
    imageData: [],
    frames: [4, 3, 3]
};
KANA["kata_bo"] = {
    kana: "ボ",
    roma: "bo",
    imageData: [],
    frames: [3, 4, 3, 3, 3, 3]
};
KANA["kata_pa"] = {
    kana: "パ",
    roma: "pa",
    imageData: [],
    frames: [3, 3, 4]
};
KANA["kata_pi"] = {
    kana: "ピ",
    roma: "pi",
    imageData: [],
    frames: [3, 3, 4]
};
KANA["kata_pu"] = {
    kana: "プ",
    roma: "pu",
    imageData: [],
    frames: [3, 4]
};
KANA["kata_pe"] = {
    kana: "ペ",
    roma: "pe",
    imageData: [],
    frames: [4, 4]
};
KANA["kata_po"] = {
    kana: "ポ",
    roma: "po",
    imageData: [],
    frames: [3, 4, 3, 3, 4]
};

const h = "あ,い,う,え,お,か,き,く,け,こ,さ,し,す,せ,そ,た,ち,つ,て,と,な,に,ぬ,ね,の,は,ひ,ふ,へ,ほ,ま,み,む,め,も,や,ゆ,よ,ら,り,る,れ,ろ,わ,を,ん,が,ぎ,ぐ,げ,ご,ざ,じ,ず,ぜ,ぞ,だ,ぢ,づ,で,ど,ば,び,ぶ,べ,ぼ,ぱ,ぴ,ぷ,ぺ,ぽ";
const k = "ア,イ,ウ,エ,オ,カ,キ,ク,ケ,コ,サ,シ,ス,セ,ソ,タ,チ,ツ,テ,ト,ナ,ニ,ヌ,ネ,ノ,ハ,ヒ,フ,ヘ,ホ,マ,ミ,ム,メ,モ,ヤ,ユ,ヨ,ラ,リ,ル,レ,ロ,ワ,ヲ,ン,ガ,ギ,グ,ゲ,ゴ,ザ,ジ,ズ,ゼ,ゾ,ダ,ヂ,ヅ,デ,ド,バ,ビ,ブ,ベ,ボ,パ,ピ,プ,ペ,ポ";
const r = "a,i,u,e,o,ka,ki,ku,ke,ko,sa,shi,su,se,so,ta,chi,tsu,te,to,na,ni,nu,ne,no,ha,hi,fu,he,ho,ma,mi,mu,me,mo,ya,yu,yo,ra,ri,ru,re,ro,wa,wo,n,ga,gi,gu,ge,go,za,ji,zu,ze,zo,da,di,du,de,do,ba,bi,bu,be,bo,pa,pi,pu,pe,po";

// À garder pour faire des tests sur ぢ et づ
// const h = "あ,ぢ,づ,え,お,か,き,く,け,こ,さ,じ,ず,せ,そ,た,ち,つ,て,と,な,に,ぬ,ね,の,は,ひ,ふ,へ,ほ,ま,み,む,め,も,や,ゆ,よ,ら,り,る,れ,ろ,わ,を,ん,が,ぎ,ぐ,げ,ご,ざ,じ,ず,ぜ,ぞ,だ,ぢ,づ,で,ど,ば,び,ぶ,べ,ぼ,ぱ,ぴ,ぷ,ぺ,ぽ";
// const k = "ア,ヂ,ヅ,エ,オ,カ,キ,ク,ケ,コ,サ,ジ,ズ,セ,ソ,タ,チ,ツ,テ,ト,ナ,ニ,ヌ,ネ,ノ,ハ,ヒ,フ,ヘ,ホ,マ,ミ,ム,メ,モ,ヤ,ユ,ヨ,ラ,リ,ル,レ,ロ,ワ,ヲ,ン,ガ,ギ,グ,ゲ,ゴ,ザ,ジ,ズ,ゼ,ゾ,ダ,ヂ,ヅ,デ,ド,バ,ビ,ブ,ベ,ボ,パ,ピ,プ,ペ,ポ";
// const r = "a,di,du,e,o,ka,ki,ku,ke,ko,sa,ji,zu,se,so,ta,chi,tsu,te,to,na,ni,nu,ne,no,ha,hi,fu,he,ho,ma,mi,mu,me,mo,ya,yu,yo,ra,ri,ru,re,ro,wa,wo,n,ga,gi,gu,ge,go,za,ji,zu,ze,zo,da,di,du,de,do,ba,bi,bu,be,bo,pa,pi,pu,pe,po";
// ------------------------------------------


const char = {
    h: h.split(","),
    k: k.split(","),
    r: r.split(",")
};

// ----------------------------------
//! ces valeurs changent en fonction du jeu ou du choix du joueur
let CHAR_NUMBERS = 4;
let CHOICE_TYPE = "r";
let ANSWER_TYPE = "h";
let RANGE = 1;
let LESSON_RANGE = false;
let RND_ARR = []; // Liste des choix 
let RND_CHOICE = {}; // Le Bon choix
let REMAINING_CHOICES = [];
let TOTAL_NUMBER = 5;
let CHOICES_DONE = [];
let ALREADY_RANDOM = -1;
let KANA_NUMBER = 0;
let TURN_NUMBER = -1;
let MAX_TURN = 5;
let MISSED_LIST = [];
// ----------------------------------


let tsvFile = "";
let translationEn = []; // 1
let translationFr = []; // 2
let translationJp = []; // 3
let LANG = [];
let ASSETS_COUNTER = 0;
let ASSETS_READY = false;

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

    const ALL_KANA_SND_LIST = [
        "kana_a","kana_i","kana_u","kana_e","kana_o",
        "kana_ka","kana_ki","kana_ku","kana_ke","kana_ko",
        "kana_sa","kana_shi","kana_su","kana_se","kana_so",
        "kana_ta","kana_chi","kana_tsu","kana_te","kana_to",
        "kana_na","kana_ni","kana_nu","kana_ne","kana_no",
        "kana_ha","kana_hi","kana_fu","kana_he","kana_ho",
        "kana_ma","kana_mi","kana_mu","kana_me","kana_mo",
        "kana_ya","kana_yu","kana_yo",
        "kana_ra","kana_ri","kana_ru","kana_re","kana_ro",
        "kana_wa","kana_wo","kana_n",
        "kana_ga","kana_gi","kana_gu","kana_ge","kana_go",
        "kana_za","kana_ji","kana_zu","kana_ze","kana_zo",
        "kana_da","kana_di","kana_du","kana_de","kana_do",
        "kana_ba","kana_bi","kana_bu","kana_be","kana_bo",
        "kana_pa","kana_pi","kana_pu","kana_pe","kana_po",
        "kana_kya","kana_kyu","kana_kyo",
        "kana_sha","kana_shu","kana_sho",
        "kana_cha","kana_chu","kana_cho",
        "kana_nya","kana_nyu","kana_nyo",
        "kana_hya","kana_hyu","kana_hyo",
        "kana_mya","kana_myu","kana_myo",
        "kana_rya","kana_ryu","kana_ryo",
        "kana_gya","kana_gyu","kana_gyo",
        "kana_ja","kana_ju","kana_jo",
        "kana_bya","kana_byu","kana_byo",
        "kana_pya","kana_pyu","kana_pyo",
        "kana_wi","kana_we","kana_wwo",
        "kana_va","kana_vi","kana_ve","kana_vo",
        "kana_che","kana_she","kana_je",
        "kana_ti","kana_de_i","kana_tu","kana_de_u",
        "kana_fa","kana_fi","kana_fe","kana_fo"
    ]
    // Music and Sounds
    Sound.list["jadona"] = new Sound("./sounds/jadona.mp3");
    // Sound.list["back"] = new Sound("./sounds/back.mp3");
    // Sound.list["click"] = new Sound("./sounds/click2.mp3");
    // Sound.list["hover"] = new Sound("./sounds/hover.mp3");
    Sound.list["back"] = new Sound("./sounds/back.ogg");
    Sound.list["click"] = new Sound("./sounds/click2_.ogg");
    // Sound.list["hover"] = new Sound("./sounds/_hover.ogg");
    Sound.list["hover"] = [];





    //!-----------------------
    // Sound.list["hover1"]
    //!-----------------------




    

    for (let i = 0; i < 5; i++) {
        // Sound.list["hover"][i] = new Sound("./sounds/_hover.ogg");
        Sound.list["hover"][i] = new Sound("./sounds/_hover.ogg");
        
    }
    // Sound.list["hover"] = document.getElementById("audiotest");

    for (let i = 0; i < ALL_KANA_SND_LIST.length; i++) {
        Sound.list[ALL_KANA_SND_LIST[i]] = new Sound(`./sounds/kana/${ALL_KANA_SND_LIST[i]}.mp3`, "s", false, true);
        Sound.list[ALL_KANA_SND_LIST[i]].setName(ALL_KANA_SND_LIST[i]);
    }

    Sound.list["music"] = new Sound("./sounds/music/Galastarz.mp3", "m", true);

    readTSVFile("./translation - 1.tsv");
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
    // LANG = translationEn;
    LANG = translationFr;
    ASSETS_COUNTER++;
    if (ASSETS_COUNTER == 2) {
        ASSETS_READY = true;
    }
}

LoadAssets();