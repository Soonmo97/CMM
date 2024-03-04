const editor = document.getElementById("editor");

// suneditor 생성
const suneditor = SUNEDITOR.create("editor", {
    width: "100%",
    minWidth: "800px",
    height: "auto",
    charCounter: true,
    popupDisplay: "local",
    buttonList: [
        ["undo", "redo", "formatBlock", "fontSize"],
        ["bold", "underline", "italic", "strike", "removeFormat"],
        ["fontColor", "hiliteColor", "indent", "outdent", "align", "list", "table"],
    ],
    lang: SUNEDITOR_LANG["ko"],
    height: 500,
});

// 내용 변경 시 textarea에 복사
suneditor.onChange = (contents, core) => {
    suneditor.save();
};

function submitPost() {
    let content = suneditor.getContents(editor.innerHTML);
    let textCount = suneditor.getCharCount(content);
    if (textCount > 1000) {
        alert("입력 가능한 글자수를 초과하였습니다. (최대 1000자)");
        return false;
    } else {
        return true;
    }
}

function confirmOut() {
    const isOut = confirm("글을 작성 중입니다. 정말 나가시겠습니까?");
    if (isOut) {
        return true;
    } else {
        return false;
    }
}
