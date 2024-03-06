const editor = document.getElementById("editor");

// suneditor 생성
const suneditor = SUNEDITOR.create("editor", {
    width: "100%",
    height: "500px",
    charCounter: true,
    placeholder: "본문을 입력해주세요",
    popupDisplay: "local",
    buttonList: [
        ["formatBlock", "fontSize"],
        ["bold", "underline", "italic", "strike", "removeFormat"],
        ["fontColor", "hiliteColor", "indent", "outdent", "align", "list", "table", "link"],
        ["undo", "redo"],
    ],
    lang: SUNEDITOR_LANG["ko"],
    defaultStyle: "position: relative; z-index:0;",
});

// 내용 변경 시 textarea에 복사
suneditor.onChange = (contents, core) => {
    suneditor.save();
};

function submitPost() {
    let title = document.querySelector(".title");
    let titleVal = title.value.replace(/\\s+/g, "");
    let textContent = suneditor.getText();
    // let contentVal = textContent.replace(/ /g, "");
    let textCount = suneditor.getCharCount();

    if (titleVal === "") {
        suneditor.noticeOpen("제목을 입력해주세요.");
        return false;
    } else if (textContent === "") {
        suneditor.noticeOpen("본문을 입력해주세요.");
        return false;
    } else if (textCount > 1000) {
        suneditor.noticeOpen("입력 가능한 글자수를 초과하였습니다. (최대 1000자)");
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
