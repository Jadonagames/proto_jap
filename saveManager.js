class SaveManager {

    static bSaveDataExists = false;
    static BLANK_SAVE_DATA = {
        intro: 0,
        prologue: 0,
        lessons: {
            h1: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 48,
                fullTest1: 48,
                fullTest2: 48,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            h2: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            h3: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            h4: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            h5: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            h6: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            h7: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            h8: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            h9: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            h10: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            h11: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            h12: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            h13: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            h14: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            h15: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            k1: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 48,
                fullTest1: 48,
                fullTest2: 48,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            k2: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            k3: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            k4: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            k5: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            k6: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            k7: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            k8: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            k9: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            k10: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            k11: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            k12: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            k13: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            k14: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            },
            k15: {
                fullcomplete: 0,
                finish: 0,
                lessonTestGeneral: 0,
                lessonTest1: 0,
                lessonTest2: 0,
                fullTestGeneral: 0,
                fullTest1: 0,
                fullTest2: 0,
                buttonAnimation: 0,
                newAnimation: 0,
                newFinish: 0,
                fullcompleteAnimation: 0
            }

        },
        freemode: {
            game1: {
                hiraganaGeneral: 0,
                hiragana1: 0,
                hiragana2: 0,
                katakanaGeneral: 0,
                katakana1: 0,
                katakana2: 0,
            }
        },
        bgm: 0.5,
        sfx: 0.5
    }
    static SAVE_DATA = {};

    static JADONA = {
        intro: 1, prologue: 12, lessons: {
            h1: { fullcomplete: 1, finish: 1, lessonTestGeneral: 48, lessonTest1: 48, lessonTest2: 48, fullTestGeneral: 48, fullTest1: 48, fullTest2: 48, buttonAnimation: 1, newAnimation: 1, newFinish: 1, fullcompleteAnimation: 0 },
            h2: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 48, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 1, newAnimation: 1, newFinish: 1, fullcompleteAnimation: 0 },
            h3: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            h4: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            h5: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            h6: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            h7: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            h8: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            h9: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            h10: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            h11: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            h12: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            h13: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            h14: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            h15: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            k1: { fullcomplete: 1, finish: 1, lessonTestGeneral: 48, lessonTest1: 48, lessonTest2: 48, fullTestGeneral: 48, fullTest1: 48, fullTest2: 48, buttonAnimation: 1, newAnimation: 1, newFinish: 1, fullcompleteAnimation: 0 },
            k2: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 1, newAnimation: 1, newFinish: 0, fullcompleteAnimation: 0 },
            k3: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            k4: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            k5: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            k6: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            k7: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            k8: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            k9: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            k10: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            k11: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            k12: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            k13: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            k14: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 },
            k15: { fullcomplete: 0, finish: 0, lessonTestGeneral: 0, lessonTest1: 0, lessonTest2: 0, fullTestGeneral: 0, fullTest1: 0, fullTest2: 0, buttonAnimation: 0, newAnimation: 0, newFinish: 0, fullcompleteAnimation: 0 }
        },
        freemode: { game1: { hiraganaGeneral: 0, hiragana1: 0, hiragana2: 0, katakanaGeneral: 0, katakana1: 0, katakana2: 0 } }, bgm: 0.2, sfx: 0.1
    }

    constructor() {
    }

    /**
     * @param {Objects' Array} pArr - [ { type: "lessons", params: ["h1", "fullTestGeneral"], value: 16 }, ...] 
     */
    static OLD_save(pArr) {
        if (pArr) {
            pArr.forEach(save => {
                if (save.type == "intro") {
                    SaveManager.SAVE_DATA[save.type] = save.value;
                }
                if (save.type == "prologue") {
                    SaveManager.SAVE_DATA[save.type] = save.value;
                    if (save.value == 1 || save.value == 11) {
                        LessonBtn.list.forEach(b => {
                            if (b.label.slice(-2) == "_1") {
                                b.changeMode(0);
                            }
                        });
                    }
                }
                if (save.type == "lessons") {
                    // ex: SAVE_DATA[lessons][h1][lessonTestGeneral]
                    if (SaveManager.SAVE_DATA[save.type][save.params[0]][save.params[1]] < save.value) {
                        SaveManager.SAVE_DATA[save.type][save.params[0]][save.params[1]] = save.value;
                    }
                }
                if (save.type == "buttonAnimation") {
                    SaveManager.SAVE_DATA["lessons"][save.params][save.type] = 1;
                }
                if (save.type == "newAnimation") {
                    SaveManager.SAVE_DATA["lessons"][save.params][save.type] = 1;
                }
                if (save.type == "newFinish") {
                    SaveManager.SAVE_DATA["lessons"][save.params][save.type] = 1;
                }
                if (save.type == "freemode") {
                    if (SaveManager.SAVE_DATA[save.type]["game1"][save.params] < save.value) {
                        SaveManager.SAVE_DATA[save.type]["game1"][save.params] = save.value;
                    }
                    // SaveManager.SAVE_DATA["freemode"]["game1"]["HIRAGANA OR KATAKANA"] = 16 32 48; // save.params
                }
                if (save.type == "bgm") {
                    SaveManager.SAVE_DATA[save.type] = save.value;
                }
                if (save.type == "sfx") {
                    SaveManager.SAVE_DATA[save.type] = save.value;
                }

            });
            let saveDataJSON = JSON.stringify(SaveManager.SAVE_DATA);
            SaveManager.bSaveDataExists = true;
            localStorage.setItem("KanaWorldSaveData", saveDataJSON);
        } else {

        }
    }
    static save(pArr) {
        if (pArr) {
            pArr.forEach(save => {
                if (save.type == "intro") {
                    SaveManager.SAVE_DATA[save.type] = save.value;
                }
                if (save.type == "prologue") {
                    SaveManager.SAVE_DATA[save.type] = save.value;
                    if (save.value == 1 || save.value == 11) {
                        LessonBtn.list.forEach(b => {
                            if (b.label.slice(-2) == "_1") {
                                b.changeMode(0);
                            }
                        });
                    }
                }
                if (save.type == "lessons") {
                    // ex: SAVE_DATA[lessons][h1][lessonTestGeneral]
                    if (SaveManager.SAVE_DATA[save.type][save.params[0]][save.params[1]] < save.value) {
                        SaveManager.SAVE_DATA[save.type][save.params[0]][save.params[1]] = save.value;
                    }
                }
                if (save.type == "buttonAnimation") {
                    SaveManager.SAVE_DATA["lessons"][save.params][save.type] = 1;
                }
                if (save.type == "newAnimation") {
                    SaveManager.SAVE_DATA["lessons"][save.params][save.type] = 1;
                }
                if (save.type == "newFinish") {
                    SaveManager.SAVE_DATA["lessons"][save.params][save.type] = 1;
                }
                if (save.type == "freemode") {
                    if (SaveManager.SAVE_DATA[save.type]["game1"][save.params] < save.value) {
                        SaveManager.SAVE_DATA[save.type]["game1"][save.params] = save.value;
                    }
                    // SaveManager.SAVE_DATA["freemode"]["game1"]["HIRAGANA OR KATAKANA"] = 16 32 48; // save.params
                }
                if (save.type == "bgm") {
                    SaveManager.SAVE_DATA[save.type] = save.value;
                }
                if (save.type == "sfx") {
                    SaveManager.SAVE_DATA[save.type] = save.value;
                }

            });
            // let saveDataJSON = JSON.stringify(SaveManager.SAVE_DATA);
            let saveData = JSON.stringify(SaveManager.SAVE_DATA);
            SaveManager.bSaveDataExists = true;

            const id = USER.id
            const name = USER.name;

            const userData = JSON.stringify({
                id,
                name,
                saveData
            });

            fetch(`${SERVER_URL}/save`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${USER.token}`
                },
                mode: 'cors',
                body: userData
            }).then((response) => {
                return response.json()
            }).then((res) => {
                if (res.error === 0) {
                    changeMainState(MAIN_STATE.Error);

                } else {
                    USER.saveData = "";
                    USER.saveData = SaveManager.SAVE_DATA;
                }
            }).catch((e) => { })

            // localStorage.setItem("KanaWorldSaveData", saveDataJSON);

        }
    }

    static load(pSaveData = "") {
        // let saveData = localStorage.getItem("KanaWorldSaveData");
        let saveData = pSaveData;
        if (saveData) {
            SaveManager.bSaveDataExists = true;
            saveData = JSON.parse(saveData);
            SaveManager.SAVE_DATA.intro = saveData.intro;
            SaveManager.SAVE_DATA.prologue = saveData.prologue;
            for (let i = 1; i < 16; i++) {
                // SaveManager.SAVE_DATA["lessons"]["h" + i]["fullcomplete"] = saveData["lessons"]["h" + i]["fullcomplete"];
                saveData["lessons"]["h" + i]["fullcomplete"] == undefined ? SaveManager.SAVE_DATA["lessons"]["h" + i]["fullcomplete"] = 0 : SaveManager.SAVE_DATA["lessons"]["h" + i]["fullcomplete"] = saveData["lessons"]["h" + i]["fullcomplete"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["finish"] = saveData["lessons"]["h" + i]["finish"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["lessonTestGeneral"] = saveData["lessons"]["h" + i]["lessonTestGeneral"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["lessonTest1"] = saveData["lessons"]["h" + i]["lessonTest1"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["lessonTest2"] = saveData["lessons"]["h" + i]["lessonTest2"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["fullTestGeneral"] = saveData["lessons"]["h" + i]["fullTestGeneral"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["fullTest1"] = saveData["lessons"]["h" + i]["fullTest1"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["fullTest2"] = saveData["lessons"]["h" + i]["fullTest2"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["buttonAnimation"] = saveData["lessons"]["h" + i]["buttonAnimation"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["newAnimation"] = saveData["lessons"]["h" + i]["newAnimation"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["newFinish"] = saveData["lessons"]["h" + i]["newFinish"];
                SaveManager.SAVE_DATA["lessons"]["h" + i]["fullCompleteAnimation"] = saveData["lessons"]["h" + i]["fullCompleteAnimation"];
            }
            for (let i = 1; i < 16; i++) {
                // SaveManager.SAVE_DATA["lessons"]["k" + i]["fullcomplete"] = saveData["lessons"]["k" + i]["fullcomplete"];
                saveData["lessons"]["k" + i]["fullcomplete"] == undefined ? SaveManager.SAVE_DATA["lessons"]["k" + i]["fullcomplete"] = 0 : SaveManager.SAVE_DATA["lessons"]["k" + i]["fullcomplete"] = saveData["lessons"]["k" + i]["fullcomplete"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["finish"] = saveData["lessons"]["k" + i]["finish"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["lessonTestGeneral"] = saveData["lessons"]["k" + i]["lessonTestGeneral"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["lessonTest1"] = saveData["lessons"]["k" + i]["lessonTest1"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["lessonTest2"] = saveData["lessons"]["k" + i]["lessonTest2"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["fullTestGeneral"] = saveData["lessons"]["k" + i]["fullTestGeneral"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["fullTest1"] = saveData["lessons"]["k" + i]["fullTest1"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["fullTest2"] = saveData["lessons"]["k" + i]["fullTest2"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["buttonAnimation"] = saveData["lessons"]["k" + i]["buttonAnimation"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["newAnimation"] = saveData["lessons"]["k" + i]["newAnimation"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["newFinish"] = saveData["lessons"]["k" + i]["newFinish"];
                SaveManager.SAVE_DATA["lessons"]["k" + i]["fullCompleteAnimation"] = saveData["lessons"]["k" + i]["fullCompleteAnimation"];
            }
            SaveManager.SAVE_DATA["freemode"]["game1"]["hiraganaGeneral"] = saveData["freemode"]["game1"]["hiraganaGeneral"];
            SaveManager.SAVE_DATA["freemode"]["game1"]["hiragana1"] = saveData["freemode"]["game1"]["hiragana1"];
            SaveManager.SAVE_DATA["freemode"]["game1"]["hiragana2"] = saveData["freemode"]["game1"]["hiragana2"];
            SaveManager.SAVE_DATA["freemode"]["game1"]["katakanaGeneral"] = saveData["freemode"]["game1"]["katakanaGeneral"];
            SaveManager.SAVE_DATA["freemode"]["game1"]["katakana1"] = saveData["freemode"]["game1"]["katakana1"];
            SaveManager.SAVE_DATA["freemode"]["game1"]["katakana2"] = saveData["freemode"]["game1"]["katakana2"];
            SaveManager.SAVE_DATA["bgm"] = saveData["bgm"];
            SaveManager.SAVE_DATA["sfx"] = saveData["sfx"];

            MUSIC_VOLUME = SaveManager.SAVE_DATA['bgm'];
            SFX_VOLUME = SaveManager.SAVE_DATA['sfx'];
        }
    }

    static init() {
        SaveManager.SAVE_DATA = JSON.parse(JSON.stringify(SaveManager.BLANK_SAVE_DATA));
    }

    static delete() {
        SaveManager.bSaveDataExists = false;
        SaveManager.SAVE_DATA = null;

        SaveManager.init();

        SaveManager.save([{ type: "bgm", value: MUSIC_VOLUME }]);
        SaveManager.save([{ type: "sfx", value: SFX_VOLUME }]);

        Lessons.FIRST_TIME = true;
        LessonBtn.list.forEach(b => {
            if (b.mode == 0) {
                b.changeMode(1);
                b.setFontColor("rgba(176,150,124,0)", "rgba(0,0,0,0)", "rgba(213,210,190,0)", "rgba(162,138,114,0)");
            }
        });

        Lessons.hiraganaList = Lessons.hiraganaList.filter(sp => {
            if (sp.class != "star" && sp.class != "new") {
                return sp;
            }
        });
        Lessons.katakanaList = Lessons.katakanaList.filter(sp => {
            if (sp.class != "star" && sp.class != "new") {
                return sp;
            }
        });

        LessonTutorial.bInit = false;
        LessonTutorial.mainList = [];

        let saveData = JSON.stringify(SaveManager.SAVE_DATA); //? Empty

        const id = USER.id
        const name = USER.name;

        const userData = JSON.stringify({
            id,
            name,
            saveData
        });

        fetch(`${SERVER_URL}/save`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${USER.token}`
            },
            mode: 'cors',
            body: userData
        }).then((response) => {
            return response.json()
        }).then((res) => {
            USER.saveData = "";
            USER.saveData = SaveManager.SAVE_DATA;
        }).catch((e) => { })

    }
}




