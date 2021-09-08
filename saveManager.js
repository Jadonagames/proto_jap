class SaveManager {

    static bSaveDataExists = false;
    static BLANK_SAVE_DATA = {
        prologue: 0,
        lessons: {
            h1: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            h2: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            h3: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            h4: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            h5: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            h6: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            h7: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            h8: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            h9: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            h10: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            h11: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            h12: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            h13: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            h14: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            h15: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            k1: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            k2: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            k3: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            k4: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            k5: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            k6: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            k7: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            k8: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            k9: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            k10: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            k11: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            k12: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            k13: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            k14: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            },
            k15: {
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0
            }

        }
    }
    static SAVE_DATA = {};

    constructor() {
    }

    /**
     * @param {Objects' Array} pArr - [ { type: "lessons", params: ["h1", "fullTestGeneral"], value: 16 }, ...] 
     */
    static save(pArr) {
        if (pArr) {
            pArr.forEach(save => {
                if (save.type == "prologue") {
                    SaveManager.SAVE_DATA[save.type] = save.value;
                }
                if (save.type == "lessons") {
                    // ex: SAVE_DATA[lessons][h1][lessonTestGeneral]
                    if (SaveManager.SAVE_DATA[save.type][save.params[0]][save.params[1]] < save.value) {
                        SaveManager.SAVE_DATA[save.type][save.params[0]][save.params[1]] = save.value;
                    }
                }
            });
            let saveDataJSON = JSON.stringify(SaveManager.SAVE_DATA);
            SaveManager.bSaveDataExists = true;
            localStorage.setItem("ProtoJapSaveData", saveDataJSON);
        } else {

        }
    }

    static load() {
        let saveData = localStorage.getItem("ProtoJapSaveData");
        if (saveData) {
            SaveManager.bSaveDataExists = true;
            saveData = JSON.parse(saveData);
            SaveManager.SAVE_DATA.prologue = saveData.prologue;
            for (let i = 1; i < 16; i++) {
                // SaveManager.SAVE_DATA["lessons"]["h" + i]["finish"] = saveData["lessons"]["h" + i]["finish"];
                saveData["lessons"]["h" + i]["finish"] == undefined ? SaveManager.SAVE_DATA["lessons"]["h" + i]["finish"] = 0 : SaveManager.SAVE_DATA["lessons"]["h" + i]["finish"] = saveData["lessons"]["h" + i]["finish"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["lessonTestGeneral"] = saveData["lessons"]["h" + i]["lessonTestGeneral"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["lessonTest1"] = saveData["lessons"]["h" + i]["lessonTest1"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["lessonTest2"] = saveData["lessons"]["h" + i]["lessonTest2"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["fullTestGeneral"] = saveData["lessons"]["h" + i]["fullTestGeneral"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["fullTest1"] = saveData["lessons"]["h" + i]["fullTest1"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["fullTest2"] = saveData["lessons"]["h" + i]["fullTest2"];
            }
            for (let i = 1; i < 16; i++) {
                // SaveManager.SAVE_DATA["lessons"]["k" + i]["finish"] = saveData["lessons"]["k" + i]["finish"];
                saveData["lessons"]["k" + i]["finish"] == undefined ? SaveManager.SAVE_DATA["lessons"]["k" + i]["finish"] = 0 : SaveManager.SAVE_DATA["lessons"]["k" + i]["finish"] = saveData["lessons"]["k" + i]["finish"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["lessonTestGeneral"] = saveData["lessons"]["k" + i]["lessonTestGeneral"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["lessonTest1"] = saveData["lessons"]["k" + i]["lessonTest1"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["lessonTest2"] = saveData["lessons"]["k" + i]["lessonTest2"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["fullTestGeneral"] = saveData["lessons"]["k" + i]["fullTestGeneral"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["fullTest1"] = saveData["lessons"]["k" + i]["fullTest1"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["fullTest2"] = saveData["lessons"]["k" + i]["fullTest2"];
            }
        }
    }

    static init() {
        SaveManager.SAVE_DATA = JSON.parse(JSON.stringify(SaveManager.BLANK_SAVE_DATA));
    }

    static delete() {
        localStorage.removeItem("ProtoJapSaveData");
        SaveManager.bSaveDataExists = false;
        SaveManager.SAVE_DATA = null;

        SaveManager.init();

        Lessons.hiraganaList = Lessons.hiraganaList.filter(sp => {
            if (sp.class != "star") {
                return sp;
            }
        });
        Lessons.katakanaList = Lessons.katakanaList.filter(sp => {
            if (sp.class != "star") {
                return sp;
            }
        });
    }
}