/*
KanaWorldSaveData
*/
/*
SAVE 100%
let arr =
{"intro":1,"prologue":1,"lessons":{
    "h1":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h2":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h3":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h4":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h5":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h6":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":48,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h7":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":48,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h8":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":48,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h9":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":48,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h10":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":48,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h11":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":48,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h12":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":48,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h13":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":48,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h14":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":48,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h15":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":48,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k1":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k2":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k3":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k4":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k5":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k6":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k7":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k8":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k9":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k10":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k11":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k12":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k13":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k14":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k15":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1}
},
"freemode":{"game1":{"hiraganaGeneral":0,"hiragana1":0, "hiragana2":0,"katakanaGeneral":0,"katakana1":0,"katakana2":0}},"bgm":0.7,"sfx":0.8}
*/

/*
------ SAVE h:0, k:0 ------ intro prolog OK + lesson1 btn anim OK
{"intro":1,"prologue":1,"lessons":{
    "h1":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":0},
    "h2":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h3":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h4":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h5":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h6":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h7":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h8":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h9":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h10":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h11":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h12":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h13":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h14":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h15":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k1":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k2":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k3":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k4":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k5":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k6":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k7":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k8":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k9":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k10":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k11":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k12":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k13":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k14":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k15":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0}
},
    "freemode":{"game1":{"hiraganaGeneral":0,"hiragana1":0, "hiragana2":0,"katakanaGeneral":0,"katakana1":0,"katakana2":0}},"bgm":0.7,"sfx":0.8}
*/

/*
------ SAVE h:0, k:0 ------ intro OK prolog NON
{"intro":1,"prologue":0,"lessons":{
    "h1":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":0},
    "h2":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h3":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h4":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h5":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h6":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h7":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h8":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h9":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h10":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h11":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h12":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h13":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h14":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h15":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k1":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k2":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k3":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k4":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k5":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k6":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k7":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k8":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k9":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k10":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k11":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k12":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k13":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k14":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k15":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0}
},
    "freemode":{"game1":{"hiraganaGeneral":0,"hiragana1":0, "hiragana2":0,"katakanaGeneral":0,"katakana1":0,"katakana2":0}},"bgm":0.7,"sfx":0.8}
*/



/*
h5 k3

{"intro":1,"prologue":1,"lessons":{
    "h1":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h2":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h3":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h4":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h5":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "h6":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h7":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h8":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h9":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h10":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h11":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h12":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h13":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h14":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h15":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k1":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k2":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k3":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":1},
    "k4":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k5":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k6":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k7":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k8":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k9":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k10":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k11":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k12":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k13":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k14":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k15":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0}
},
    "freemode":{"game1":{"hiraganaGeneral":0,"hiragana1":0, "hiragana2":0,"katakanaGeneral":0,"katakana1":0,"katakana2":0}},"bgm":0.7,"sfx":0.8}

*/

/* JADONA
h2 k2

{"intro":1,"prologue":12,"lessons":{
    "h1":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":0},
    "h2":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":48,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":0},
    "h3":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h4":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h5":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h6":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h7":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h8":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h9":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h10":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h11":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h12":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h13":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h14":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "h15":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k1":{"fullcomplete":1,"finish":1,"lessonTestGeneral":48,"lessonTest1":48,"lessonTest2":48,"fullTestGeneral":48,"fullTest1":48,"fullTest2":48,"buttonAnimation":1,"newAnimation":1,"newFinish":1,"fullcompleteAnimation":0},
    "k2":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":1,"newAnimation":1,"newFinish":0,"fullcompleteAnimation":0},
    "k3":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k4":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k5":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k6":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k7":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k8":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k9":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k10":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k11":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k12":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k13":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k14":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0},
    "k15":{"fullcomplete":0,"finish":0,"lessonTestGeneral":0,"lessonTest1":0,"lessonTest2":0,"fullTestGeneral":0,"fullTest1":0,"fullTest2":0,"buttonAnimation":0,"newAnimation":0,"newFinish":0,"fullcompleteAnimation":0}
},
    "freemode":{"game1":{"hiraganaGeneral":0,"hiragana1":0,"hiragana2":0,"katakanaGeneral":0,"katakana1":0,"katakana2":0}},"bgm":0.2,"sfx":0.2}

*/